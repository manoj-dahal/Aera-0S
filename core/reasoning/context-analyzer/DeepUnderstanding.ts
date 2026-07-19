/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { SemanticIntent } from '../../../voice/nlp/IntentDetector';
import { MemoryAgent } from '../../../agents/memory-agent/MemoryAgent';

export class DeepUnderstandingEngine {
  private memory: MemoryAgent;

  constructor() {
    this.memory = new MemoryAgent();
  }

  /**
   * If an intent is highly complex or relies on implied historical context,
   * this engine resolves the ambiguities BEFORE passing it to the Planner.
   */
  public async resolveAmbiguity(intent: SemanticIntent, rawQuery: string): Promise<string> {
    console.log(`[Reasoning/Deep Understanding] Evaluating context requirements for query...`);
    
    if (intent.requiresMemoryContext) {
      console.log(`[Reasoning/Deep Understanding] Implicit reference detected. Querying long-term memory...`);
      const memoryContext = await this.memory.retrieveContext(rawQuery);
      
      // Inject the retrieved memories directly into the abstracted string payload so the Planner
      // has total clarity on what the user means by "that thing we were working on".
      const augmentedQuery = `User's Request: "${rawQuery}"\nContext to resolve ambiguity: "${memoryContext}"`;
      console.log(`[Reasoning/Deep Understanding] Ambiguity resolved. Generating Augmented Intent.`);
      return augmentedQuery;
    }

    // If it's a straightforward execution, return the raw query.
    return rawQuery;
  }
}
