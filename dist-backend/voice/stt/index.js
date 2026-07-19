"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STTEngine = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class STTEngine {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    async streamToText(audioChunks) {
        console.log(`[Voice/STT] Processing audio chunks via Deepgram/Whisper...`);
        return "User transcription mapped.";
    }
}
exports.STTEngine = STTEngine;
