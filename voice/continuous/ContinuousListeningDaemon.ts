/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { EventBus } from '../../core/event-bus/EventBus';
import { StreamingPipeline } from '../pipeline/StreamingPipeline';
import { WakeWordEngine } from '../wakeword';

export class ContinuousListeningDaemon {
  private eventBus: EventBus;
  private streamingPipeline: StreamingPipeline;
  private wakeWordEngine: WakeWordEngine;
  
  public isDaemonActive = false;

  constructor() {
    this.eventBus = EventBus.getInstance();
    this.streamingPipeline = new StreamingPipeline();
    this.wakeWordEngine = new WakeWordEngine();
  }

  /**
   * Initializes the infinite 24/7 background audio listener.
   * This ignores all desktop sounds until the Wake Word is strictly verified.
   */
  public startBackgroundDaemon() {
    console.log(`[Continuous Listen] Daemon activated. Passive background audio monitoring engaged.`);
    this.isDaemonActive = true;
    this.runInfiniteLoop();
  }

  public stopBackgroundDaemon() {
    console.log(`[Continuous Listen] Daemon halted. Audio buffers closed.`);
    this.isDaemonActive = false;
  }

  private async runInfiniteLoop() {
    while (this.isDaemonActive) {
      // 1. Wait quietly for Wake Word (e.g. "Hey AERA", "AERA OS")
      const wakeDetected = await this.wakeWordEngine.listenForWakeWord(null);
      
      if (wakeDetected) {
        console.log(`[Continuous Listen] 🔔 WAKE WORD DETECTED! Awakening Core Orchestrator.`);
        
        // 2. Change UI State visually instantly
        this.eventBus.publish('system:state_changed', 'listening');
        
        // 3. Hand off control to the active streaming pipeline to grab the user's intent
        this.streamingPipeline.startContinuousListening();

        // Pause the daemon loop while the active session handles the request
        await this.waitForSessionCompletion();
      }
      
      // Prevent CPU thrashing on the infinite while loop
      await new Promise(r => setTimeout(r, 50)); 
    }
  }

  private async waitForSessionCompletion() {
    // In production, this resolves when the StreamingPipeline emits a session_end hook
    return new Promise<void>(resolve => {
       setTimeout(() => resolve(), 5000); 
    });
  }
}
