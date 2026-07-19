"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiModule = void 0;
class GeminiModule {
    isInitialized = false;
    initialize() {
        this.isInitialized = true;
        console.log('[AERA] Initialized Gemini Module');
    }
}
exports.GeminiModule = GeminiModule;
