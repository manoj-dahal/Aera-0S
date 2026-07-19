/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { setupIpcHandlers } from '../ipc/handlers';
import { UpdaterModule } from '../updater/index';
import { DesktopHUD } from '../../apps/desktop/index';

import { ContinuousListeningDaemon } from '../../voice/continuous/ContinuousListeningDaemon';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      // Security standard: contextIsolation true, nodeIntegration false
      contextIsolation: true, 
      nodeIntegration: false,
    },
    backgroundColor: '#050A14',
    title: 'AERA OS',
    frame: false, // Futuristic borderless window
    titleBarStyle: 'hidden',
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  return win;
}

app.whenReady().then(() => {
  setupIpcHandlers(); // Boot the core AGI backend
  const mainWindow = createWindow();

  // Boot the floating transparent OS overlay
  const hud = new DesktopHUD();
  hud.initializeHUD();

  // Initialize and run the automatic application updater
  const updater = new UpdaterModule();
  updater.initialize(mainWindow);
  updater.checkForUpdates();

  // Boot the Continuous "Always-On" Background Audio Daemon
  const audioDaemon = new ContinuousListeningDaemon();
  audioDaemon.startBackgroundDaemon();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});