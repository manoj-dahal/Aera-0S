/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

export class DockerContainerSkill {
  protected understandingAgent = new UnderstandingAgent();

  public async startContainer(image: string): Promise<boolean> { return true; }
}