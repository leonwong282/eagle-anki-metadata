#!/usr/bin/env node
/**
 * Eagle Anki Metadata - Build Script
 *
 * Creates a clean distribution package with only necessary files.
 * Output: ../dist/Eagle Anki Metadata.eagleplugin/
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '../../dist');
const PLUGIN_NAME = 'Eagle Anki Metadata';
const OUTPUT_DIR = path.join(DIST_DIR, `${PLUGIN_NAME}.eagleplugin`);

// Files to include in the distribution
const INCLUDE_FILES = [
    'manifest.json',
    'index.html',
    'logo.png',
    'README.md'
];

// Directories to include (will copy entire directory)
const INCLUDE_DIRS = [
    'lib',
    'styles'
];

// Files to exclude from lib directory (if any)
const EXCLUDE_FROM_LIB = [];

/**
 * Clean and create directory
 */
function ensureCleanDir(dir) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
    }
    fs.mkdirSync(dir, { recursive: true });
}

/**
 * Copy file with logging
 */
function copyFile(src, dest) {
    const relativeSrc = path.relative(SOURCE_DIR, src);
    const relativeDest = path.relative(DIST_DIR, dest);

    fs.copyFileSync(src, dest);
    console.log(`  ✓ ${relativeSrc}`);
}

/**
 * Copy directory recursively
 */
function copyDir(src, dest, excludeFiles = []) {
    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (excludeFiles.includes(entry.name)) {
            continue;
        }

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath, excludeFiles);
        } else {
            copyFile(srcPath, destPath);
        }
    }
}

/**
 * Bundle fzstd from node_modules
 */
function bundleFzstd() {
    const fzstdSrc = path.join(SOURCE_DIR, 'node_modules/fzstd/umd/index.js');
    const fzstdDest = path.join(OUTPUT_DIR, 'lib/fzstd.min.js');

    if (fs.existsSync(fzstdSrc)) {
        fs.copyFileSync(fzstdSrc, fzstdDest);
        console.log(`  ✓ lib/fzstd.min.js (bundled from node_modules)`);
        return true;
    }
    return false;
}

/**
 * Read and update manifest version from package.json
 */
function syncVersion() {
    const packageJson = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, 'package.json'), 'utf8'));
    const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    if (packageJson.version !== manifest.version) {
        manifest.version = packageJson.version;
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
        console.log(`  ✓ Version synced to ${packageJson.version}`);
    }
}

/**
 * Calculate total size of distribution
 */
function calculateSize(dir) {
    let totalSize = 0;

    function walkDir(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else {
                totalSize += fs.statSync(fullPath).size;
            }
        }
    }

    walkDir(dir);
    return totalSize;
}

/**
 * Format file size
 */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Main build function
 */
function build() {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   Eagle Anki Metadata - Build Script       ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');

    // Step 1: Clean and create output directory
    console.log('📁 Creating output directory...');
    ensureCleanDir(OUTPUT_DIR);
    console.log(`   ${OUTPUT_DIR}`);
    console.log('');

    // Step 2: Copy individual files
    console.log('📄 Copying files...');
    for (const file of INCLUDE_FILES) {
        const srcPath = path.join(SOURCE_DIR, file);
        const destPath = path.join(OUTPUT_DIR, file);

        if (fs.existsSync(srcPath)) {
            copyFile(srcPath, destPath);
        } else {
            console.log(`  ⚠ ${file} (not found, skipped)`);
        }
    }
    console.log('');

    // Step 3: Copy directories
    console.log('📂 Copying directories...');
    for (const dir of INCLUDE_DIRS) {
        const srcPath = path.join(SOURCE_DIR, dir);
        const destPath = path.join(OUTPUT_DIR, dir);

        if (fs.existsSync(srcPath)) {
            console.log(`   ${dir}/`);
            copyDir(srcPath, destPath, EXCLUDE_FROM_LIB);
        } else {
            console.log(`  ⚠ ${dir}/ (not found, skipped)`);
        }
    }
    console.log('');

    // Step 4: Bundle fzstd
    console.log('📦 Bundling dependencies...');
    bundleFzstd();
    console.log('');

    // Step 5: Sync version
    console.log('🔄 Syncing version...');
    syncVersion();
    console.log('');

    // Step 6: Calculate and display stats
    const totalSize = calculateSize(OUTPUT_DIR);
    const fileCount = fs.readdirSync(OUTPUT_DIR, { recursive: true }).length;

    console.log('════════════════════════════════════════════');
    console.log('');
    console.log('✅ Build complete!');
    console.log('');
    console.log(`   📦 Output: dist/${PLUGIN_NAME}.eagleplugin/`);
    console.log(`   📊 Size: ${formatSize(totalSize)}`);
    console.log(`   📄 Files: ${fileCount}`);
    console.log('');
    console.log('   To install in Eagle:');
    console.log('   1. Compress the .eagleplugin folder to .zip');
    console.log('   2. Rename .zip to .eagleplugin');
    console.log('   3. Double-click to install in Eagle');
    console.log('');
}

// Run build
try {
    build();
} catch (error) {
    console.error('');
    console.error('❌ Build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
}
