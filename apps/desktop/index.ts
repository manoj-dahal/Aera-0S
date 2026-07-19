/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

import { BrowserWindow, screen } from 'electron';

export class DesktopHUD {
  protected understandingAgent = new UnderstandingAgent();

  private overlayWindow: BrowserWindow | null = null;

  public initializeHUD() {
    console.log('[AERA] Initializing global transparent Desktop HUD');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    this.overlayWindow = new BrowserWindow({
      width,
      height,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    // Make the window click-through so the user can interact with their real desktop behind it
    this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
    
    // This allows AERA to render floating holographic objects seamlessly floating OVER the user's normal windows!
    console.log('[AERA] HUD securely mapped over OS desktop workspace. Floating interface active.');
  }
}
