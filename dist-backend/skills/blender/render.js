"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlenderRenderSkill = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class BlenderRenderSkill {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    async renderScene(scenePath) { return true; }
}
exports.BlenderRenderSkill = BlenderRenderSkill;
