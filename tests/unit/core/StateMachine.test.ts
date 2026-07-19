/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { StateMachine } from '../../../core/state-machine/StateMachine';
describe('StateMachine', () => {
  it('should transition states correctly', () => {
    const sm = new StateMachine();
    sm.transitionTo('THINKING');
    expect(sm.getState()).toBe('THINKING');
  });
});