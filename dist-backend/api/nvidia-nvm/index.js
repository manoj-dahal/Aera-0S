"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NvidiaNvmModule = void 0;
class NvidiaNvmModule {
    isInitialized = false;
    initialize() {
        this.isInitialized = true;
        console.log('[AERA] Initialized NvidiaNvm Module');
    }
}
exports.NvidiaNvmModule = NvidiaNvmModule;
