#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const defaultDesktopDir = path.join(docsDir, "assets", "backgrounds", "original");
const scriptPath = path.join(docsDir, "script.js");
const minimumWidth = 5000;
const lowResolutionWidthMin = 1900;
const lowResolutionWidthMax = 2300;

function getArgumentValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return "";
  }
  return process.argv[index + 1] || "";
}

function getJpegFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Directory does not exist: ${directoryPath}`);
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(jpe?g)$/i.test(entry.name))
    .map((entry) => path.join(directoryPath, entry.name))
    .sort((first, second) => path.basename(first).localeCompare(path.basename(second)));
}

function readJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error(`Not a JPEG file: ${filePath}`);
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (buffer[offset] === 0xff) {
      offset += 1;
    }

    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd9 || marker === 0xda) {
      break;
    }
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      continue;
    }
    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      };
    }

    offset += segmentLength;
  }

  throw new Error(`Could not read JPEG dimensions: ${filePath}`);
}

function formatBytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isAroundLowResolutionDesktopWidth(width) {
  return width >= lowResolutionWidthMin && width <= lowResolutionWidthMax;
}

function getDesktopOriginalStatus(width, used) {
  if (isAroundLowResolutionDesktopWidth(width)) {
    return used
      ? "FAIL not acceptable for desktop slideshow around 2048px wide"
      : "WARN not acceptable for desktop slideshow around 2048px wide";
  }

  if (width >= minimumWidth) {
    return "PASS true high-res original";
  }

  return used
    ? "FAIL below 5000px desktop slideshow minimum"
    : "WARN below 5000px minimum; keep out of desktop slideshow";
}

function printDirectoryReport(label, directoryPath, { failOnLowResolution = true, usedFilenames = null } = {}) {
  const files = getJpegFiles(directoryPath);
  const failures = [];
  const warnings = [];

  process.stdout.write(`\n${label}\n`);
  process.stdout.write(`Directory: ${directoryPath}\n`);
  process.stdout.write("filename | used | width | height | file size | status\n");

  files.forEach((filePath) => {
    const stats = fs.statSync(filePath);
    const { width, height } = readJpegDimensions(filePath);
    const filename = path.basename(filePath);
    const used = usedFilenames instanceof Set ? usedFilenames.has(filename) : true;
    const status = getDesktopOriginalStatus(width, used);
    process.stdout.write(`${filename} | ${used ? "yes" : "no"} | ${width} | ${height} | ${formatBytes(stats.size)} | ${status}\n`);
    if (!status.startsWith("PASS") && failOnLowResolution) {
      const message = `${filename} is ${width}x${height}: ${status}`;
      (used ? failures : warnings).push(message);
    }
  });

  if (!files.length) {
    failures.push("No JPEG files found.");
  }

  if (warnings.length) {
    process.stdout.write("\nBackground original warnings:\n");
    warnings.forEach((warning) => process.stdout.write(`- ${warning}\n`));
  }

  return failures;
}

function readOriginalBackdropReferences() {
  const script = fs.readFileSync(scriptPath, "utf8");
  const matches = [...script.matchAll(/src:\s*"([^"]+)"/g)];
  return matches.map((match) => match[1]);
}

function verifyOriginalBackdropReferences(desktopDir) {
  const failures = [];
  const references = readOriginalBackdropReferences();
  const originalPrefix = "./assets/backgrounds/original/";

  process.stdout.write("\nOriginal slideshow references\n");
  if (!references.length) {
    return ["No original backdrop references were found in docs/script.js."];
  }

  references.forEach((reference) => {
    const isOriginal = reference.startsWith(originalPrefix);
    const filePath = path.join(docsDir, reference.replace(/^\.\//, ""));
    const exists = fs.existsSync(filePath);
    const withinDesktopDir = path.dirname(filePath) === desktopDir;
    process.stdout.write(`${isOriginal && exists && withinDesktopDir ? "OK " : "BAD"} ${reference}\n`);
    if (!isOriginal) {
      failures.push(`Slideshow reference is not in ${originalPrefix}: ${reference}`);
    }
    if (!exists) {
      failures.push(`Slideshow reference is missing: ${reference}`);
    }
    if (exists && !withinDesktopDir) {
      failures.push(`Slideshow reference is outside the verified originals folder: ${reference}`);
    }
  });

  return failures;
}

function readUsedOriginalFilenames() {
  const originalPrefix = "./assets/backgrounds/original/";
  return new Set(
    readOriginalBackdropReferences()
      .filter((reference) => reference.startsWith(originalPrefix))
      .map((reference) => path.basename(reference))
  );
}

function main() {
  const desktopDir = path.resolve(getArgumentValue("--desktop") || defaultDesktopDir);
  const sourceDir = getArgumentValue("--source");
  const usedOriginalFilenames = readUsedOriginalFilenames();
  const failures = [];

  if (sourceDir) {
    failures.push(
      ...printDirectoryReport("Source JPEG report", path.resolve(sourceDir), {
        failOnLowResolution: true
      })
    );
  }

  failures.push(
    ...printDirectoryReport("Desktop original background report", desktopDir, {
      usedFilenames: usedOriginalFilenames
    })
  );
  failures.push(...verifyOriginalBackdropReferences(desktopDir));

  if (failures.length) {
    process.stderr.write("\nBackground original verification failed:\n");
    failures.forEach((failure) => process.stderr.write(`- ${failure}\n`));
    process.exitCode = 1;
    return;
  }

  process.stdout.write("\nBackground original verification passed.\n");
}

main();
