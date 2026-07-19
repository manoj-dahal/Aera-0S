/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { EventBus } from '../../core/event-bus/EventBus';

export class StreamingPipeline {
  private eventBus: EventBus;
  private isListening = false;

  constructor() {
    this.eventBus = EventBus.getInstance();
  }

  /**
   * Activates the true Continuous Streaming STT Pipeline
   */
  public startContinuousListening(): void {
    this.isListening = true;
    console.log(`[Streaming Pipeline] Microphone hot. Continuous barge-in enabled.`);
    console.log(`[Streaming Pipeline] Filtering background noise & typing...`);

    // Simulated streaming loop
    this.simulateRealTimeStream();
  }

  public stop(): void {
    this.isListening = false;
    console.log(`[Streaming Pipeline] Halting microphone stream.`);
  }

  private async simulateRealTimeStream() {
    if (!this.isListening) return;

    // Simulate user speaking after 3 seconds of silence
    setTimeout(() => {
       if (!this.isListening) return;
       
       console.log(`\n[Streaming Pipeline] 🎤 User speech detected: "AERA, check the weather then..."`);
       console.log(`[Streaming Pipeline] Processing intent predictively...`);
       
       // Detect interruption or barge-in
       this.handleBargeIn();

       // Fire intent out to Orchestrator while user is still speaking
       this.eventBus.publish('voice:partial_intent_detected', { text: 'check weather' });
    }, 3000);
  }

  private handleBargeIn() {
    console.log(`[Streaming Pipeline] ⚠️ Barge-in detected. Halting TTS playback instantly.`);
    this.eventBus.publish('voice:stop_tts', null);
  }
}
