#!/bin/bash

# Find all empty TypeScript files and inject a boilerplate export
find . -type f -name "*.ts" -empty ! -path "./node_modules/*" | while read -r file; do
  # Extract the class name from the directory path for a nice default export
  DIR_NAME=$(basename $(dirname "$file"))
  # Convert kebab-case to PascalCase (e.g. desktop-agent -> DesktopAgent)
  CLASS_NAME=$(echo "$DIR_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1' OFS='')
  
  if [[ "$CLASS_NAME" == "" || "$CLASS_NAME" == "." ]]; then
    CLASS_NAME="Module"
  fi

  echo "export class ${CLASS_NAME}Module {" > "$file"
  echo "  public isInitialized: boolean = false;" >> "$file"
  echo "" >> "$file"
  echo "  public initialize() {" >> "$file"
  echo "    this.isInitialized = true;" >> "$file"
  echo "    console.log('[AERA] Initialized ${CLASS_NAME} Module');" >> "$file"
  echo "  }" >> "$file"
  echo "}" >> "$file"
done

# Same for empty JS files
find . -type f -name "*.js" -empty ! -path "./node_modules/*" | while read -r file; do
  echo "module.exports = function() { console.log('Module initialized'); };" > "$file"
done

# Same for empty TSX files (React Components)
find . -type f -name "*.tsx" -empty ! -path "./node_modules/*" | while read -r file; do
  DIR_NAME=$(basename $(dirname "$file"))
  CLASS_NAME=$(echo "$DIR_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1' OFS='')
  echo "import React from 'react';" > "$file"
  echo "export const ${CLASS_NAME}View: React.FC = () => <div>${CLASS_NAME} View Placeholder</div>;" >> "$file"
done

echo "✅ All empty placeholders populated."
