/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log("===================================");
console.log(" AERA OS - Advanced Build Pipeline");
console.log("===================================");

const rootDir = path.resolve(__dirname, '../../');

function runCommand(command, name) {
  console.log(`\n[${name}] Starting...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    console.log(`[${name}] ✅ Success`);
  } catch (error) {
    console.error(`[${name}] ❌ Failed`);
    process.exit(1);
  }
}

// 1. Clean previous build artifacts
console.log("\n[Clean] Removing old dist folders...");
['dist', 'dist-electron'].forEach(dir => {
  const target = path.join(rootDir, dir);
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
});

// 2. TypeScript compilation (Backend/Electron)
runCommand('npx tsc -p tsconfig.node.json', 'TypeScript Compilation');

// 3. Vite Build (Frontend/React)
runCommand('npx vite build', 'Vite Frontend Build');

console.log("\n🚀 Build pipeline completed. Ready for electron-builder packaging.");
