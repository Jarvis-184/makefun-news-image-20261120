import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { fileURLToPath } from 'node:url';
const sourceFile = join(import.meta.dirname ?? fileURLToPath(new URL('.', import.meta.url)), 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

function deploy() {
    if (!existsSync(sourceFile)) {
        console.error(`CRITICAL ERROR: ${sourceFile} is missing in the root directory.`);
        process.exit(1);
    }

    try {
        mkdirSync(outputDir, { recursive: true });
        const destination = join(outputDir, 'entry.png');
        copyFileSync(sourceFile, destination);
        console.log(`Successfully deployed ${sourceFile} to ${destination}`);
    } catch (error) {
        console.error(`DEPLOYMENT FAILED: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}

deploy();
