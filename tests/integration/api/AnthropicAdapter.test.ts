/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { AnthropicAdapter } from '../../../api/anthropic/AnthropicAdapter';

describe('AnthropicAdapter Integration', () => {
  let adapter: AnthropicAdapter;

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = 'mock-key';
    adapter = new AnthropicAdapter();
  });

  it('should verify logical success correctly and return a boolean', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // In mock-key mode, this will automatically resolve to true
    const result = await adapter.reasonAboutOutcome('Opened application Photoshop', 'Success');
    expect(typeof result).toBe('boolean');
    expect(result).toBe(true);
  });
});