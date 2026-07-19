/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export class DocumentParser {
  /**
   * Chunks a large string of text into smaller, overlapping segments suitable for Vector DB embeddings.
   */
  public chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
    console.log(`[Knowledge/Parsers] Chunking text (Size: ${chunkSize}, Overlap: ${overlap})`);
    
    const chunks: string[] = [];
    let i = 0;
    
    while (i < text.length) {
      chunks.push(text.slice(i, i + chunkSize));
      i += chunkSize - overlap;
    }
    
    console.log(`[Knowledge/Parsers] Generated ${chunks.length} chunks for embedding.`);
    return chunks;
  }
}