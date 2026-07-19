"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPlayerSkill = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
const keyboard_1 = require("../../desktop/keyboard");
const audio_1 = require("../../desktop/devices/audio");
class MediaPlayerSkill {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    static keyboard = new keyboard_1.KeyboardModule();
    static audio = new audio_1.AudioDeviceModule();
    /**
     * Translates abstract media commands (music, videos, Spotify, Apple Music)
     * into physical OS media control instructions.
     */
    static async executeCommand(command) {
        console.log(`[Media Player Skill] Processing music/audio intent: "${command}"`);
        const normalized = command.toLowerCase();
        try {
            if (normalized.includes('play') || normalized.includes('pause')) {
                console.log(`[Media Player] Triggering OS Play/Pause media key...`);
                return await this.keyboard.pressKey('audio_play');
            }
            if (normalized.includes('next') || normalized.includes('skip')) {
                console.log(`[Media Player] Triggering OS Next Track media key...`);
                return await this.keyboard.pressKey('audio_next');
            }
            if (normalized.includes('previous') || normalized.includes('back')) {
                console.log(`[Media Player] Triggering OS Previous Track media key...`);
                return await this.keyboard.pressKey('audio_prev');
            }
            if (normalized.includes('volume up') || normalized.includes('louder')) {
                console.log(`[Media Player] Triggering OS Volume Up...`);
                return await this.keyboard.pressKey('audio_vol_up');
            }
            if (normalized.includes('volume down') || normalized.includes('quieter')) {
                console.log(`[Media Player] Triggering OS Volume Down...`);
                return await this.keyboard.pressKey('audio_vol_down');
            }
            if (normalized.includes('mute') || normalized.includes('silence')) {
                return await this.audio.toggleMute();
            }
            console.warn(`[Media Player Skill] Audio intent not strictly mapped: "${command}"`);
            return false;
        }
        catch (err) {
            console.error(`[Media Player Skill] Failed executing media control:`, err);
            return false;
        }
    }
}
exports.MediaPlayerSkill = MediaPlayerSkill;
