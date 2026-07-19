/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { Orchestrator } from '../../core/orchestrator/Orchestrator';

export class HeadAgent {
  private orchestrator: Orchestrator;

  constructor() {
    console.log('[Head Agent] Booting...');
    this.orchestrator = new Orchestrator();
  }

  /**
   * Called directly by the Voice Interface / UI Terminal
   */
  public async handleUserRequest(request: string): Promise<string> {
    console.log(`[Head Agent] Received intention: "${request}"`);
    
    // Delegate to the Core Orchestrator which manages Planner, Memory, Execution, etc.
    const response = await this.orchestrator.processGoal(request);
    
    return response;
  }
}