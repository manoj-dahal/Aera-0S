"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakeWordEngine = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class WakeWordEngine {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    async listenForWakeWord(audioStream) {
        console.log(`[Voice/WakeWord] Listening for 'AERA' via Porcupine/Picovoice...`);
        // Simulated wake word detection
        return true;
    }
}
exports.WakeWordEngine = WakeWordEngine;
