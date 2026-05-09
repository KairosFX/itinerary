#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const originalsDir = path.join(docsDir, "assets", "backgrounds", "original");
const scriptPath = path.join(docsDir, "script.js");

const minimumWidth = 5000;
const preferredWidth = 7000;
const excellentWidth = 8000;
const bestMinWidth = 9000;
const bestMaxWidth = 12000;
const lowResolutionWidthMin = 1900;
const lowResolutionWidthMax = 2300;

function getArgumentValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return "";
  }

  return process.argv[index + 1] || "";
}

function getImageFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Directory does not exist: ${directoryPath}`);
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name))
    .map((entry) => path.join(directoryPath, entry.name))
    .sort((first, second) => path.basename(first).localeCompare(path.basename(second)));
}

function readPngDimensions(buffer, filePath) {
  const pngSignature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error(`Not a PNG file: ${filePath}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function readJpegDimensions(buffer, filePath) {
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

function readImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (/\.png$/i.test(filePath)) {
    return readPngDimensions(buffer, filePath);
  }

  return readJpegDimensions(buffer, filePath);
}

function formatBytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatMegapixels(width, height) {
  return `${((width * height) / 1000000).toFixed(1)} MP`;
}

function formatBoolean(value) {
  return value ? "yes" : "no";
}

function isAroundLowResolutionDesktopWidth(width) {
  return width >= lowResolutionWidthMin && width <= lowResolutionWidthMax;
}

function getQualityStatus(width) {
  if (isAroundLowResolutionDesktopWidth(width)) {
    return "FAIL not acceptable for desktop background around 2048px wide";
  }

  if (width < minimumWidth) {
    return "FAIL below 5000px minimum";
  }

  if (width >= bestMinWidth && width <= bestMaxWidth) {
    return "PASS best-tier panorama width";
  }

  if (width >= excellentWidth) {
    return "PASS excellent 8000px+";
  }

  if (width >= preferredWidth) {
    return "PASS preferred 7000px+";
  }

  return "PASS minimum 5000px+";
}

function readSlideshowReferences() {
  if (!fs.existsSync(scriptPath)) {
    return [];
  }

  const script = fs.readFileSync(scriptPath, "utf8");
  return [...script.matchAll(/src:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function main() {
  const targetDir = path.resolve(getArgumentValue("--dir") || originalsDir);
  const files = getImageFiles(targetDir);
  const references = readSlideshowReferences();
  const originalPrefix = "./assets/backgrounds/original/";
  const usedFilenames = new Set(
    references
      .filter((reference) => reference.startsWith(originalPrefix))
      .map((reference) => path.basename(reference))
  );
  const warnings = [];
  const failures = [];

  process.stdout.write(`Background originals directory: ${targetDir}\n`);
  process.stdout.write(
    "filename | used | width | height | megapixels | file size | 5000px min | 7000px preferred | 8000px excellent | status\n"
  );

  files.forEach((filePath) => {
    const stats = fs.statSync(filePath);
    const { width, height } = readImageDimensions(filePath);
    const filename = path.basename(filePath);
    const used = usedFilenames.has(filename);
    const status = getQualityStatus(width);
    const passesMinimum = width >= minimumWidth;
    const passesPreferred = width >= preferredWidth;
    const passesExcellent = width >= excellentWidth;

    process.stdout.write(
      [
        filename,
        formatBoolean(used),
        width,
        height,
        formatMegapixels(width, height),
        formatBytes(stats.size),
        formatBoolean(passesMinimum),
        formatBoolean(passesPreferred),
        formatBoolean(passesExcellent),
        status
      ].join(" | ") + "\n"
    );

    if (!passesMinimum) {
      const message = `${filename} is ${width}px wide, below the ${minimumWidth}px desktop minimum.`;
      (used ? failures : warnings).push(message);
    }

    if (isAroundLowResolutionDesktopWidth(width)) {
      const message = `${filename} is around 2048px wide and is not acceptable for a desktop background.`;
      (used ? failures : warnings).push(message);
    }
  });

  if (!files.length) {
    failures.push("No JPEG or PNG images found.");
  }

  process.stdout.write("\nSlideshow references\n");
  references.forEach((reference) => {
    const filePath = path.join(docsDir, reference.replace(/^\.\//, ""));
    const isOriginal = reference.startsWith(originalPrefix);
    const exists = fs.existsSync(filePath);
    process.stdout.write(`${isOriginal && exists ? "OK " : "BAD"} ${reference}\n`);
    if (!isOriginal) {
      failures.push(`Slideshow reference is not in ${originalPrefix}: ${reference}`);
    }
    if (!exists) {
      failures.push(`Slideshow reference is missing: ${reference}`);
    }
  });

  if (warnings.length) {
    process.stdout.write("\nBackground dimension warnings:\n");
    warnings.forEach((warning) => process.stdout.write(`- ${warning}\n`));
  }

  if (failures.length) {
    process.stderr.write("\nBackground dimension check failed:\n");
    failures.forEach((failure) => process.stderr.write(`- ${failure}\n`));
    process.exitCode = 1;
    return;
  }

  process.stdout.write("\nBackground dimension check passed.\n");
}

main();
