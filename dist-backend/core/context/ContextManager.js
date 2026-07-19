"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextManager = void 0;
class ContextManager {
    currentContext;
    constructor() {
        this.currentContext = {
            userId: 'default_user',
            recentCommands: [],
            activeAgents: ['HeadAgent']
        };
    }
    updateContext(partial) {
        this.currentContext = { ...this.currentContext, ...partial };
        console.log(`[Context] Context Updated.`, partial);
    }
    getContext() {
        return this.currentContext;
    }
    addRecentCommand(cmd) {
        this.currentContext.recentCommands.push(cmd);
        if (this.currentContext.recentCommands.length > 10) {
            this.currentContext.recentCommands.shift(); // Keep only last 10
        }
    }
}
exports.ContextManager = ContextManager;
