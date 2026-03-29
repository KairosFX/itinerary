const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const FallbackServer = require("@lhci/cli/src/collect/fallback-server.js");
const chromeLauncher = require("chrome-launcher");

const repoRoot = path.resolve(__dirname, "..");
const lhciDir = path.join(repoRoot, ".lighthouseci");
const chromeProfileDir = path.join(lhciDir, "chrome-profile");
const defaultChromePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const argv = process.argv.slice(2);

function readArg(flagName, fallbackValue = "") {
  const prefixed = `${flagName}=`;
  const directMatch = argv.find((entry) => entry.startsWith(prefixed));
  if (directMatch) {
    return directMatch.slice(prefixed.length);
  }

  const flagIndex = argv.indexOf(flagName);
  if (flagIndex >= 0) {
    return argv[flagIndex + 1] || fallbackValue;
  }

  return fallbackValue;
}

function removePerfArtifacts(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return;
  }

  const removableFilePatterns = [
    /^assertion-results\.json$/i,
    /^flags-.*\.json$/i,
    /^lhr-\d+\.html$/i,
    /^lhr-\d+\.json$/i,
    /^links\.json$/i
  ];

  fs.readdirSync(targetDir, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      return;
    }

    if (removableFilePatterns.some((pattern) => pattern.test(entry.name))) {
      fs.rmSync(entryPath, { force: true });
    }
  });
}

function getNumericAuditValue(audit) {
  return typeof audit?.numericValue === "number" ? audit.numericValue : NaN;
}

function median(values) {
  const normalized = values
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => left - right);

  if (!normalized.length) {
    return NaN;
  }

  const middleIndex = Math.floor(normalized.length / 2);
  return normalized.length % 2 === 0
    ? (normalized[middleIndex - 1] + normalized[middleIndex]) / 2
    : normalized[middleIndex];
}

function formatNumber(value, fractionDigits = 0) {
  return Number.isFinite(value) ? value.toFixed(fractionDigits) : "n/a";
}

function parseLighthouseRuns(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return [];
  }

  return fs
    .readdirSync(targetDir)
    .filter((fileName) => /^lhr-\d+\.json$/i.test(fileName))
    .map((fileName) => {
      const report = JSON.parse(fs.readFileSync(path.join(targetDir, fileName), "utf8"));
      return {
        fileName,
        performance: Number(report.categories?.performance?.score || 0),
        lcp: getNumericAuditValue(report.audits?.["largest-contentful-paint"]),
        inp: getNumericAuditValue(report.audits?.["interaction-to-next-paint"]),
        cls: getNumericAuditValue(report.audits?.["cumulative-layout-shift"]),
        unusedJs: getNumericAuditValue(report.audits?.["unused-javascript"]),
        unusedCss: getNumericAuditValue(report.audits?.["unused-css-rules"])
      };
    });
}

function isIgnorableChromeKillError(error) {
  const message = String(error?.message || error || "");
  return /Chrome could not be killed/i.test(message) || /not found/i.test(message);
}

function runLhciCommand(command, extraArgs = []) {
  const result = spawnSync(
    process.execPath,
    [path.join(repoRoot, "node_modules", "@lhci", "cli", "src", "cli.js"), command, "--config=.lighthouserc.json", ...extraArgs],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        CHROME_PATH: process.env.CHROME_PATH || defaultChromePath
      },
      encoding: "utf8",
      stdio: "pipe"
    }
  );

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(`${command} failed with exit code ${result.status || 1}`);
  }
}

async function collectLighthouseRuns({ dist, urlPath = "/index.html", runs = 3 }) {
  const { default: lighthouse } = await import("lighthouse");
  const absoluteDist = path.resolve(repoRoot, dist);
  const server = new FallbackServer(absoluteDist, false);
  const sessionProfileRoot = path.join(chromeProfileDir, `session-${Date.now()}`);

  await server.listen();
  const targetUrl = new URL(urlPath, `http://localhost:${server.port}`).href;

  try {
    for (let index = 0; index < runs; index += 1) {
      const runProfileDir = path.join(sessionProfileRoot, `run-${index + 1}`);
      fs.mkdirSync(runProfileDir, { recursive: true });

      const chrome = await chromeLauncher.launch({
        chromePath: process.env.CHROME_PATH || defaultChromePath,
        chromeFlags: ["--headless=new", "--disable-dev-shm-usage"],
        logLevel: "silent",
        userDataDir: runProfileDir
      });

      try {
        process.stdout.write(`Running Lighthouse ${index + 1}/${runs} on ${targetUrl}\n`);
        const runnerResult = await lighthouse(targetUrl, {
          logLevel: "error",
          onlyCategories: ["performance"],
          output: "json",
          port: chrome.port
        });

        if (!runnerResult?.lhr) {
          throw new Error(`Lighthouse did not return an LHR for run ${index + 1}.`);
        }

        const filePath = path.join(lhciDir, `lhr-${Date.now() + index}.json`);
        fs.writeFileSync(filePath, JSON.stringify(runnerResult.lhr, null, 2));
      } finally {
        try {
          await Promise.resolve(chrome.kill());
        } catch (error) {
          if (!isIgnorableChromeKillError(error)) {
            throw error;
          }
        }
        try {
          fs.rmSync(runProfileDir, { recursive: true, force: true });
        } catch (error) {
          // Ignore Windows profile teardown timing issues between Lighthouse runs.
        }
      }
    }
  } finally {
    await server.close();
    try {
      fs.rmSync(sessionProfileRoot, { recursive: true, force: true });
    } catch (error) {
      // Ignore Windows profile teardown timing issues after the full run.
    }
  }
}

async function main() {
  fs.mkdirSync(lhciDir, { recursive: true });
  removePerfArtifacts(lhciDir);
  fs.mkdirSync(chromeProfileDir, { recursive: true });

  const dist = readArg("--dist", "docs");
  const label = readArg("--label", path.basename(path.resolve(repoRoot, dist)) || "site");
  const runCount = Math.max(Number(readArg("--runs", "3")) || 3, 1);

  await collectLighthouseRuns({ dist, runs: runCount });
  runLhciCommand("assert");

  const collectedRuns = parseLighthouseRuns(lhciDir);
  const summary = {
    label,
    runs: collectedRuns.length,
    performanceScore: median(collectedRuns.map((run) => run.performance)) * 100,
    lcpMs: median(collectedRuns.map((run) => run.lcp)),
    inpMs: median(collectedRuns.map((run) => run.inp)),
    cls: median(collectedRuns.map((run) => run.cls)),
    unusedJsBytes: median(collectedRuns.map((run) => run.unusedJs)),
    unusedCssBytes: median(collectedRuns.map((run) => run.unusedCss))
  };

  process.stdout.write(
    [
      "",
      `Performance summary (${summary.label})`,
      `  Runs: ${summary.runs}`,
      `  Performance: ${formatNumber(summary.performanceScore, 0)}`,
      `  LCP (ms): ${formatNumber(summary.lcpMs, 0)}`,
      `  INP (ms): ${formatNumber(summary.inpMs, 0)}`,
      `  CLS: ${formatNumber(summary.cls, 3)}`,
      `  Unused JS (KiB): ${formatNumber(summary.unusedJsBytes / 1024, 1)}`,
      `  Unused CSS (KiB): ${formatNumber(summary.unusedCssBytes / 1024, 1)}`,
      `  Raw reports: ${path.relative(repoRoot, lhciDir)}`,
      ""
    ].join("\n")
  );
}

main();
