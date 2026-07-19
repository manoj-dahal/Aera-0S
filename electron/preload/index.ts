/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { contextBridge, ipcRenderer } from 'electron';

// Expose safe, tightly scoped APIs to the renderer process
// This isolates the React frontend from Node.js APIs to prevent RCE vulnerabilities
contextBridge.exposeInMainWorld('aeraAPI', {
  // Agent & Command Execution
  processCommand: (command: string) => ipcRenderer.invoke('aera:process-command', command),
  
  // System Status
  getSystemStatus: () => ipcRenderer.invoke('system:get-status'),
  
  // Desktop Window Controls (For Custom Title Bar)
  windowMinimize: () => ipcRenderer.send('window:minimize'),
  windowMaximize: () => ipcRenderer.send('window:maximize'),
  windowClose: () => ipcRenderer.send('window:close'),
  
  // Event Listeners (Streaming logs & states to UI)
  onStateChange: (callback: (state: string) => void) => {
    ipcRenderer.on('aera:state-changed', (_event, state) => callback(state));
  },
  onSystemLog: (callback: (log: string) => void) => {
    ipcRenderer.on('system:log', (_event, log) => callback(log));
  },
  
  // Remove event listeners to prevent memory leaks
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
});

// Polyfill window elements as needed
window.addEventListener('DOMContentLoaded', () => {
  console.log('[AERA] Secure Preload Bridge Initialized.');
});