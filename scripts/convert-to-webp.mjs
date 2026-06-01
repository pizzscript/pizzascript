import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Directories to scan (relative to project root)
const SCAN_DIRS = [
  'public/assets/images',
  'assets/images',
];

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif']);
const WEBP_QUALITY = 90; // High quality — nearly indistinguishable from original

let totalOriginalBytes = 0;
let totalWebpBytes = 0;
let converted = 0;
let skipped = 0;

function getAllFiles(dir) {
  const files = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return files; }
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(full));
    } else if (EXTENSIONS.has(extname(entry).toLowerCase())) {
      files.push({ path: full, size: stat.size });
    }
  }
  return files;
}

async function convertFile({ path: filePath, size }) {
  const ext = extname(filePath).toLowerCase();
  const webpPath = filePath.slice(0, -ext.length) + '.webp';

  try {
    // Use lossless=true for PNGs with transparency, lossy for JPEGs
    const isLossless = ext === '.png';

    await sharp(filePath)
      .webp({
        quality: WEBP_QUALITY,
        lossless: false,       // lossy WebP is much smaller and still great quality
        nearLossless: false,
        smartSubsample: true,
        effort: 4,             // 0-6, higher = smaller file, slower; 4 is balanced
      })
      .toFile(webpPath);

    const { size: webpSize } = statSync(webpPath);

    totalOriginalBytes += size;
    totalWebpBytes += webpSize;
    converted++;

    const savings = (((size - webpSize) / size) * 100).toFixed(1);
    const origMB = (size / 1024 / 1024).toFixed(2);
    const webpMB = (webpSize / 1024 / 1024).toFixed(2);

    // Delete original after successful conversion
    unlinkSync(filePath);

    console.log(`✓ ${basename(filePath)} → .webp  ${origMB}MB → ${webpMB}MB  (-${savings}%)`);
  } catch (err) {
    console.error(`✗ Failed: ${filePath}  ${err.message}`);
    skipped++;
  }
}

async function main() {
  console.log('🍕 PizzaScript WebP Converter — Quality 90\n');

  let allFiles = [];
  for (const relDir of SCAN_DIRS) {
    const absDir = join(ROOT, relDir);
    const files = getAllFiles(absDir);
    allFiles.push(...files);
  }

  // Deduplicate by path (in case of overlap)
  const seen = new Set();
  allFiles = allFiles.filter(f => {
    if (seen.has(f.path)) return false;
    seen.add(f.path);
    return true;
  });

  console.log(`Found ${allFiles.length} images to convert...\n`);

  // Process in batches of 8 for speed
  const BATCH = 8;
  for (let i = 0; i < allFiles.length; i += BATCH) {
    const batch = allFiles.slice(i, i + BATCH);
    await Promise.all(batch.map(convertFile));
  }

  const savedMB = ((totalOriginalBytes - totalWebpBytes) / 1024 / 1024).toFixed(1);
  const origTotal = (totalOriginalBytes / 1024 / 1024).toFixed(1);
  const webpTotal = (totalWebpBytes / 1024 / 1024).toFixed(1);
  const pct = (((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log(`\n═══════════════════════════════════════`);
  console.log(`✅ Converted : ${converted}`);
  console.log(`⚠️  Skipped   : ${skipped}`);
  console.log(`📦 Before    : ${origTotal} MB`);
  console.log(`📦 After     : ${webpTotal} MB`);
  console.log(`💾 Saved     : ${savedMB} MB  (-${pct}%)`);
  console.log(`═══════════════════════════════════════`);
}

main();
