/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { autoUpdater } from 'electron-updater';
import { ipcMain, BrowserWindow } from 'electron';

export class UpdaterModule {
  public isInitialized = false;

  public initialize(mainWindow?: BrowserWindow) {
    this.isInitialized = true;
    console.log('[AERA] Initialized Updater Module');

    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('checking-for-update', () => {
      console.log('[Updater] Checking for application updates...');
    });

    autoUpdater.on('update-available', (info) => {
      console.log(`[Updater] Update available: Version ${info.version}`);
      if (mainWindow) {
        mainWindow.webContents.send('system:log', `[System] New update available: v${info.version}. Initializing secure download...`);
      }
      autoUpdater.downloadUpdate();
    });

    autoUpdater.on('update-not-available', () => {
      console.log('[Updater] AERA OS is currently up to date.');
    });

    autoUpdater.on('download-progress', (progressObj) => {
      const log_message = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent.toFixed(2)}%`;
      console.log(`[Updater] ${log_message}`);
    });

    autoUpdater.on('update-downloaded', () => {
      console.log('[Updater] Update downloaded. Ready to install on quit.');
      if (mainWindow) {
        mainWindow.webContents.send('system:log', '[System] Update downloaded. Will install automatically upon OS shutdown.');
      }
    });

    autoUpdater.on('error', (err) => {
      console.error('[Updater] Auto-updater encountered an error:', err);
    });
  }

  public checkForUpdates() {
    try {
      autoUpdater.checkForUpdatesAndNotify();
    } catch (e) {
      console.error('[Updater] Could not check for updates', e);
    }
  }
}
