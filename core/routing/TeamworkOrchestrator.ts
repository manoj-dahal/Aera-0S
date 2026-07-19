/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { EventBus } from '../event-bus/EventBus';
import { NeuralDB } from '../../database/neural/NeuralDB';

export interface SharedMemoryPayload {
  key: string;
  data: any;
  sourceAgent: string;
  targetAgents?: string[];
  timestamp: number;
}

export class TeamworkOrchestrator {
  private eventBus: EventBus;
  private sharedContextPool: Map<string, SharedMemoryPayload>;
  private neuralGraph: NeuralDB;

  constructor() {
    this.eventBus = EventBus.getInstance();
    this.sharedContextPool = new Map();
    this.neuralGraph = NeuralDB.getInstance();
    console.log('[Teamwork Orchestrator] Swarm Intelligence collaboration layer initialized.');
    
    // Global listener for cross-agent memory sharing
    this.eventBus.subscribe('agent:share_memory', (payload: SharedMemoryPayload) => {
      this.handleMemoryShare(payload);
    });
  }

  /**
   * Broadcasts a discovery or thought process from one agent to the rest of the active swarm.
   */
  public broadcastMemory(sourceAgent: string, key: string, data: any, targets?: string[]) {
    const payload: SharedMemoryPayload = {
      key,
      data,
      sourceAgent,
      targetAgents: targets,
      timestamp: Date.now()
    };
    
    // Publish via the event bus to decouple agent architectures
    this.eventBus.publish('agent:share_memory', payload);
  }

  /**
   * Handles incoming shared memory payloads and routes them to the correct agents
   * or stores them in the global pool for asynchronous retrieval.
   */
  private handleMemoryShare(payload: SharedMemoryPayload) {
    this.sharedContextPool.set(payload.key, payload);
    
    // Inject the shared memory directly into the global Neural Graph!
    // We link the node to the agent that generated it so AERA remembers WHO said WHAT.
    this.neuralGraph.encodeMemory(payload.key, payload.data, [payload.sourceAgent]);

    const targetLog = payload.targetAgents ? `[${payload.targetAgents.join(', ')}]` : '[Global Swarm]';
    console.log(`[Teamwork] ${payload.sourceAgent} shared context "${payload.key}" with ${targetLog}`);
  }

  /**
   * Allows an agent to asynchronously retrieve context shared by another agent.
   */
  public retrieveSharedContext(key: string): any | null {
    const memory = this.sharedContextPool.get(key);
    if (memory) {
      console.log(`[Teamwork] Context "${key}" retrieved (originally shared by ${memory.sourceAgent}).`);
      return memory.data;
    }
    return null;
  }
}
