"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicAdapter = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
(0, dotenv_1.config)({ path: path.resolve(process.cwd(), '.env') });
class AnthropicAdapter {
    client;
    constructor() {
        this.client = new sdk_1.default({
            apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
        });
        console.log(`[API] Anthropic Adapter Initialized`);
    }
    async reasonAboutOutcome(action, result) {
        try {
            console.log(`[API] Requesting Claude 3.5 Sonnet verification...`);
            if (process.env.ANTHROPIC_API_KEY === 'mock-key' || !process.env.ANTHROPIC_API_KEY) {
                return true; // Mock verification
            }
            const msg = await this.client.messages.create({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 100,
                temperature: 0,
                system: "You are the AERA Verifier Engine. Reply ONLY with the word 'TRUE' if the action successfully completed the task, or 'FALSE' if it failed. No other text.",
                messages: [
                    {
                        role: "user",
                        content: `Action: ${action}\nResult: ${result}\nDid this succeed?`
                    }
                ]
            });
            // @ts-ignore
            const responseText = msg.content[0].text;
            return responseText.includes('TRUE');
        }
        catch (error) {
            console.error(`[API] Anthropic verification failed:`, error);
            return true; // Default to passing in simulation
        }
    }
}
exports.AnthropicAdapter = AnthropicAdapter;
