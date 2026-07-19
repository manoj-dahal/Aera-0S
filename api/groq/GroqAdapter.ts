/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import Groq from 'groq-sdk';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables manually in Electron backend
config({ path: path.resolve(process.cwd(), '.env') });

export class GroqAdapter {
  private client: Groq;

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'mock-key',
    });
    console.log(`[API] Groq Adapter Initialized`);
  }

  public async generatePlanCompletion(goal: string): Promise<string> {
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

    } catch (error) {
      console.error(`[API] Groq inference failed:`, error);
      return this.mockLlamaResponse(goal);
    }
  }

  private mockLlamaResponse(goal: string): string {
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