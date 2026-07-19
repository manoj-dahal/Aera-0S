/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { GroqAdapter } from '../../api/groq/GroqAdapter';

export class MultilingualUnderstanding {
  private llmAdapter: GroqAdapter;

  constructor() {
    this.llmAdapter = new GroqAdapter();
  }

  /**
   * Specifically built to detect and handle "Code-Switching" (e.g. Nepali + English).
   * It translates the mixed string into a uniform execution intent, while explicitly
   * preserving technical jargon like 'Docker', 'React', or 'Photoshop'.
   */
  public async detectAndNormalizeMixedLanguage(rawInput: string): Promise<string> {
    console.log(`[Multilingual Understanding] Parsing code-switching heuristics for: "${rawInput}"`);
    
    // Quick regex to determine if we even need to trigger the LLM API for translation
    const hasNonEnglish = /[^\x00-\x7F]+/.test(rawInput);
    
    if (!hasNonEnglish) {
      return rawInput;
    }

    console.log(`[Multilingual Understanding] Mixed-language detected (e.g. Nepali script). Triggering LLM translation pipeline...`);
    
    const prompt = `You are a strict technical translator for AERA OS. 
    The user is code-switching between languages (like Nepali and English). 
    Translate the intent completely into English. 
    CRITICAL RULE: DO NOT translate technical software names like 'VS Code', 'GitHub', 'Photoshop', 'Chrome', or 'React'.
    Input: "${rawInput}"`;

    try {
      // Re-use the existing high-speed Groq/Llama3 connection
      const translatedJSON = await this.llmAdapter.generatePlanCompletion(prompt);
      
      // Because our GroqAdapter is forced to output JSON, we'll extract the intent
      // In production, this would use a dedicated chat endpoint without the JSON enforcement
      const parsed = JSON.parse(translatedJSON);
      return parsed[0]?.action || rawInput;
      
    } catch (err) {
      console.error(`[Multilingual Understanding] LLM translation failed, falling back to raw execution...`);
      return rawInput;
    }
  }
}

