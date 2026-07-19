"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoshopSkill = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class PhotoshopSkill {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    static async executeCommand(command) { return true; }
}
exports.PhotoshopSkill = PhotoshopSkill;
