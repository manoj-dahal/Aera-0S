#!/bin/bash

CREDIT_BLOCK="<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 ============================================================================
-->
"

find . -type f -name "*.md" ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/dist-electron/*" | while read -r file; do
  # Check if it already has the credit
  if ! grep -q "MADE By Manoj Dahal" "$file"; then
    echo "$CREDIT_BLOCK" > temp_file
    cat "$file" >> temp_file
    mv temp_file "$file"
  fi
done

echo "✅ Credits injected to all Markdown files."
