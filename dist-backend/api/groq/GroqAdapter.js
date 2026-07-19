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
exports.GroqAdapter = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
// Load environment variables manually in Electron backend
(0, dotenv_1.config)({ path: path.resolve(process.cwd(), '.env') });
class GroqAdapter {
    client;
    constructor() {
        this.client = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY || 'mock-key',
        });
        console.log(`[API] Groq Adapter Initialized`);
    }
    async generatePlanCompletion(goal) {
        try {
            console.log(`[API] Requesting LPU acceleration from Groq for goal: ${goal}`);
            // If we don't have a real key in the environment, fallback to structured simulation
            if (process.env.GROQ_API_KEY === 'mock-key' || !process.env.GROQ_API_KEY) {
                return this.mockLlamaResponse(goal);
            }
            const response = await this.client.chat.completions.create({
                messages: [
                    { role: 'system', content: `You are the AERA OS Planner Agent. Break down the user's intent into an array of modular steps. Return ONLY valid JSON format: [{"id": "1", "action": "Launch App", "agent": "DesktopAgent", "dependencies": []}]` },
                    { role: 'user', content: goal }
                ],
                model: 'llama3-70b-8192',
                temperature: 0.1, // Strict logic parsing
                response_format: { type: "json_object" }
            });
            return response.choices[0]?.message?.content || "[]";
        }
        catch (error) {
            console.error(`[API] Groq inference failed:`, error);
            return this.mockLlamaResponse(goal);
        }
    }
    mockLlamaResponse(goal) {
        // Fallback parser if API keys aren't provided
        console.log(`[API] Fallback to Mock Llama-3 parsing...`);
        if (goal.toLowerCase().includes('open') || goal.toLowerCase().includes('launch')) {
            return JSON.stringify([
                { id: "1", action: goal, agent: "DesktopAgent", dependencies: [] }
            ]);
        }
        return JSON.stringify([
            { id: "1", action: "Analyze intent", agent: "HeadAgent", dependencies: [] },
            { id: "2", action: "Search global knowledge graph", agent: "MemoryAgent", dependencies: ["1"] }
        ]);
    }
}
exports.GroqAdapter = GroqAdapter;
