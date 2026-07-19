"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadAgent = void 0;
const Orchestrator_1 = require("../../core/orchestrator/Orchestrator");
class HeadAgent {
    orchestrator;
    constructor() {
        console.log('[Head Agent] Booting...');
        this.orchestrator = new Orchestrator_1.Orchestrator();
    }
    /**
     * Called directly by the Voice Interface / UI Terminal
     */
    async handleUserRequest(request) {
        console.log(`[Head Agent] Received intention: "${request}"`);
        // Delegate to the Core Orchestrator which manages Planner, Memory, Execution, etc.
        const response = await this.orchestrator.processGoal(request);
        return response;
    }
}
exports.HeadAgent = HeadAgent;
