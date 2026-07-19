/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
const { execSync } = require('child_process');

console.log("==================================================");
console.log(" AERA OS - Final Post-Build System Audit");
console.log("==================================================");

try {
  console.log("\n[1/2] Verifying Distributable Outputs...");
  const distContents = execSync('ls -la dist/').toString();
  if (distContents.includes('index.html') && distContents.includes('assets')) {
    console.log("✅ React Frontend successfully verified in /dist");
  } else {
    throw new Error("Missing Frontend Artifacts");
  }

  console.log("\n[2/2] Verifying Backend Binaries...");
  const backendContents = execSync('ls -la dist-electron/main/').toString();
  if (backendContents.includes('index.js')) {
    console.log("✅ Electron Backend successfully verified in /dist-electron");
  } else {
    throw new Error("Missing Electron Main Artifacts");
  }

  console.log("\n==================================================");
  console.log(" 🎉 ALL DEPLOYMENT PIPELINES VERIFIED GREEN! 🎉");
  console.log("==================================================");

} catch (error) {
  console.error("❌ Post-Build Audit Failed", error);
  process.exit(1);
}
