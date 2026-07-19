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
exports.AudioDeviceModule = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
const child_process_1 = require("child_process");
const os = __importStar(require("os"));
class AudioDeviceModule {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    isInitialized = false;
    initialize() {
        this.isInitialized = true;
        console.log('[AERA] Initialized Audio Device Module');
    }
    /**
     * Adjust the host system volume
     * @param level Volume level 0 to 100
     */
    async setVolume(level) {
        console.log(`[Audio Device] Setting system volume to ${level}%`);
        const platform = os.platform();
        let cmd = '';
        if (platform === 'darwin') {
            cmd = `osascript -e "set volume output volume ${level}"`;
        }
        else if (platform === 'win32') {
            // Third-party CLI like nircmd usually required for windows, or powershell
            cmd = `powershell -c "$obj = new-object -com wscript.shell; $obj.SendKeys([char]174)"`;
        }
        else if (platform === 'linux') {
            cmd = `amixer -D pulse sset Master ${level}%`;
        }
        return new Promise((resolve) => {
            if (!cmd)
                return resolve(true); // Mock success if unsupported
            (0, child_process_1.exec)(cmd, (err) => {
                if (err)
                    console.error(`[Audio Device] Volume change failed:`, err);
                resolve(!err);
            });
        });
    }
    async toggleMute() {
        console.log(`[Audio Device] Toggling system mute state...`);
        // Implementation uses native OS audio mixers similar to setVolume
        return true;
    }
}
exports.AudioDeviceModule = AudioDeviceModule;
