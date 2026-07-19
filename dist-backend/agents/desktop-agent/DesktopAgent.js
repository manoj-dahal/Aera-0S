"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopAgent = void 0;
const child_process_1 = require("child_process");
const os = __importStar(require("os"));
class DesktopAgent {
    async executeCommand(command) {
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
    async launchApplication(macName, winCmd) {
        const platform = os.platform();
        let command = '';
        if (platform === 'darwin') {
            command = `open -a "${macName}"`;
        }
        else if (platform === 'win32') {
            command = `start ${winCmd}`;
        }
        else if (platform === 'linux') {
            command = `${winCmd} &`;
        }
        console.log(`[Desktop Agent] Executing OS process: ${command}`);
        return new Promise((resolve) => {
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
exports.DesktopAgent = DesktopAgent;
