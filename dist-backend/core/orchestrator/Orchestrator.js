"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orchestrator = void 0;
const EventBus_1 = require("../event-bus/EventBus");
const StateMachine_1 = require("../state-machine/StateMachine");
const ContextManager_1 = require("../context/ContextManager");
const PlannerEngine_1 = require("../planner/PlannerEngine");
const ExecutionEngine_1 = require("../execution/ExecutionEngine");
const VerifierEngine_1 = require("../verifier/VerifierEngine");
const VoiceAgent_1 = require("../../agents/voice-agent/VoiceAgent");
const IntentDetector_1 = require("../../voice/nlp/IntentDetector");
const DeepUnderstanding_1 = require("../reasoning/context-analyzer/DeepUnderstanding");
class Orchestrator {
    eventBus;
    stateMachine;
    context;
    planner;
    executor;
    verifier;
    voiceAgent;
    // Advanced Reasoning Engines
    intentDetector;
    deepUnderstanding;
    constructor() {
        this.eventBus = EventBus_1.EventBus.getInstance();
        this.stateMachine = new StateMachine_1.StateMachine();
        this.context = new ContextManager_1.ContextManager();
        this.planner = new PlannerEngine_1.PlannerEngine();
        this.executor = new ExecutionEngine_1.ExecutionEngine();
        this.verifier = new VerifierEngine_1.VerifierEngine();
        this.voiceAgent = new VoiceAgent_1.VoiceAgent();
        this.intentDetector = new IntentDetector_1.IntentDetector();
        this.deepUnderstanding = new DeepUnderstanding_1.DeepUnderstandingEngine();
        console.log('[Orchestrator] Core Engine Initialized.');
    }
    /**
     * The primary entrypoint for handling a user's goal via the HeadAgent
     */
    async processGoal(goal) {
        this.stateMachine.transitionTo('THINKING');
        this.context.addRecentCommand(goal);
        this.eventBus.publish('orchestrator:goal_received', { goal });
        try {
            // 0. Deep Understanding & Intent Resolution
            const intent = await this.intentDetector.parseDeepIntent(goal);
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
        }
        catch (error) {
            console.error('[Orchestrator] Critical Failure:', error);
            this.stateMachine.transitionTo('ERROR');
            return `A critical system failure occurred processing your request.`;
        }
    }
}
exports.Orchestrator = Orchestrator;
