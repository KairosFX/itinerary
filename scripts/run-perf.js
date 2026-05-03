const fs = require("fs");
const http = require("http");
const path = require("path");
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

function readLighthouseAssertions() {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(repoRoot, ".lighthouserc.json"), "utf8"));
    return config?.ci?.assert?.assertions || {};
  } catch (error) {
    return {};
  }
}

function reportPerformanceAssertions(summary) {
  const assertions = readLighthouseAssertions();
  const metrics = {
    "categories:performance": {
      value: summary.performanceScore / 100,
      label: "Performance score",
      format: (value) => formatNumber(value * 100, 0)
    },
    "largest-contentful-paint": {
      value: summary.lcpMs,
      label: "LCP",
      format: (value) => `${formatNumber(value, 0)} ms`
    },
    "interaction-to-next-paint": {
      value: summary.inpMs,
      label: "INP",
      format: (value) => `${formatNumber(value, 0)} ms`
    },
    "cumulative-layout-shift": {
      value: summary.cls,
      label: "CLS",
      format: (value) => formatNumber(value, 3)
    }
  };

  const warnings = [];
  Object.entries(assertions).forEach(([id, assertion]) => {
    const metric = metrics[id];
    if (!metric || !Array.isArray(assertion) || assertion[0] === "off") {
      return;
    }

    const options = assertion[1] || {};
    if (Number.isFinite(options.minScore) && metric.value < options.minScore) {
      warnings.push(`${metric.label} ${metric.format(metric.value)} is below ${formatNumber(options.minScore * 100, 0)}.`);
    }
    if (Number.isFinite(options.maxNumericValue) && metric.value > options.maxNumericValue) {
      warnings.push(`${metric.label} ${metric.format(metric.value)} exceeds ${metric.format(options.maxNumericValue)}.`);
    }
  });

  if (!warnings.length) {
    process.stdout.write("Performance assertions passed.\n");
    return;
  }

  process.stdout.write(`Performance assertion warnings:\n${warnings.map((warning) => `  - ${warning}`).join("\n")}\n`);
}

function isIgnorableChromeKillError(error) {
  const message = String(error?.message || error || "");
  return /Chrome could not be killed/i.test(message) || /not found/i.test(message);
}

function getStaticContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".json":
    case ".webmanifest":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".mp3":
      return "audio/mpeg";
    default:
      return "application/octet-stream";
  }
}

function createStaticServer(rootDir) {
  const absoluteRoot = path.resolve(rootDir);
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    let requestPath = "/";
    try {
      requestPath = decodeURIComponent(requestUrl.pathname || "/");
    } catch (error) {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
    const targetPath = path.resolve(absoluteRoot, `.${normalizedPath}`);
    if (targetPath !== absoluteRoot && !targetPath.startsWith(`${absoluteRoot}${path.sep}`)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(targetPath, (error, contents) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": getStaticContentType(targetPath),
        "Cache-Control": "no-store"
      });
      response.end(contents);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve({
        port: server.address().port,
        close: () => new Promise((closeResolve) => server.close(closeResolve))
      });
    });
  });
}

function getChromeFlags() {
  const flags = ["--headless=new", "--disable-dev-shm-usage"];
  if (process.env.CI === "true") {
    flags.push("--no-sandbox");
  }
  return flags;
}

async function collectLighthouseRuns({ dist, urlPath = "/index.html", runs = 3 }) {
  const { default: lighthouse } = await import("lighthouse");
  const absoluteDist = path.resolve(repoRoot, dist);
  const server = await createStaticServer(absoluteDist);
  const sessionProfileRoot = path.join(chromeProfileDir, `session-${Date.now()}`);

  const targetUrl = new URL(urlPath, `http://127.0.0.1:${server.port}`).href;

  try {
    for (let index = 0; index < runs; index += 1) {
      const runProfileDir = path.join(sessionProfileRoot, `run-${index + 1}`);
      fs.mkdirSync(runProfileDir, { recursive: true });

      const chrome = await chromeLauncher.launch({
        chromePath: process.env.CHROME_PATH || defaultChromePath,
        chromeFlags: getChromeFlags(),
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

  reportPerformanceAssertions(summary);
}

main();
