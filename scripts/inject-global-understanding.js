const fs = require('fs');
const path = require('path');

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Skip files that already have it or are interfaces
      if (!content.includes('UnderstandingAgent') && content.includes('export class')) {
        const segments = fullPath.split('/');
        const depth = segments.length - 1; 
        const relativeDots = '../'.repeat(depth);
        const importPath = `${relativeDots}agents/understanding-agent/UnderstandingAgent`;
        
        const importStmt = `import { UnderstandingAgent } from '${importPath}';\n`;
        
        // Insert import after the copyright block
        content = content.replace(/(\*\/\n)/, `$1\n${importStmt}`);
        
        // Insert instantiation inside the main class definition
        content = content.replace(/(export class \w+ \{)/, `$1\n  protected understandingAgent = new UnderstandingAgent();\n`);
        
        fs.writeFileSync(fullPath, content);
        console.log(`Injected UnderstandingAgent into: ${fullPath}`);
      }
    }
  }
}

['vision', 'desktop', 'voice', 'apps'].forEach(processDir);
