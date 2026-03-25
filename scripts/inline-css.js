const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const indexPath = path.join(repoRoot, "docs", "index.html");

const styleStartMarker = "<!-- build:inline-style:start -->";
const styleEndMarker = "<!-- build:inline-style:end -->";
const dataStartMarker = "<!-- build:inline-data:start -->";
const dataEndMarker = "<!-- build:inline-data:end -->";
const scriptStartMarker = "<!-- build:inline-script:start -->";
const scriptEndMarker = "<!-- build:inline-script:end -->";

const html = fs.readFileSync(indexPath, "utf8");
const styleBlock = `${styleStartMarker}\n  <link rel="stylesheet" href="./style.min.css">\n  ${styleEndMarker}`;
const dataBlock = `${dataStartMarker}\n  ${dataEndMarker}`;
const scriptBlock = `${scriptStartMarker}\n  <script src="./script.min.js"></script>\n  ${scriptEndMarker}`;

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
