"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentParser = void 0;
class DocumentParser {
    /**
     * Chunks a large string of text into smaller, overlapping segments suitable for Vector DB embeddings.
     */
    chunkText(text, chunkSize = 1000, overlap = 200) {
        console.log(`[Knowledge/Parsers] Chunking text (Size: ${chunkSize}, Overlap: ${overlap})`);
        const chunks = [];
        let i = 0;
        while (i < text.length) {
            chunks.push(text.slice(i, i + chunkSize));
            i += chunkSize - overlap;
        }
        console.log(`[Knowledge/Parsers] Generated ${chunks.length} chunks for embedding.`);
        return chunks;
    }
}
exports.DocumentParser = DocumentParser;
