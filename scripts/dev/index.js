/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const { spawn } = require('child_process');
const path = require('path');

console.log("===================================");
console.log(" AERA OS - Dev Environment Boot");
console.log("===================================");

const rootDir = path.resolve(__dirname, '../../');

console.log("Starting concurrent Vite + Electron watch sequence...\n");

const devProcess = spawn('npm', ['run', 'electron:serve'], {
  stdio: 'inherit',
  cwd: rootDir,
  shell: true
});

devProcess.on('close', (code) => {
  console.log(`\n[Dev] Process exited with code ${code}`);
});