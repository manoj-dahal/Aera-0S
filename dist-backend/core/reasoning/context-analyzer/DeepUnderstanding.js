"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepUnderstandingEngine = void 0;
const MemoryAgent_1 = require("../../../agents/memory-agent/MemoryAgent");
class DeepUnderstandingEngine {
    memory;
    constructor() {
        this.memory = new MemoryAgent_1.MemoryAgent();
    }
    /**
     * If an intent is highly complex or relies on implied historical context,
     * this engine resolves the ambiguities BEFORE passing it to the Planner.
     */
    async resolveAmbiguity(intent, rawQuery) {
        console.log(`[Reasoning/Deep Understanding] Evaluating context requirements for query...`);
        if (intent.requiresMemoryContext) {
            console.log(`[Reasoning/Deep Understanding] Implicit reference detected. Querying long-term memory...`);
            const memoryContext = await this.memory.retrieveContext(rawQuery);
            // Inject the retrieved memories directly into the abstracted string payload so the Planner
            // has total clarity on what the user means by "that thing we were working on".
            const augmentedQuery = `User's Request: "${rawQuery}"\nContext to resolve ambiguity: "${memoryContext}"`;
            console.log(`[Reasoning/Deep Understanding] Ambiguity resolved. Generating Augmented Intent.`);
            return augmentedQuery;
        }
        // If it's a straightforward execution, return the raw query.
        return rawQuery;
    }
}
exports.DeepUnderstandingEngine = DeepUnderstandingEngine;
