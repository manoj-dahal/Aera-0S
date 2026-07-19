/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const { execSync } = require('child_process');
const path = require('path');

console.log("===================================");
console.log(" AERA OS - CI/CD Test Pipeline");
console.log("===================================");

const rootDir = path.resolve(__dirname, '../../');

console.log("\n[Testing] Executing Jest Unit & Integration Suites...");

try {
  // Run jest with coverage reporting
  execSync('npx jest --coverage', { stdio: 'inherit', cwd: rootDir });
  console.log("\n✅ All tests passed. System is stable.");
} catch (error) {
  console.error("\n❌ Test suite failed. Deployment aborted.");
  process.exit(1);
}