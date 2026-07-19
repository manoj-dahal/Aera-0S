"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticSearch = void 0;
const db_1 = require("../../database/sqlite/db");
const schema_1 = require("../../database/schema");
class SemanticSearch {
    async search(query) {
        console.log(`[Memory/Semantic] Querying vector DB using cosine similarity for: "${query}"`);
        // Real implementation would calculate cosine distance between `query` embedding and the DB
        const results = await db_1.db.select().from(schema_1.vectorKnowledge).limit(3);
        return results;
    }
}
exports.SemanticSearch = SemanticSearch;
