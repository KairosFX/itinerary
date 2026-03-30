const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const templatePath = path.join(docsDir, "service-worker.template.js");
const outputPath = path.join(docsDir, "service-worker.js");
const assetManifestPath = path.join(docsDir, "assets", "app", "asset-manifest.json");
const siteBackgroundPath = "./assets/background/bamboo-path-1697607635151.webp";
const siteBackgroundVersion = "bamboo-path-1697607635151";

const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

const appShellPaths = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./japan-escape-itinerary-offline.html",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  siteBackgroundPath,
  "./assets/route-map-preview.svg",
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
  "./manifest.webmanifest",
  "./japan-escape-itinerary-offline.html"
];

const cacheVersion = `2026-03-29-${assetManifest.cacheVersion || "app-shell"}-${siteBackgroundVersion}`;

const nextServiceWorker = template
  .replace(/"__OFFLINE_CACHE_VERSION__"/g, JSON.stringify(cacheVersion))
  .replace("__APP_SHELL_PATHS__", JSON.stringify(appShellPaths, null, 2))
  .replace("__NETWORK_FIRST_PATHS__", JSON.stringify(networkFirstPaths, null, 2));

fs.writeFileSync(outputPath, nextServiceWorker);
