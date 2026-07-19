/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export type CoreState = 'BOOTING' | 'IDLE' | 'LISTENING' | 'THINKING' | 'EXECUTING' | 'ERROR';

export class StateMachine {
  private currentState: CoreState = 'BOOTING';

  public getState(): CoreState {
    return this.currentState;
  }

  public transitionTo(newState: CoreState, context?: any): void {
    if (this.currentState === newState) return;
    
    console.log(`[StateMachine] State change: ${this.currentState} -> ${newState}`);
    this.currentState = newState;
    
    // In a real system, you would emit this via the EventBus
    // eventBus.publish('system:state_changed', { state: newState, context });
  }

  public reset(): void {
    this.transitionTo('IDLE');
  }
}