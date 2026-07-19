/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export interface AIModel {
  id: string;
  name: string;
  provider: 'groq' | 'anthropic' | 'gemini' | 'nvidia' | 'local';
  status: 'stable' | 'new' | 'upcoming' | 'deprecated';
  contextWindow: number;
  description: string;
}

export class ModelManagerModule {
  public isInitialized = false;
  private activeModels: Map<string, string> = new Map();

  // Simulated live database of AGI models
  private availableModels: AIModel[] = [
    { id: 'llama3-70b-8192', name: 'Llama 3 (70B)', provider: 'groq', status: 'stable', contextWindow: 8192, description: 'High-speed reasoning' },
    { id: 'llama3.1-405b-reasoning', name: 'Llama 3.1 (405B)', provider: 'groq', status: 'new', contextWindow: 128000, description: 'Frontier open-source reasoning' },
    { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', provider: 'anthropic', status: 'stable', contextWindow: 200000, description: 'Perfect for code & verification' },
    { id: 'claude-3-5-opus-upcoming', name: 'Claude 3.5 Opus', provider: 'anthropic', status: 'upcoming', contextWindow: 200000, description: 'Next-gen heavy reasoning' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'gemini', status: 'stable', contextWindow: 2000000, description: 'Massive context window' },
    { id: 'meta/llama3-70b-instruct', name: 'Llama 3 (70B) Instruct', provider: 'nvidia', status: 'stable', contextWindow: 8192, description: 'NVIDIA NIM Accelerated' },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'local', status: 'new', contextWindow: 128000, description: 'Custom proxy endpoint target' }
  ];

  public initialize() {
    this.isInitialized = true;
    
    // Set default routing mapping
    this.activeModels.set('planner', 'llama3.1-405b-reasoning');
    this.activeModels.set('verifier', 'claude-3-5-sonnet-20240620');
    this.activeModels.set('vision', 'gemini-1.5-pro');

    console.log('[AERA] Initialized Dynamic Model Manager Module');
  }

  public getActiveModel(role: 'planner' | 'verifier' | 'vision'): string {
    return this.activeModels.get(role) || 'default-model';
  }

  public setActiveModel(role: 'planner' | 'verifier' | 'vision', modelId: string) {
    this.activeModels.set(role, modelId);
    console.log(`[Model Manager] Re-routed ${role} engine to ${modelId}`);
  }

  public getRecommendations(): AIModel[] {
    // Auto-suggest new and upcoming models to the user
    return this.availableModels.filter(m => m.status === 'new' || m.status === 'upcoming');
  }
}
