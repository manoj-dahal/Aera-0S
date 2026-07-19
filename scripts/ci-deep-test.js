/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const { execSync } = require('child_process');
const path = require('path');

const ITERATIONS = 10;
const rootDir = path.resolve(__dirname, '../');

console.log("==================================================");
console.log(` 🚀 AERA OS - GITHUB ACTIONS DEEP AUDIT (${ITERATIONS}x)`);
console.log("==================================================");

let failureCount = 0;

for (let i = 1; i <= ITERATIONS; i++) {
  console.log(`▶️  Executing CI Pipeline Pass ${i}/${ITERATIONS}...`);
  try {
    // 1. Run Jest Suite
    execSync('npx jest --silent --passWithNoTests', { stdio: 'ignore', cwd: rootDir });
    
    // 2. Strict Type Check
    execSync('npx tsc --noEmit -p tsconfig.json', { stdio: 'ignore', cwd: rootDir });
    
    // 3. ESLint Audit
    execSync('npx eslint . --ext .ts,.tsx', { stdio: 'ignore', cwd: rootDir });
    
  } catch (error) {
    console.error(`\n❌ CI RUN FAILED ON ITERATION ${i}!`);
    failureCount++;
    break;
  }
}

console.log("\n==================================================");
if (failureCount === 0) {
  console.log(`🎉 CI DEEP AUDIT COMPLETE: 0 failures across ${ITERATIONS} consecutive runs.`);
} else {
  console.error(`🚨 CI DEEP AUDIT FAILED: The build is unstable.`);
  process.exit(1);
}
console.log("==================================================");
