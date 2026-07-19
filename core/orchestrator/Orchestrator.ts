/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { EventBus } from '../event-bus/EventBus';
import { StateMachine } from '../state-machine/StateMachine';
import { ContextManager } from '../context/ContextManager';
import { PlannerEngine } from '../planner/PlannerEngine';
import { ExecutionEngine } from '../execution/ExecutionEngine';
import { VerifierEngine } from '../verifier/VerifierEngine';
import { VoiceAgent } from '../../agents/voice-agent/VoiceAgent';
import { IntentDetector } from '../../voice/nlp/IntentDetector';
import { DeepUnderstandingEngine } from '../reasoning/context-analyzer/DeepUnderstanding';
import { NeuralCore } from '../reasoning/brain/NeuralCore';
import { TeamworkOrchestrator } from '../routing/TeamworkOrchestrator';

export class Orchestrator {
  private eventBus: EventBus;
  private stateMachine: StateMachine;
  private context: ContextManager;
  private planner: PlannerEngine;
  private executor: ExecutionEngine;
  private verifier: VerifierEngine;
  private voiceAgent: VoiceAgent;
  
  // Advanced Reasoning Engines
  private intentDetector: IntentDetector;
  private deepUnderstanding: DeepUnderstandingEngine;
  private neuralCore: NeuralCore;
  private teamwork: TeamworkOrchestrator;

  constructor() {
    this.eventBus = EventBus.getInstance();
    this.stateMachine = new StateMachine();
    this.context = new ContextManager();
    this.planner = new PlannerEngine();
    this.executor = new ExecutionEngine();
    this.verifier = new VerifierEngine();
    this.voiceAgent = new VoiceAgent();
    
    this.intentDetector = new IntentDetector();
    this.deepUnderstanding = new DeepUnderstandingEngine();
    this.neuralCore = new NeuralCore();
    this.teamwork = new TeamworkOrchestrator();

    console.log('[Orchestrator] Core Engine Initialized.');
  }

  /**
   * The primary entrypoint for handling a user's goal via the HeadAgent
   */
  public async processGoal(goal: string): Promise<string> {
    this.stateMachine.transitionTo('THINKING');
    this.context.addRecentCommand(goal);
    
    this.eventBus.publish('orchestrator:goal_received', { goal });

    try {
      // -1. Neural Brain Evaluation (Highest order reasoning)
      const consciousDirective = await this.neuralCore.processConsciousness(goal);

      // 0. Deep Understanding & Intent Resolution
      const intent = await this.intentDetector.parseDeepIntent(consciousDirective);
      const contextualizedGoal = await this.deepUnderstanding.resolveAmbiguity(intent, goal);

      // 1. Planning Phase
      const plan = await this.planner.decomposeGoal(contextualizedGoal, this.context.getContext());
      this.eventBus.publish('orchestrator:plan_created', { plan });

      // 2. Execution Phase
      this.stateMachine.transitionTo('EXECUTING');
      const executionSuccess = await this.executor.executePlan(plan);

      // 3. Verification Phase
      if (executionSuccess) {
        const verified = await this.verifier.verifyResult(goal, "Task Finished", "OK");
        if (verified) {
           this.stateMachine.reset();
           return `I have successfully completed: ${goal}`;
        }
      }
      
      this.stateMachine.transitionTo('ERROR');
      return `I encountered an issue executing: ${goal}`;

    } catch (error) {
      console.error('[Orchestrator] Critical Failure:', error);
      this.stateMachine.transitionTo('ERROR');
      return `A critical system failure occurred processing your request.`;
    }
  }
}