const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const vendorDir = path.join(repoRoot, "docs", "assets", "vendor", "protomaps");

const vendorFiles = [
  {
    from: path.join(repoRoot, "node_modules", "pmtiles", "dist", "pmtiles.js"),
    to: path.join(vendorDir, "pmtiles.js")
  },
  {
    from: path.join(repoRoot, "node_modules", "@protomaps", "basemaps", "dist", "basemaps.js"),
    to: path.join(vendorDir, "basemaps.js")
  }
];

fs.mkdirSync(vendorDir, { recursive: true });

vendorFiles.forEach(({ from, to }) => {
  if (!fs.existsSync(from)) {
    throw new Error(`Missing route map vendor asset: ${from}`);
  }

  fs.copyFileSync(from, to);
});
