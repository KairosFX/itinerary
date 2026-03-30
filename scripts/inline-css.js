const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const indexPath = path.join(repoRoot, "docs", "index.html");
const criticalCssPath = path.join(repoRoot, "docs", "critical.css");
const assetManifestPath = path.join(repoRoot, "docs", "assets", "app", "asset-manifest.json");

const styleStartMarker = "<!-- build:inline-style:start -->";
const styleEndMarker = "<!-- build:inline-style:end -->";
const dataStartMarker = "<!-- build:inline-data:start -->";
const dataEndMarker = "<!-- build:inline-data:end -->";
const scriptStartMarker = "<!-- build:inline-script:start -->";
const scriptEndMarker = "<!-- build:inline-script:end -->";

const html = fs.readFileSync(indexPath, "utf8");
const criticalCss = fs.readFileSync(criticalCssPath, "utf8").trim();
const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, "utf8"));
const stylePath = assetManifest.stylePath;
const scriptPath = assetManifest.scriptPath;
const serializedAssetConfig = JSON.stringify(assetManifest).replace(/<\/script/gi, "<\\/script");

if (!stylePath || !scriptPath) {
  throw new Error("Versioned asset paths were not found in docs/assets/app/asset-manifest.json");
}

const styleBlock = `${styleStartMarker}\n  <style data-critical-style>${criticalCss}</style>\n  <link rel="preload" href="${stylePath}" as="style" fetchpriority="high">\n  <link rel="preload" href="${scriptPath}" as="script" fetchpriority="high">\n  <link rel="stylesheet" href="${stylePath}" media="print" onload="this.media='all'">\n  <noscript><link rel="stylesheet" href="${stylePath}"></noscript>\n  ${styleEndMarker}`;
const dataBlock = `${dataStartMarker}\n  <script data-app-assets>window.__JAPAN_APP_ASSETS__ = ${serializedAssetConfig};</script>\n  ${dataEndMarker}`;
const scriptBlock = `${scriptStartMarker}\n  <script src="${scriptPath}" defer></script>\n  ${scriptEndMarker}`;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceBlock(documentHtml, startMarker, endMarker, nextBlock, label) {
  if (!documentHtml.includes(startMarker) || !documentHtml.includes(endMarker)) {
    throw new Error(`${label} markers not found in docs/index.html`);
  }

  return documentHtml.replace(
    new RegExp(`${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`),
    () => nextBlock
  );
}

const withInlineStyle = replaceBlock(
  html,
  styleStartMarker,
  styleEndMarker,
  styleBlock,
  "Inline style"
);

const withInlineData = replaceBlock(
  withInlineStyle,
  dataStartMarker,
  dataEndMarker,
  dataBlock,
  "Inline data"
);

const nextHtml = replaceBlock(
  withInlineData,
  scriptStartMarker,
  scriptEndMarker,
  scriptBlock,
  "Inline script"
);

fs.writeFileSync(indexPath, nextHtml);
