/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export class SynapticMemory {
  private synapses: Map<string, { data: any, weight: number, lastAccessed: number }> = new Map();

  /**
   * Stores information like a human brain. The more it's retrieved, 
   * the stronger the neural weight (Long-Term Potentiation).
   */
  public encode(key: string, data: any) {
    console.log(`[Neural Memory] Encoding new synaptic pathway for: ${key}`);
    this.synapses.set(key, { data, weight: 1.0, lastAccessed: Date.now() });
  }

  /**
   * Retrieves data and reinforces the neural pathway.
   */
  public recall(key: string): any | null {
    const memory = this.synapses.get(key);
    if (!memory) return null;

    // Reinforce the memory weight
    memory.weight += 0.5;
    memory.lastAccessed = Date.now();
    console.log(`[Neural Memory] Pathway reinforced for: ${key}. Synaptic weight: ${memory.weight}`);
    
    return memory.data;
  }

  /**
   * Simulates neural decay (forgetting) for unaccessed memories.
   */
  public pruneDecayedPathways() {
    const now = Date.now();
    for (const [key, memory] of this.synapses.entries()) {
      const daysSinceAccess = (now - memory.lastAccessed) / (1000 * 60 * 60 * 24);
      memory.weight -= (daysSinceAccess * 0.1);
      
      if (memory.weight <= 0) {
        console.log(`[Neural Memory] Pruning decayed pathway: ${key}`);
        this.synapses.delete(key);
      }
    }
  }
}
