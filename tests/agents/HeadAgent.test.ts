/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { HeadAgent } from '../../agents/head-agent/HeadAgent';

describe('HeadAgent', () => {
  let headAgent: HeadAgent;

  beforeEach(() => {
    headAgent = new HeadAgent();
  });

  it('should process a user goal and route to orchestrator', async () => {
    // Suppress console logs during test output
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const response = await headAgent.handleUserRequest('Test Intent Workflow');
    
    expect(response).toContain('I have successfully completed');
  });
});