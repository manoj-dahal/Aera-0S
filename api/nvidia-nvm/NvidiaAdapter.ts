/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import * as https from 'https';

export class NvidiaNVMAdapter {
  private apiKey: string;
  private endpoint = 'integrate.api.nvidia.com';

  constructor() {
    console.log(`[API] NVIDIA NVM (Nim) Adapter Initialized`);
    this.apiKey = process.env.NVIDIA_API_KEY || "mock-key";
  }

  public async generatePlanCompletion(goal: string): Promise<string> {
    try {
      console.log(`[API] Requesting Cloud acceleration from NVIDIA Nim for goal: ${goal}`);
      
      if (this.apiKey === 'mock-key') {
        return this.mockNvidiaResponse(goal);
      }

      const payload = JSON.stringify({
        model: "meta/llama3-70b-instruct",
        messages: [
          { role: 'system', content: `You are the AERA OS Planner Agent. Break down the user's intent into an array of modular steps. Return ONLY valid JSON format: [{"id": "1", "action": "Launch App", "agent": "DesktopAgent", "dependencies": []}]` },
          { role: "user", content: goal }
        ],
        temperature: 0.1,
        max_tokens: 1024
      });

      const options = {
        hostname: this.endpoint,
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              const parsed = JSON.parse(data);
              resolve(parsed.choices[0]?.message?.content || "[]");
            } else {
              reject(new Error(`NVIDIA API Error: ${res.statusCode}`));
            }
          });
        });
        
        req.on('error', (e) => reject(e));
        req.write(payload);
        req.end();
      });

    } catch (error) {
      console.error(`[API] NVIDIA Nim inference failed:`, error);
      return this.mockNvidiaResponse(goal);
    }
  }

  private mockNvidiaResponse(goal: string): string {
    console.log(`[API] Fallback to Mock NVIDIA NIM parsing...`);
    return JSON.stringify([
      { id: "1", action: goal, agent: "DesktopAgent", dependencies: [] }
    ]);
  }
}
