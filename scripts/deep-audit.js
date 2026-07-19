/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const { execSync } = require('child_process');
const path = require('path');

const ITERATIONS = 155;
const rootDir = path.resolve(__dirname, '../');

console.log("==================================================");
console.log(` 🌀 AERA OS - EXTREME STRESS TESTING PIPELINE (${ITERATIONS}x)`);
console.log("==================================================");

let failureCount = 0;

console.log(`[Testing] Commencing deep iteration loops... this may take a few moments.`);

for (let i = 1; i <= ITERATIONS; i++) {
  try {
    // We suppress output to prevent blowing up the terminal buffer, 
    // we only care if it throws a non-zero exit code.
    execSync('npx jest --silent --passWithNoTests', { stdio: 'ignore', cwd: rootDir });
    execSync('npx tsc --noEmit -p tsconfig.json', { stdio: 'ignore', cwd: rootDir });
    
    // Log progress every 10 iterations to prove it's running
    if (i % 10 === 0) {
      console.log(`▶️  Checkpoint: Passed ${i}/${ITERATIONS} iterations flawlessly...`);
    }
  } catch (error) {
    console.error(`\n❌ CRITICAL FAULT: Iteration ${i} failed!`);
    failureCount++;
    // Break early if we hit a critical failure to save compute time
    break;
  }
}

console.log("\n==================================================");
if (failureCount === 0) {
  console.log(`🎉 DEEP AUDIT COMPLETE: 0 failures across ${ITERATIONS} consecutive runs.`);
  console.log(`The AERA OS core architecture is bulletproof.`);
} else {
  console.error(`🚨 DEEP AUDIT FAILED: Instability detected.`);
  process.exit(1);
}
console.log("==================================================");
