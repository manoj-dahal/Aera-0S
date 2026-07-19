/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import * as os from 'os';

export class HealthAgent {
  public async runDiagnostics(): Promise<any> {
    console.log(`[Health Agent] Running system hardware diagnostics...`);
    const cpus = os.cpus();
    const totalMem = os.totalmem() / (1024 * 1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024 * 1024);
    
    return {
      coreCount: cpus.length,
      processor: cpus[0].model,
      totalMemoryGB: totalMem.toFixed(2),
      freeMemoryGB: freeMem.toFixed(2),
      uptimeHours: (os.uptime() / 3600).toFixed(2),
      platform: os.platform()
    };
  }
}