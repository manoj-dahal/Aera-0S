/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';

export class DocumentLoader {
  public async loadFile(filePath: string): Promise<string> {
    console.log(`[Knowledge/Loaders] Attempting to load document at: ${filePath}`);
    
    const ext = path.extname(filePath).toLowerCase();
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // In a production environment, this would switch between pdf-parse, mammoth (docx), etc.
    switch (ext) {
      case '.txt':
      case '.md':
      case '.json':
      case '.csv':
        return fs.readFileSync(filePath, 'utf-8');
      case '.pdf':
        console.log(`[Knowledge/Loaders] Triggering PDF extraction pipeline...`);
        return "Mock extracted PDF text.";
      default:
        console.warn(`[Knowledge/Loaders] Unsupported file type: ${ext}. Attempting raw text read.`);
        return fs.readFileSync(filePath, 'utf-8');
    }
  }
}