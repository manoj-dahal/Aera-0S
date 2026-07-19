/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { GroqAdapter } from '../../../api/groq/GroqAdapter';

describe('GroqAdapter Integration', () => {
  let adapter: GroqAdapter;

  beforeEach(() => {
    // Force the adapter into mock mode if API keys aren't physically present in the runner
    process.env.GROQ_API_KEY = 'mock-key';
    adapter = new GroqAdapter();
  });

  it('should successfully parse an intent and return a valid stringified JSON Graph Array', async () => {
    // Suppress internal adapter logs during test output
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const mockResponse = await adapter.generatePlanCompletion('open Chrome');
    const parsed = JSON.parse(mockResponse);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0]).toHaveProperty('id');
    expect(parsed[0]).toHaveProperty('action');
    expect(parsed[0]).toHaveProperty('agent');
    expect(parsed[0].agent).toBe('DesktopAgent');
  });
});