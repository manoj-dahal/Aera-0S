"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnderstandingAgent = void 0;
const IntentDetector_1 = require("../../voice/nlp/IntentDetector");
const DeepUnderstanding_1 = require("../../core/reasoning/context-analyzer/DeepUnderstanding");
const MultilingualUnderstanding_1 = require("./MultilingualUnderstanding");
class UnderstandingAgent {
    intentDetector;
    deepUnderstanding;
    multilingual;
    constructor() {
        this.intentDetector = new IntentDetector_1.IntentDetector();
        this.deepUnderstanding = new DeepUnderstanding_1.DeepUnderstandingEngine();
        this.multilingual = new MultilingualUnderstanding_1.MultilingualUnderstanding();
    }
    /**
     * Applies Deep Understanding to ANY skill execution payload.
     * Replaces rigid if/else string matching with dynamic AI comprehension.
     */
    async comprehendSkillIntent(skillName, rawCommand) {
        console.log(`[Understanding Agent] Applying deep cognitive analysis to ${skillName} skill...`);
        try {
            // 1. Detect Code-Switching and normalize mixed languages (Nepali + English etc)
            const normalizedCommand = await this.multilingual.detectAndNormalizeMixedLanguage(rawCommand);
            // 2. Parse the pure semantic intent
            const intent = await this.intentDetector.parseDeepIntent(normalizedCommand);
            // 3. Resolve contextual ambiguities (e.g. "that project")
            const resolvedContext = await this.deepUnderstanding.resolveAmbiguity(intent, normalizedCommand);
            console.log(`[Understanding Agent] Skill intent resolved: Action mapped accurately for ${skillName}.`);
            return {
                skill: skillName,
                originalCommand: rawCommand,
                normalizedCommand,
                resolvedIntent: intent,
                context: resolvedContext
            };
        }
        catch (err) {
            console.error(`[Understanding Agent] Failed to parse intent for ${skillName}:`, err);
            return {
                skill: skillName,
                originalCommand: rawCommand,
                normalizedCommand: rawCommand,
                resolvedIntent: { primaryAction: 'UNKNOWN' },
                context: rawCommand
            };
        }
    }
}
exports.UnderstandingAgent = UnderstandingAgent;
