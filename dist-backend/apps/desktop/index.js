"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopHUD = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
const electron_1 = require("electron");
class DesktopHUD {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    overlayWindow = null;
    initializeHUD() {
        console.log('[AERA] Initializing global transparent Desktop HUD');
        const primaryDisplay = electron_1.screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;
        this.overlayWindow = new electron_1.BrowserWindow({
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
exports.DesktopHUD = DesktopHUD;
