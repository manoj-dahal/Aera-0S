"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
class StateMachine {
    currentState = 'BOOTING';
    getState() {
        return this.currentState;
    }
    transitionTo(newState, context) {
        if (this.currentState === newState)
            return;
        console.log(`[StateMachine] State change: ${this.currentState} -> ${newState}`);
        this.currentState = newState;
        // In a real system, you would emit this via the EventBus
        // eventBus.publish('system:state_changed', { state: newState, context });
    }
    reset() {
        this.transitionTo('IDLE');
    }
}
exports.StateMachine = StateMachine;
