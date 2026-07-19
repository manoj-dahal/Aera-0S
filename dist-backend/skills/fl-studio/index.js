"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlStudioModule = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class FlStudioModule {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    isInitialized = false;
    initialize() {
        this.isInitialized = true;
        console.log('[AERA] Initialized FlStudio Module');
    }
}
exports.FlStudioModule = FlStudioModule;
