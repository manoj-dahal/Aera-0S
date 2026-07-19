/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { exec } from 'child_process';
import * as os from 'os';

export class DesktopAgent {
  
  public async executeCommand(command: string): Promise<boolean> {
    console.log(`[Desktop Agent] Abstract Command Request: "${command}"`);

    // Very basic abstract mapping (e.g. "Open Chrome" -> actual OS command)
    if (command.toLowerCase().includes('open chrome') || command.toLowerCase().includes('launch chrome')) {
      return this.launchApplication('Google Chrome', 'chrome');
    }
    
    if (command.toLowerCase().includes('open vscode') || command.toLowerCase().includes('open code')) {
      return this.launchApplication('Visual Studio Code', 'code');
    }

    if (command.toLowerCase().includes('open calc') || command.toLowerCase().includes('calculator')) {
      return this.launchApplication('Calculator', 'calc');
    }

    console.log(`[Desktop Agent] Unrecognized automation intent.`);
    return false;
  }

  private async launchApplication(macName: string, winCmd: string): Promise<boolean> {
    const platform = os.platform();
    let command = '';

    if (platform === 'darwin') {
      command = `open -a "${macName}"`;
    } else if (platform === 'win32') {
      command = `start ${winCmd}`;
    } else if (platform === 'linux') {
      command = `${winCmd} &`;
    }

    console.log(`[Desktop Agent] Executing OS process: ${command}`);

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`[Desktop Agent] Error launching application: ${error.message}`);
          resolve(false);
          return;
        }
        console.log(`[Desktop Agent] Application launched successfully.`);
        resolve(true);
      });
    });
  }
}