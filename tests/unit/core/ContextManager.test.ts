/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { ContextManager } from '../../../core/context/ContextManager';
describe('ContextManager', () => {
  it('should store and update context', () => {
    const ctx = new ContextManager();
    ctx.updateContext({ userId: 'test_user' });
    expect(ctx.getContext().userId).toBe('test_user');
  });
});