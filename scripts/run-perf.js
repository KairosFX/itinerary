const fs = require("fs");
const http = require("http");
const path = require("path");
const chromeLauncher = require("chrome-launcher");

const repoRoot = path.resolve(__dirname, "..");
const lhciDir = path.join(repoRoot, ".lighthouseci");
const chromeProfileDir = path.join(lhciDir, "chrome-profile");
const defaultChromePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const argv = process.argv.slice(2);
const lighthouseCategories = ["performance", "accessibility", "best-practices", "seo"];
const profiles = [
  { name: "mobile", label: "Mobile" },
  { name: "desktop", label: "Desktop", preset: "desktop" }
];

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
    /^lhr-\w+-\d+\.html$/i,
    /^lhr-\w+-\d+\.json$/i,
    /^lhr-\d+\.html$/i,
    /^lhr-\d+\.json$/i,
    /^links\.json$/i
  ];

  fs.readdirSync(targetDir, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(targetDir, entry.name);
    if (entry.isFile() && removableFilePatterns.some((pattern) => pattern.test(entry.name))) {
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

function getCategoryScore(report, category) {
  const score = report.categories?.[category]?.score;
  return typeof score === "number" ? score : NaN;
}

function parseLighthouseRuns(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return [];
  }

  return fs
    .readdirSync(targetDir)
    .filter((fileName) => /^lhr-\w+-\d+\.json$/i.test(fileName))
    .map((fileName) => {
      const profile = fileName.match(/^lhr-(\w+)-/i)?.[1] || "unknown";
      const report = JSON.parse(fs.readFileSync(path.join(targetDir, fileName), "utf8"));
      return {
        fileName,
        profile,
        performance: getCategoryScore(report, "performance"),
        accessibility: getCategoryScore(report, "accessibility"),
        bestPractices: getCategoryScore(report, "best-practices"),
        seo: getCategoryScore(report, "seo"),
        lcp: getNumericAuditValue(report.audits?.["largest-contentful-paint"]),
        inp: getNumericAuditValue(report.audits?.["interaction-to-next-paint"]),
        tbt: getNumericAuditValue(report.audits?.["total-blocking-time"]),
        cls: getNumericAuditValue(report.audits?.["cumulative-layout-shift"]),
        unusedJs: getNumericAuditValue(report.audits?.["unused-javascript"]),
        unusedCss: getNumericAuditValue(report.audits?.["unused-css-rules"])
      };
    });
}

function summarizeRuns(label, runs) {
  return {
    label,
    runs: runs.length,
    performanceScore: median(runs.map((run) => run.performance)),
    accessibilityScore: median(runs.map((run) => run.accessibility)),
    bestPracticesScore: median(runs.map((run) => run.bestPractices)),
    seoScore: median(runs.map((run) => run.seo)),
    lcpMs: median(runs.map((run) => run.lcp)),
    inpMs: median(runs.map((run) => run.inp)),
    tbtMs: median(runs.map((run) => run.tbt)),
    cls: median(runs.map((run) => run.cls)),
    unusedJsBytes: median(runs.map((run) => run.unusedJs)),
    unusedCssBytes: median(runs.map((run) => run.unusedCss))
  };
}

function readLighthouseAssertions() {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(repoRoot, ".lighthouserc.json"), "utf8"));
    return config?.ci?.assert?.assertions || {};
  } catch (error) {
    return {};
  }
}

function reportAssertions(summary) {
  const assertions = readLighthouseAssertions();
  const metrics = {
    "categories:performance": {
      value: summary.performanceScore,
      label: "Performance score",
      format: (value) => formatNumber(value * 100, 0)
    },
    "categories:accessibility": {
      value: summary.accessibilityScore,
      label: "Accessibility score",
      format: (value) => formatNumber(value * 100, 0)
    },
    "categories:best-practices": {
      value: summary.bestPracticesScore,
      label: "Best practices score",
      format: (value) => formatNumber(value * 100, 0)
    },
    "categories:seo": {
      value: summary.seoScore,
      label: "SEO score",
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
    "total-blocking-time": {
      value: summary.tbtMs,
      label: "TBT",
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
      warnings.push(`${summary.label} ${metric.label} ${metric.format(metric.value)} is below ${formatNumber(options.minScore * 100, 0)}.`);
    }
    if (Number.isFinite(options.maxNumericValue) && metric.value > options.maxNumericValue) {
      warnings.push(`${summary.label} ${metric.label} ${metric.format(metric.value)} exceeds ${metric.format(options.maxNumericValue)}.`);
    }
  });

  if (!warnings.length) {
    process.stdout.write(`${summary.label} assertions passed.\n`);
    return;
  }

  process.stdout.write(`${summary.label} assertion warnings:\n${warnings.map((warning) => `  - ${warning}`).join("\n")}\n`);
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

async function collectLighthouseRuns({ dist, urlPath = "/index.html", runs = 2, profile }) {
  const lighthouseModule = await import("lighthouse");
  const lighthouse = lighthouseModule.default;
  const lighthouseConfig = profile.name === "desktop" ? lighthouseModule.desktopConfig : undefined;
  const absoluteDist = path.resolve(repoRoot, dist);
  const server = await createStaticServer(absoluteDist);
  const sessionProfileRoot = path.join(chromeProfileDir, `session-${profile.name}-${Date.now()}`);
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
        process.stdout.write(`Running ${profile.label} Lighthouse ${index + 1}/${runs} on ${targetUrl}\n`);
        const runnerResult = await lighthouse(targetUrl, {
          logLevel: "error",
          onlyCategories: lighthouseCategories,
          output: "json",
          port: chrome.port
        }, lighthouseConfig);

        if (!runnerResult?.lhr) {
          throw new Error(`Lighthouse did not return an LHR for ${profile.name} run ${index + 1}.`);
        }

        const filePath = path.join(lhciDir, `lhr-${profile.name}-${Date.now() + index}.json`);
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

function assertFileExists(relativePath) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) {
    throw new Error(`Expected build output is missing: ${relativePath}`);
  }
}

function runStaticBuildChecks() {
  const indexHtml = fs.readFileSync(path.join(repoRoot, "docs", "index.html"), "utf8");
  const serviceWorker = fs.readFileSync(path.join(repoRoot, "docs", "service-worker.js"), "utf8");
  const webManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs", "manifest.webmanifest"), "utf8"));
  const assetManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs", "assets", "app", "asset-manifest.json"), "utf8"));

  if (!indexHtml.includes("<title>Kairos VIII Japan Itinerary</title>")) {
    throw new Error("Document title check failed.");
  }
  if (!indexHtml.includes('rel="canonical" href="https://kairosfx.github.io/itinerary/"')) {
    throw new Error("Canonical URL check failed.");
  }
  if (!indexHtml.includes('property="og:title"') || !indexHtml.includes('name="twitter:card"')) {
    throw new Error("Social metadata check failed.");
  }
  if (!indexHtml.includes('href="./assets/icons/kairos-favicon-48.jpg"') || indexHtml.includes("1yegabjjbjp01.jpg")) {
    throw new Error("Optimized favicon check failed.");
  }
  if (!indexHtml.includes('data-first-backdrop') || !indexHtml.includes("kairos-bg-01-mobile.jpg")) {
    throw new Error("First backdrop preload/style check failed.");
  }
  if (!indexHtml.includes("kairos-viii-magazine-cover-560.jpg")) {
    throw new Error("Responsive magazine cover check failed.");
  }
  if (indexHtml.includes('as="style" fetchpriority="high"')) {
    throw new Error("High-priority non-critical stylesheet preload check failed.");
  }
  if (indexHtml.includes('rel="stylesheet" href="./assets/app/style.')) {
    throw new Error("Duplicate external stylesheet load check failed.");
  }
  if (!serviceWorker.includes("./itinerary-offline.html")) {
    throw new Error("Offline snapshot is not listed in the service worker.");
  }
  if (!serviceWorker.includes('".mp3"')) {
    throw new Error("Non-cacheable audio check failed.");
  }
  if (
    !serviceWorker.includes("./assets/icons/kairos-icon-192.jpg") ||
    !serviceWorker.includes("./assets/backgrounds/kairos-bg-01-mobile.jpg") ||
    !serviceWorker.includes("./assets/images/kairos-viii-magazine-cover-560.jpg")
  ) {
    throw new Error("Core visual app-shell cache check failed.");
  }
  if (webManifest.theme_color !== "#18261d" || webManifest.background_color !== "#050906") {
    throw new Error("Manifest Kairos color check failed.");
  }
  if (!webManifest.icons?.some((icon) => icon.src === "./assets/icons/kairos-icon-192.jpg")) {
    throw new Error("Optimized manifest icon check failed.");
  }

  Object.values(assetManifest)
    .filter((value) => typeof value === "string" && value.startsWith("./assets/app/"))
    .forEach((assetPath) => assertFileExists(path.join("docs", assetPath.replace(/^\.\//, ""))));

  assertFileExists(path.join("docs", "assets", "images", "kairos-viii-magazine-cover.jpg"));
  assertFileExists(path.join("docs", "assets", "images", "kairos-viii-magazine-cover-560.jpg"));
  assertFileExists(path.join("docs", "assets", "images", "kairos-viii-magazine-cover-640.jpg"));
  assertFileExists(path.join("docs", "assets", "icons", "kairos-favicon-48.jpg"));
  assertFileExists(path.join("docs", "assets", "backgrounds", "kairos-bg-01-mobile.jpg"));
  process.stdout.write("Static SEO/PWA/build-output checks passed.\n");
}

function printSummary(summary) {
  process.stdout.write(
    [
      "",
      `Performance summary (${summary.label})`,
      `  Runs: ${summary.runs}`,
      `  Performance: ${formatNumber(summary.performanceScore * 100, 0)}`,
      `  Accessibility: ${formatNumber(summary.accessibilityScore * 100, 0)}`,
      `  Best practices: ${formatNumber(summary.bestPracticesScore * 100, 0)}`,
      `  SEO: ${formatNumber(summary.seoScore * 100, 0)}`,
      `  LCP (ms): ${formatNumber(summary.lcpMs, 0)}`,
      `  INP (ms): ${formatNumber(summary.inpMs, 0)}`,
      `  TBT (ms): ${formatNumber(summary.tbtMs, 0)}`,
      `  CLS: ${formatNumber(summary.cls, 3)}`,
      `  Unused JS (KiB): ${formatNumber(summary.unusedJsBytes / 1024, 1)}`,
      `  Unused CSS (KiB): ${formatNumber(summary.unusedCssBytes / 1024, 1)}`,
      `  Raw reports: ${path.relative(repoRoot, lhciDir)}`,
      ""
    ].join("\n")
  );
}

async function main() {
  fs.mkdirSync(lhciDir, { recursive: true });
  removePerfArtifacts(lhciDir);
  fs.mkdirSync(chromeProfileDir, { recursive: true });

  const dist = readArg("--dist", "docs");
  const runCount = Math.max(Number(readArg("--runs", "2")) || 2, 1);

  runStaticBuildChecks();

  for (const profile of profiles) {
    await collectLighthouseRuns({ dist, runs: runCount, profile });
  }

  const collectedRuns = parseLighthouseRuns(lhciDir);
  profiles.forEach((profile) => {
    const profileRuns = collectedRuns.filter((run) => run.profile === profile.name);
    const summary = summarizeRuns(profile.label, profileRuns);
    printSummary(summary);
    reportAssertions(summary);
  });
}

main();
