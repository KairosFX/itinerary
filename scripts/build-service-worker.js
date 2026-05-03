const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const templatePath = path.join(docsDir, "service-worker.template.js");
const outputPath = path.join(docsDir, "service-worker.js");
const assetManifestPath = path.join(docsDir, "assets", "app", "asset-manifest.json");

const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

const appShellPaths = [
  "./",
  "./index.html",
  "./404.html",
  "./itinerary-offline.html",
  "./manifest.webmanifest",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/kairos-favicon-48.jpg",
  "./assets/icons/kairos-icon-192.jpg",
  "./assets/icons/kairos-icon-512.jpg",
  "./assets/backgrounds/kairos-bg-01.jpg",
  "./assets/backgrounds/kairos-bg-01-mobile.jpg",
  "./assets/images/kairos-viii-magazine-cover-560.jpg",
  assetManifest.stylePath,
  assetManifest.scriptPath,
  assetManifest.routeStylePath,
  assetManifest.routeContentPath,
  assetManifest.budgetUiPath,
  assetManifest.budgetContentPath,
  assetManifest.essentialsContentPath
].filter(Boolean);

const networkFirstPaths = [
  "./",
  "./index.html",
  "./404.html",
  "./manifest.webmanifest",
  "./itinerary-offline.html"
];

function createHashForFiles(filePaths) {
  const hash = crypto.createHash("sha256");
  filePaths.forEach((filePath) => {
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return;
    }

    hash.update(path.relative(docsDir, filePath));
    hash.update(fs.readFileSync(filePath));
  });
  return hash.digest("hex").slice(0, 10);
}

function resolveAppShellFilePath(appShellPath) {
  const normalizedPath = appShellPath.replace(/^\.\//, "");
  return path.join(docsDir, normalizedPath || "index.html");
}

const shellHash = createHashForFiles(appShellPaths.map(resolveAppShellFilePath));
const cacheVersion = [assetManifest.cacheVersion || assetManifest.generatedAt || "app-shell", shellHash]
  .filter(Boolean)
  .join("-");

const nextServiceWorker = template
  .replace(/"__OFFLINE_CACHE_VERSION__"/g, JSON.stringify(cacheVersion))
  .replace("__APP_SHELL_PATHS__", JSON.stringify(appShellPaths, null, 2))
  .replace("__NETWORK_FIRST_PATHS__", JSON.stringify(networkFirstPaths, null, 2));

fs.writeFileSync(outputPath, nextServiceWorker);
