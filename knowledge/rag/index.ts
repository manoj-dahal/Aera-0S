/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { SemanticSearch } from '../../memory/semantic';
import { EmbeddingsManager } from '../../memory/embeddings';

export class RAGEngine {
  private semanticSearch: SemanticSearch;
  private embeddingsManager: EmbeddingsManager;

  constructor() {
    this.semanticSearch = new SemanticSearch();
    this.embeddingsManager = new EmbeddingsManager();
  }

  /**
   * The core Retrieval-Augmented Generation pipeline.
   * 1. Takes a user query.
   * 2. Searches the Vector DB for semantically similar context.
   * 3. Augments the context to be passed to the LLM.
   */
  public async retrieveAndAugment(query: string): Promise<string> {
    console.log(`[Knowledge/RAG] Initiating RAG Pipeline for query: "${query}"`);
    
    // 1. Retrieve raw similar nodes from DB
    const contextNodes = await this.semanticSearch.search(query);
    
    if (contextNodes.length === 0) {
      console.log(`[Knowledge/RAG] No relevant context found in local knowledge graph.`);
      return "No additional context provided.";
    }

    // 2. Format context into an augmented prompt injection string
    const formattedContext = contextNodes.map((node, i) => `[Source ${i+1}]: ${node.content}`).join('\n\n');
    
    console.log(`[Knowledge/RAG] Augmented query with ${contextNodes.length} semantic vectors.`);
    
    return `Use the following retrieved context to answer the query:\n\n${formattedContext}`;
  }
}