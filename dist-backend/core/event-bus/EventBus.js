"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventBus = void 0;
class EventBus {
    static instance;
    listeners;
    constructor() {
        this.listeners = new Map();
    }
    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    subscribe(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        console.log(`[EventBus] Subscribed to: ${event}`);
    }
    unsubscribe(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }
    publish(event, payload) {
        console.log(`[EventBus] Emitting event: ${event}`, payload || '');
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach((callback) => {
                try {
                    callback(payload);
                }
                catch (error) {
                    console.error(`[EventBus] Error in listener for ${event}:`, error);
                }
            });
        }
    }
}
exports.EventBus = EventBus;
exports.eventBus = EventBus.getInstance();
