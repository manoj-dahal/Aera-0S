/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiAdapter {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    console.log(`[API] Gemini Adapter Initialized`);
    // Grabs from the global environment variable
    const apiKey = process.env.GEMINI_API_KEY || "mock-key";
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  public async promptModel(prompt: string): Promise<string> {
    try {
      console.log(`[API] Requesting Google Gemini generative parsing...`);
      
      // Sandbox failsafe for isolated environments
      if (process.env.GEMINI_API_KEY === 'mock-key' || !process.env.GEMINI_API_KEY) {
        return "Gemini Response Mock";
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
      
    } catch (err) {
      console.error(`[API] Gemini inference failed. Returning mocked payload.`);
      return "Gemini Response Mock";
    }
  }
}
