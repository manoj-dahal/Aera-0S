/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { ipcMain, IpcMainInvokeEvent, BrowserWindow } from 'electron';
import { HeadAgent } from '../../agents/head-agent/HeadAgent';
import * as os from 'os';

export function setupIpcHandlers() {
  const headAgent = new HeadAgent();

  // 1. Process Core AI Commands
  ipcMain.handle('aera:process-command', async (event: IpcMainInvokeEvent, command: string) => {
    console.log(`[IPC] Received UI command: ${command}`);
    
    // Stream log to the frontend terminal
    event.sender.send('system:log', `[User] ${command}`);
    
    try {
      const response = await headAgent.handleUserRequest(command);
      event.sender.send('system:log', `[AERA] ${response}`);
      return { success: true, response };
    } catch (error: any) {
      console.error(`[IPC] Error processing command:`, error);
      event.sender.send('system:log', `[Error] ${error.message || 'System failure'}`);
      return { success: false, error: 'Internal system error during task execution.' };
    }
  });

  // 2. System Status Monitoring
  ipcMain.handle('system:get-status', async () => {
    return {
      status: 'online',
      memory: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      platform: os.platform()
    };
  });

  // 3. Desktop Window Controls (Minimize, Maximize, Close)
  ipcMain.on('window:minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });

  ipcMain.on('window:maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.on('window:close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });
}