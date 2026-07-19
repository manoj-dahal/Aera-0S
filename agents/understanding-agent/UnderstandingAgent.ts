/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { IntentDetector, SemanticIntent } from '../../voice/nlp/IntentDetector';
import { DeepUnderstandingEngine } from '../../core/reasoning/context-analyzer/DeepUnderstanding';
import { MultilingualUnderstanding } from './MultilingualUnderstanding';

export class UnderstandingAgent {
  private intentDetector: IntentDetector;
  private deepUnderstanding: DeepUnderstandingEngine;
  private multilingual: MultilingualUnderstanding;

  constructor() {
    this.intentDetector = new IntentDetector();
    this.deepUnderstanding = new DeepUnderstandingEngine();
    this.multilingual = new MultilingualUnderstanding();
  }

  /**
   * Applies Deep Understanding to ANY skill execution payload.
   * Replaces rigid if/else string matching with dynamic AI comprehension.
   */
  public async comprehendSkillIntent(skillName: string, rawCommand: string): Promise<any> {
    console.log(`[Understanding Agent] Applying deep cognitive analysis to ${skillName} skill...`);
    
    try {
      // 1. Detect Code-Switching and normalize mixed languages (Nepali + English etc)
      const normalizedCommand = await this.multilingual.detectAndNormalizeMixedLanguage(rawCommand);

      // 2. Parse the pure semantic intent
      const intent = await this.intentDetector.parseDeepIntent(normalizedCommand);
      
      // 3. Resolve contextual ambiguities (e.g. "that project")
      const resolvedContext = await this.deepUnderstanding.resolveAmbiguity(intent, normalizedCommand);

      console.log(`[Understanding Agent] Skill intent resolved: Action mapped accurately for ${skillName}.`);
      
      return {
        skill: skillName,
        originalCommand: rawCommand,
        normalizedCommand,
        resolvedIntent: intent,
        context: resolvedContext,
        extractedEntities: await this.extractEntities(normalizedCommand),
        urgencyLevel: this.detectUrgency(intent)
      };
    } catch (err) {
      console.error(`[Understanding Agent] Failed to parse intent for ${skillName}:`, err);
      return {
        skill: skillName,
        originalCommand: rawCommand,
        normalizedCommand: rawCommand,
        resolvedIntent: { primaryAction: 'UNKNOWN' },
        context: rawCommand
      };
    }
  }

  /**
   * UNDERSTANDING SKILL: Entity Extraction
   * Extracts actionable nouns, software names, and file paths from the command.
   */
  public async extractEntities(command: string): Promise<Record<string, string>> {
    console.log(`[Understanding Agent] Extracting entities from command...`);
    // Simulated entity extraction (in production, passed to local LLM or NLP library)
    const entities: Record<string, string> = {};
    const normalized = command.toLowerCase();
    
    if (normalized.includes('photoshop')) entities['application'] = 'Adobe Photoshop';
    if (normalized.includes('vscode') || normalized.includes('code')) entities['application'] = 'VS Code';
    if (normalized.includes('.ts') || normalized.includes('.js')) entities['fileType'] = 'Source Code';
    
    return entities;
  }

  /**
   * UNDERSTANDING SKILL: Context Summarization
   * Shrinks massive text blocks down to core concepts to save LLM context window tokens.
   */
  public async summarizeContext(rawContext: string): Promise<string> {
    console.log(`[Understanding Agent] Summarizing large context block to save memory tokens...`);
    if (rawContext.length < 100) return rawContext;
    return `[Summarized] ${rawContext.substring(0, 100)}...`;
  }

  /**
   * UNDERSTANDING SKILL: Complexity Assessment
   * Determines if a task requires synchronous simple execution or a background asynchronous worker.
   */
  public assessComplexity(command: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    const length = command.split(' ').length;
    if (length > 20 || command.includes('and') || command.includes('then')) return 'HIGH';
    if (length > 8) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * UNDERSTANDING SKILL: Urgency Detection
   * Evaluates the sentiment of the intent to prioritize execution queue speed.
   */
  public detectUrgency(intent: SemanticIntent): 'CRITICAL' | 'NORMAL' | 'LOW' {
    if (intent.sentiment === 'urgent' || intent.sentiment === 'frustrated') return 'CRITICAL';
    if (intent.sentiment === 'inquisitive') return 'LOW';
    return 'NORMAL';
  }
}
