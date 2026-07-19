/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

module.exports = {
  activate: async (context) => {
    console.log('[Upload Plugin] Active and listening for drop events.');
    
    // Abstracting a safe hook to ingest local data
    context.os.notify("AERA File Uploader initialized.");

    // Provide an external API to the UI so it can send buffer data down securely
    context.memory.write('active_upload_queue', []);
  },
  
  handleIncomingBuffer: async (context, filename, fileBuffer, fileType) => {
    context.os.notify(`Ingesting document: ${filename}`);

    // Offload the heavy chunking and processing to the Knowledge Agent natively
    await context.agents.request('KnowledgeAgent', {
       action: 'indexDocument',
       payload: {
          filename,
          buffer: fileBuffer,
          type: fileType
       }
    });

    return true;
  },

  deactivate: async () => {
    console.log('[Upload Plugin] Deactivating background listeners.');
  }
};
