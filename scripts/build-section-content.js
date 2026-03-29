const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const dataDir = path.join(docsDir, "assets", "data");

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf8"));
}

function writeRuntimeModule(targetFileName, runtimeGlobal, payload) {
  const serializedPayload = JSON.stringify(payload, null, 2).replace(/<\/script/gi, "<\\/script");
  const nextContents = `window.${runtimeGlobal} = ${serializedPayload};\n`;
  fs.writeFileSync(path.join(docsDir, targetFileName), nextContents);
}

writeRuntimeModule("budget-content.js", "__JAPAN_BUDGET_CONTENT__", readJson("budget-estimate-sources.json"));
writeRuntimeModule("essentials-content.js", "__JAPAN_ESSENTIALS_CONTENT__", {
  bookingTransitItems: readJson("booking-transit-items.json"),
  transitDetailItems: readJson("transit-details.json")
});
