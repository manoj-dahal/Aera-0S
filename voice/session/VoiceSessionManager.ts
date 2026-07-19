/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { ContextManager } from '../../core/context/ContextManager';
import { MemoryAgent } from '../../agents/memory-agent/MemoryAgent';
import { HealthAgent } from '../../agents/health-agent/HealthAgent';
import { EventBus } from '../../core/event-bus/EventBus';
import { StreamingPipeline } from '../pipeline/StreamingPipeline';

export class VoiceSessionManager {
  private contextManager: ContextManager;
  private memoryAgent: MemoryAgent;
  private healthAgent: HealthAgent;
  private eventBus: EventBus;
  private streamingPipeline: StreamingPipeline;
  
  public isActive = false;

  constructor() {
    this.contextManager = new ContextManager();
    this.memoryAgent = new MemoryAgent();
    this.healthAgent = new HealthAgent();
    this.eventBus = EventBus.getInstance();
    this.streamingPipeline = new StreamingPipeline();
  }

  /**
   * The "Tap to Start" initialization trigger.
   * Executes instantly to prepare the entire neural memory landscape before the user speaks.
   */
  public async initializeSession(): Promise<void> {
    console.log(`\n==============================================`);
    console.log(`[Voice Session] TAP TO START detected.`);
    console.log(`[Voice Session] Initializing Continuous Understanding...`);
    
    this.isActive = true;
    const startTime = performance.now();

    // 1. Wake Voice & AI Runtimes
    this.eventBus.publish('system:state_changed', 'connecting');
    console.log(`[Voice Session] Waking STT, TTS, and LLM Engines...`);

    // 2. Parallel Memory & Hardware Retrieval
    // Rank memories: Priority 1 (Current), Priority 2 (Preferences)
    console.log(`[Voice Session] Resolving Prioritized Neural Weights...`);
    const [preferences, activeProject, hardwareStatus] = await Promise.all([
       this.memoryAgent.retrieveContext('user_preferences'),
       this.memoryAgent.retrieveContext('active_workspace'),
       this.healthAgent.runDiagnostics()
    ]);

    // 3. Build Runtime Context
    this.contextManager.updateContext({
      userId: 'primary_user',
      preferences,
      activeProject,
      systemState: hardwareStatus
    });

    const bootTime = performance.now() - startTime;
    console.log(`[Voice Session] Runtime Context synchronized in ${bootTime.toFixed(2)}ms.`);
    console.log(`==============================================\n`);

    // 4. Start Continuous Streaming Pipeline
    this.eventBus.publish('system:state_changed', 'listening');
    this.streamingPipeline.startContinuousListening();
  }

  public endSession(): void {
    console.log(`[Voice Session] Ending continuous session. Persisting state...`);
    this.isActive = false;
    this.streamingPipeline.stop();
    this.eventBus.publish('system:state_changed', 'idle');
  }
}
