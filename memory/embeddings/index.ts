/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { db } from '../../database/sqlite/db';
import { vectorKnowledge } from '../../database/schema';

export class EmbeddingsManager {
  public async generateAndStore(text: string, source: string): Promise<void> {
    console.log(`[Memory/Embeddings] Chunking text and generating Vector embedding array...`);
    // Simulated embedding logic (e.g. OpenAI ada-002 or local ONNX model)
    const mockVector = Buffer.from(new Float32Array([0.1, -0.4, 0.8]).buffer);
    
    await db.insert(vectorKnowledge).values({
       id: `vec_${Date.now()}`,
       content: text,
       embedding: mockVector,
       source,
       createdAt: new Date()
    });
  }
}