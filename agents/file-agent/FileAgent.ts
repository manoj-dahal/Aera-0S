/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';

export class FileAgent {
  public async createDirectory(dirPath: string): Promise<boolean> {
    console.log(`[File Agent] Creating directory: ${dirPath}`);
    if (!fs.existsSync(dirPath)) {
       fs.mkdirSync(dirPath, { recursive: true });
    }
    return true;
  }

  public async readConfig(filePath: string): Promise<string | null> {
    console.log(`[File Agent] Accessing file: ${filePath}`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return null;
  }
}