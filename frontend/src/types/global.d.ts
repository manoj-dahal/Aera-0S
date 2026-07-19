/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export interface AeraAPI {
  processCommand: (command: string) => Promise<{ success: boolean; response?: string; error?: string }>;
  getSystemStatus: () => Promise<{ status: string, memory: any, cpuUsage: any, platform: string }>;
  windowMinimize: () => void;
  windowMaximize: () => void;
  windowClose: () => void;
  onStateChange: (callback: (state: string) => void) => void;
  onSystemLog: (callback: (log: string) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    aeraAPI: AeraAPI;
  }
}