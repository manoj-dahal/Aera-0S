/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

export class STTEngine {
  protected understandingAgent = new UnderstandingAgent();

  public async streamToText(audioChunks: Buffer[]): Promise<string> {
    console.log(`[Voice/STT] Processing audio chunks via Deepgram/Whisper...`);
    return "User transcription mapped."; 
  }
}