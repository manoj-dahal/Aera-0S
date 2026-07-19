/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

export class PowerModule {
  protected understandingAgent = new UnderstandingAgent();

  public isInitialized = false;

  public initialize() {
    this.isInitialized = true;
    console.log('[AERA] Initialized Power Module');
  }
}
