const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const indexPath = path.join(docsDir, "index.html");
const snapshotPath = path.join(docsDir, "japan-escape-itinerary-offline.html");
const routePreviewPath = path.join(docsDir, "assets", "route-map-preview.svg");
const cssPath = path.join(docsDir, "style.min.css");
const jsPath = path.join(docsDir, "script.min.js");
const bookingTransitDataPath = path.join(
  docsDir,
  "assets",
  "data",
  "booking-transit-items.json"
);
const transitDetailsDataPath = path.join(
  docsDir,
  "assets",
  "data",
  "transit-details.json"
);
const budgetEstimateDataPath = path.join(
  docsDir,
  "assets",
  "data",
  "budget-estimate-sources.json"
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
const routePreviewSvg = fs.readFileSync(routePreviewPath, "utf8");
const routePreviewDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(routePreviewSvg)}`;
const css = fs.readFileSync(cssPath, "utf8").trim();
const bookingTransitData = fs
  .readFileSync(bookingTransitDataPath, "utf8")
  .trim()
  .replace(/<\/script/gi, "<\\/script");
const transitDetailsData = fs
  .readFileSync(transitDetailsDataPath, "utf8")
  .trim()
  .replace(/<\/script/gi, "<\\/script");
const budgetEstimateData = fs
  .readFileSync(budgetEstimateDataPath, "utf8")
  .trim()
  .replace(/<\/script/gi, "<\\/script");
const js = fs
  .readFileSync(jsPath, "utf8")
  .trim()
  .replace(/<\/script/gi, "<\\/script");

const styleBlock = `${styleStartMarker}\n  <style data-inline-style>${css}</style>\n  ${styleEndMarker}`;
const dataBlock = `${dataStartMarker}\n  <script type="application/json" data-booking-transit-inline>${bookingTransitData}</script>\n  <script type="application/json" data-budget-estimate-inline>${budgetEstimateData}</script>\n  <script type="application/json" data-transit-details-inline>${transitDetailsData}</script>\n  ${dataEndMarker}`;
const scriptBlock = `${scriptStartMarker}\n  <script data-inline-script>${js}</script>\n  ${scriptEndMarker}`;

html = replaceBlock(html, styleStartMarker, styleEndMarker, styleBlock, "Inline style");
html = replaceBlock(html, dataStartMarker, dataEndMarker, dataBlock, "Inline data");
html = replaceBlock(html, scriptStartMarker, scriptEndMarker, scriptBlock, "Inline script");

html = html.replace("<html lang=\"en\">", "<html lang=\"en\" data-offline-snapshot=\"true\">");
html = html.replace('src="./assets/route-map-preview.svg"', `src="${routePreviewDataUrl}"`);
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
