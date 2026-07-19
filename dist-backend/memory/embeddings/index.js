"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingsManager = void 0;
const db_1 = require("../../database/sqlite/db");
const schema_1 = require("../../database/schema");
class EmbeddingsManager {
    async generateAndStore(text, source) {
        console.log(`[Memory/Embeddings] Chunking text and generating Vector embedding array...`);
        // Simulated embedding logic (e.g. OpenAI ada-002 or local ONNX model)
        const mockVector = Buffer.from(new Float32Array([0.1, -0.4, 0.8]).buffer);
        await db_1.db.insert(schema_1.vectorKnowledge).values({
            id: `vec_${Date.now()}`,
            content: text,
            embedding: mockVector,
            source,
            createdAt: new Date()
        });
    }
}
exports.EmbeddingsManager = EmbeddingsManager;
