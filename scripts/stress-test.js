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
console.log(` AERA OS - STRESS TESTING PIPELINE (${ITERATIONS}x)`);
console.log("==================================================");

let failureCount = 0;

for (let i = 1; i <= ITERATIONS; i++) {
  console.log(`\n▶️  Running iteration ${i}/${ITERATIONS}...`);
  try {
    // Run the Jest suite silently, only outputting success/fail
    execSync('npx jest --silent --passWithNoTests', { stdio: 'ignore', cwd: rootDir });
    
    // Run a quick TS compilation check
    execSync('npx tsc --noEmit -p tsconfig.json', { stdio: 'ignore', cwd: rootDir });
    
    console.log(`✅ Iteration ${i} passed cleanly.`);
  } catch (error) {
    console.error(`❌ Iteration ${i} FAILED.`);
    failureCount++;
  }
}

console.log("\n==================================================");
if (failureCount === 0) {
  console.log(`🎉 STRESS TEST COMPLETE: 0 failures across ${ITERATIONS} runs. The system is extremely stable.`);
} else {
  console.error(`🚨 STRESS TEST FAILED: ${failureCount} failures detected. Race conditions or memory leaks may be present.`);
  process.exit(1);
}
console.log("==================================================");
