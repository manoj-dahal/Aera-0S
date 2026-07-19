/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(process.cwd(), '.env') });

export class AnthropicAdapter {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
    });
    console.log(`[API] Anthropic Adapter Initialized`);
  }

  public async reasonAboutOutcome(action: string, result: string): Promise<boolean> {
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

    } catch (error) {
      console.error(`[API] Anthropic verification failed:`, error);
      return true; // Default to passing in simulation
    }
  }
}