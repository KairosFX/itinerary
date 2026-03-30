const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const appAssetsDir = path.join(docsDir, "assets", "app");
const manifestPath = path.join(appAssetsDir, "asset-manifest.json");

const assetDefinitions = [
  {
    key: "style",
    sourcePath: path.join(docsDir, "style.min.css"),
    extension: ".css"
  },
  {
    key: "routeStyle",
    sourcePath: path.join(docsDir, "route.min.css"),
    extension: ".css"
  },
  {
    key: "script",
    sourcePath: path.join(docsDir, "script.min.js"),
    extension: ".js"
  },
  {
    key: "routeContent",
    sourcePath: path.join(docsDir, "route-content.min.js"),
    extension: ".js"
  },
  {
    key: "budgetUi",
    sourcePath: path.join(docsDir, "budget-ui.min.js"),
    extension: ".js"
  },
  {
    key: "budgetContent",
    sourcePath: path.join(docsDir, "budget-content.min.js"),
    extension: ".js"
  },
  {
    key: "essentialsContent",
    sourcePath: path.join(docsDir, "essentials-content.min.js"),
    extension: ".js"
  }
];

const staticAssetDefinitions = [
  {
    key: "pageBackdropImage",
    sourcePath: path.join(docsDir, "assets", "icons", "1yegabjjbjp01.jpg")
  }
];

function createAssetHash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 10);
}

function toWebPath(fileName) {
  return `./assets/app/${fileName}`;
}

fs.mkdirSync(appAssetsDir, { recursive: true });

const manifest = {};
const retainedFiles = new Set([path.basename(manifestPath)]);

assetDefinitions.forEach(({ key, sourcePath, extension }) => {
  const assetBuffer = fs.readFileSync(sourcePath);
  const assetHash = createAssetHash(assetBuffer);
  const fileName = `${key}.${assetHash}${extension}`;
  const destinationPath = path.join(appAssetsDir, fileName);

  fs.writeFileSync(destinationPath, assetBuffer);

  manifest[`${key}Path`] = toWebPath(fileName);
  manifest[`${key}Hash`] = assetHash;
  retainedFiles.add(fileName);
});

staticAssetDefinitions.forEach(({ key, sourcePath }) => {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Static asset source was not found: ${sourcePath}`);
  }

  const assetBuffer = fs.readFileSync(sourcePath);
  const assetHash = createAssetHash(assetBuffer);
  const extension = path.extname(sourcePath);
  const baseName = path.basename(sourcePath, extension);
  const fileName = `${baseName}.${assetHash}${extension}`;
  const destinationPath = path.join(appAssetsDir, fileName);
  const legacyDestinationPath = path.join(appAssetsDir, path.basename(sourcePath));

  if (legacyDestinationPath !== destinationPath && fs.existsSync(legacyDestinationPath)) {
    fs.unlinkSync(legacyDestinationPath);
  }

  fs.writeFileSync(destinationPath, assetBuffer);
  manifest[`${key}Path`] = toWebPath(fileName);
  manifest[`${key}Hash`] = assetHash;
  retainedFiles.add(fileName);
});

manifest.generatedAt = new Date().toISOString();
manifest.cacheVersion = [
  manifest.styleHash,
  manifest.routeStyleHash,
  manifest.scriptHash,
  manifest.routeContentHash,
  manifest.budgetUiHash,
  manifest.budgetContentHash,
  manifest.essentialsContentHash,
  manifest.pageBackdropImageHash
]
  .filter(Boolean)
  .join("-");

fs.readdirSync(appAssetsDir, { withFileTypes: true }).forEach((entry) => {
  if (!entry.isFile()) {
    return;
  }

  if (retainedFiles.has(entry.name)) {
    return;
  }

  fs.unlinkSync(path.join(appAssetsDir, entry.name));
});

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
