#!/bin/bash

# We will search for the previous credit block and append the copyright line to it.
# The target files are all source code files.

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.css" \) ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/dist-electron/*" | while read -r file; do
  if grep -q "MADE By Manoj Dahal" "$file"; then
    if ! grep -q "Copyright (c) 2026 Manoj Dahal" "$file"; then
      # Use sed to insert the copyright line right after "MADE By Manoj Dahal"
      sed -i 's/ \* MADE By Manoj Dahal/ \* MADE By Manoj Dahal\n \* Copyright (c) 2026 Manoj Dahal/g' "$file"
    fi
  fi
done

# Same logic for Markdown HTML comments
find . -type f -name "*.md" ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/dist-electron/*" | while read -r file; do
  if grep -q "MADE By Manoj Dahal" "$file"; then
    if ! grep -q "Copyright (c) 2026 Manoj Dahal" "$file"; then
      sed -i 's/ MADE By Manoj Dahal/ MADE By Manoj Dahal\n Copyright (c) 2026 Manoj Dahal/g' "$file"
    fi
  fi
done

echo "✅ Copyright injected to all 250+ source and markdown files."
