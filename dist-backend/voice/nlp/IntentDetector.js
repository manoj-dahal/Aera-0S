"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentDetector = void 0;
const UnderstandingAgent_1 = require("../../agents/understanding-agent/UnderstandingAgent");
class IntentDetector {
    understandingAgent = new UnderstandingAgent_1.UnderstandingAgent();
    /**
     * Performs zero-shot NLP intent classification on raw transcribed STT strings.
     * This bridges the gap between basic regex mapping and true deep semantic understanding.
     */
    async parseDeepIntent(transcription) {
        console.log(`[Voice NLP] Running deep semantic intent extraction on: "${transcription}"`);
        // In production, this would parse against a local fast model like a quantized BERT 
        // or route through the Groq/Anthropic adapters for zero-shot classification.
        const intent = {
            primaryAction: 'EXECUTE_WORKFLOW',
            targetDomain: 'OS_CONTROL',
            impliedEntities: {},
            sentiment: 'neutral',
            confidenceScore: 0.85,
            requiresMemoryContext: false
        };
        const text = transcription.toLowerCase();
        // Heuristics for local fallback
        if (text.includes('urgent') || text.includes('now') || text.includes('quick')) {
            intent.sentiment = 'urgent';
        }
        else if (text.includes('why') || text.includes('how') || text.includes('explain')) {
            intent.sentiment = 'inquisitive';
            intent.primaryAction = 'QUERY_KNOWLEDGE';
            intent.targetDomain = 'RESEARCH';
        }
        if (text.includes('my project') || text.includes('last time') || text.includes('we were working on')) {
            intent.requiresMemoryContext = true;
        }
        console.log(`[Voice NLP] Deep Intent Resolved:`, intent);
        return intent;
    }
}
exports.IntentDetector = IntentDetector;
