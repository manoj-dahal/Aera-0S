/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

export class VSCodeSkill {
  protected understandingAgent = new UnderstandingAgent();

  public static async executeCommand(command: string): Promise<boolean> { return true; }
}