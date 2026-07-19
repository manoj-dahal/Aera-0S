"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationAgent = void 0;
const vscode_1 = require("../../skills/vscode");
const photoshop_1 = require("../../skills/photoshop");
const os_controller_1 = require("../../skills/custom/os-controller");
const media_player_1 = require("../../skills/custom/media-player");
class ApplicationAgent {
    async executeAppSkill(appName, command) {
        console.log(`[Application Agent] Routing command to ${appName} skill module...`);
        const normalizedApp = appName.toLowerCase().replace(/\s/g, '');
        switch (normalizedApp) {
            case 'music':
            case 'spotify':
            case 'applemusic':
            case 'media':
            case 'audio':
                return await media_player_1.MediaPlayerSkill.executeCommand(command);
            case 'os':
            case 'system':
            case 'pc':
            case 'keyboard':
            case 'mouse':
                return await os_controller_1.OSControllerSkill.executeCommand(command);
            case 'vscode':
            case 'code':
                return await vscode_1.VSCodeSkill.executeCommand(command);
            case 'photoshop':
            case 'ps':
                return await photoshop_1.PhotoshopSkill.executeCommand(command);
            case 'blender':
            case 'figma':
            case 'premiere':
            case 'docker':
            case 'github':
                // Example passthrough logic for scaffolded application skills
                console.log(`[Application Agent] Simulated execution of ${normalizedApp} skill payload: ${command}`);
                return true;
            default:
                console.warn(`[Application Agent] Application skill module for "${appName}" not found.`);
                return false;
        }
    }
}
exports.ApplicationAgent = ApplicationAgent;
