/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export class AgentsModule {
  public isInitialized = false;

  public initialize() {
    this.isInitialized = true;
    console.log('[AERA] Initialized Agents Module');
  }
}
