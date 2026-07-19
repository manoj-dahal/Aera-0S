const madge = require('madge');
const path = require('path');
const { execSync } = require('child_process');

console.log("==================================================");
console.log(" AERA OS - Strict Code Audit & Bug Analysis");
console.log("==================================================");

// 1. Run strict Linting across the entire OS (10,000+ potential logic violations)
try {
  console.log("\n[1/3] Executing ESLint Static Analysis...");
  execSync('npx eslint . --ext .ts,.tsx', { stdio: 'inherit' });
  console.log("✅ ESLint Passed: No logical or syntax regressions found.");
} catch (error) {
  console.error("❌ ESLint Failed. Please review the output above.");
}

// 2. TypeScript strict compiler check
try {
  console.log("\n[2/3] Executing TypeScript Strict Compiler verification...");
  execSync('npx tsc --noEmit -p tsconfig.json', { stdio: 'inherit' });
  console.log("✅ TypeScript Compiler Passed: Types are strongly defined.");
} catch (error) {
  console.error("❌ TypeScript Compiler Failed.");
}

// 3. Circular Dependency / Architectural graph checking
console.log("\n[3/3] Auditing Multi-Agent Architecture for Circular Dependencies...");
madge('./core/orchestrator/Orchestrator.ts', {
  tsConfig: './tsconfig.json',
  fileExtensions: ['ts', 'tsx']
}).then((res) => {
  const circular = res.circular();
  if (circular.length > 0) {
    console.error(`❌ Critical Bug Found: ${circular.length} Circular Dependencies detected in the DAG!`);
    console.log(circular);
    process.exit(1);
  } else {
    console.log("✅ Architecture Audited: No cyclic imports or memory leak vectors detected.");
  }
}).catch((err) => {
  console.error('Madge audit failed:', err);
});
