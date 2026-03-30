const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const indexPath = path.join(docsDir, "index.html");
const snapshotPath = path.join(docsDir, "japan-escape-itinerary-offline.html");
const cssPath = path.join(docsDir, "style.min.css");
const routeCssPath = path.join(docsDir, "route.min.css");
const jsPath = path.join(docsDir, "script.min.js");
const routeContentJsPath = path.join(docsDir, "route-content.min.js");
const budgetUiJsPath = path.join(docsDir, "budget-ui.min.js");
const budgetContentJsPath = path.join(docsDir, "budget-content.min.js");
const essentialsContentJsPath = path.join(docsDir, "essentials-content.min.js");
const assetManifestPath = path.join(docsDir, "assets", "app", "asset-manifest.json");
const siteBackgroundPath = "./assets/background/bamboo-path-1697607635151.webp";
const siteBackgroundFilePath = path.join(
  docsDir,
  "assets",
  "background",
  "bamboo-path-1697607635151.webp"
);

const styleStartMarker = "<!-- build:inline-style:start -->";
const styleEndMarker = "<!-- build:inline-style:end -->";
const dataStartMarker = "<!-- build:inline-data:start -->";
const dataEndMarker = "<!-- build:inline-data:end -->";
const scriptStartMarker = "<!-- build:inline-script:start -->";
const scriptEndMarker = "<!-- build:inline-script:end -->";

function stripHeadTag(documentHtml, pattern) {
  return documentHtml.replace(pattern, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toDataUri(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = extension === ".webp" ? "image/webp" : "application/octet-stream";
  const base64 = fs.readFileSync(filePath).toString("base64");
  return `data:${mimeType};base64,${base64}`;
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

let html = fs.readFileSync(indexPath, "utf8");
const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, "utf8"));
const css = [fs.readFileSync(cssPath, "utf8").trim(), fs.readFileSync(routeCssPath, "utf8").trim()]
  .filter(Boolean)
  .join("\n");
const serializedAssetConfig = JSON.stringify(assetManifest).replace(/<\/script/gi, "<\\/script");
const js = [essentialsContentJsPath, budgetContentJsPath, routeContentJsPath, budgetUiJsPath, jsPath]
  .map((filePath) => fs.readFileSync(filePath, "utf8").trim())
  .filter(Boolean)
  .join("\n")
  .replace(/<\/script/gi, "<\\/script");

const styleBlock = `${styleStartMarker}\n  <style data-inline-style>${css}</style>\n  ${styleEndMarker}`;
const dataBlock = `${dataStartMarker}\n  <script data-app-assets>window.__JAPAN_APP_ASSETS__ = ${serializedAssetConfig};</script>\n  ${dataEndMarker}`;
const scriptBlock = `${scriptStartMarker}\n  <script data-inline-script>${js}</script>\n  ${scriptEndMarker}`;
const siteBackgroundDataUri = toDataUri(siteBackgroundFilePath);

html = replaceBlock(html, styleStartMarker, styleEndMarker, styleBlock, "Inline style");
html = replaceBlock(html, dataStartMarker, dataEndMarker, dataBlock, "Inline data");
html = replaceBlock(html, scriptStartMarker, scriptEndMarker, scriptBlock, "Inline script");
html = html.replace(new RegExp(escapeRegExp(siteBackgroundPath), "g"), siteBackgroundDataUri);

html = html.replace("<html lang=\"en\">", "<html lang=\"en\" data-offline-snapshot=\"true\">");
html = stripHeadTag(html, /\s*<link rel="manifest" href="\.\/manifest\.webmanifest">\r?\n/g);
html = stripHeadTag(
  html,
  /\s*<link rel="apple-touch-icon" sizes="180x180" href="\.\/assets\/icons\/apple-touch-icon\.png">\r?\n/g
);
html = stripHeadTag(html, /\s*<meta name="apple-mobile-web-app-capable" content="yes">\r?\n/g);
html = stripHeadTag(html, /\s*<meta name="apple-mobile-web-app-title" content="Japan Escape">\r?\n/g);
html = stripHeadTag(
  html,
  /\s*<meta name="apple-mobile-web-app-status-bar-style" content="default">\r?\n/g
);

fs.writeFileSync(snapshotPath, html);
