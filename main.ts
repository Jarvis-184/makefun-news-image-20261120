import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { copyFileSync, mkdirSync, existsSync, accessSync, constants } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, 'entry.png');
// Get output directory from environment variable or default to /output
const destDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const dest = join(destDir, 'entry.png');

// Verify source file exists
if (!existsSync(src)) {
  console.error(`Error: Source file ${src} not found.`);
  process.exit(1);
}

// Create output directory recursively if it doesn't exist
try {
  mkdirSync(destDir, { recursive: true });
} catch (err) {
  console.error(`Error: Failed to create directory ${destDir}: ${err}`);
  process.exit(1);
}

// Verify directory is writable
try {
  accessSync(destDir, constants.W_OK);
} catch (err) {
  console.error(`Error: Destination directory ${destDir} is not writable.`);
  process.exit(1);
}

// Copy the file
try {
  copyFileSync(src, dest);
  console.log(`Successfully copied ${src} to ${dest}`);
} catch (err) {
  console.error(`Error: Failed to copy file to ${dest}: ${err}`);
  process.exit(1);
}
