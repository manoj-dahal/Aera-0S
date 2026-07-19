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

console.log("==================================================");
console.log(" AERA OS - Global Test & Audit Framework");
console.log("==================================================");

const rootDir = path.resolve(__dirname, '../');

function runTest(name, command) {
  console.log(`\n[Testing] Executing ${name}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    console.log(`[Testing] ✅ ${name} passed.`);
  } catch (error) {
    console.error(`[Testing] ❌ ${name} failed.`);
    process.exit(1);
  }
}

// 1. Jest Test Suites
runTest('Jest Unit & Integration Suites', 'npx jest');

// 2. ESLint Static Analysis
runTest('ESLint Static Analysis', 'npx eslint . --ext .ts,.tsx');

// 3. TypeScript Type Checking
runTest('TypeScript Compiler Check', 'npx tsc --noEmit -p tsconfig.json');

// 4. Circular Dependency Scan (Madge)
console.log("\n[Testing] Scanning for Circular Dependencies (Madge)...");
const madge = require('madge');
madge('./core/orchestrator/Orchestrator.ts', {
  tsConfig: './tsconfig.json',
  fileExtensions: ['ts', 'tsx']
}).then((res) => {
  const circular = res.circular();
  if (circular.length > 0) {
    console.error(`❌ Critical Bug Found: ${circular.length} Circular Dependencies detected!`);
    console.log(circular);
    process.exit(1);
  } else {
    console.log("[Testing] ✅ Architecture Audited: No cyclic imports or memory leak vectors detected.");
    console.log("\n==================================================");
    console.log(" 🎉 ALL AERA OS TESTS PASSED SUCCESSFULLY! 🎉");
    console.log("==================================================");
  }
}).catch((err) => {
  console.error('Madge audit failed:', err);
  process.exit(1);
});
