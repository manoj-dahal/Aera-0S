"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Orchestrator_1 = require("../../core/orchestrator/Orchestrator");
const EventBus_1 = require("../../core/event-bus/EventBus");
async function runCLIWorkflow() {
    console.log("==================================================");
    console.log(" AERA OS - Command Line Workflow Execution Test");
    console.log("==================================================\n");
    const orchestrator = new Orchestrator_1.Orchestrator();
    const eventBus = EventBus_1.EventBus.getInstance();
    // Listen to workflow events to prove it's running
    eventBus.subscribe('orchestrator:plan_created', (data) => {
        console.log(`\n[Workflow Event] Plan Created with ${data.plan.steps.length} steps.`);
    });
    eventBus.subscribe('execution:step_started', (data) => {
        console.log(`[Workflow Event] Starting Step: [${data.step.agent}] -> ${data.step.action}`);
    });
    const testGoal = "Open VS Code and compile the typescript codebase.";
    console.log(`\n[User] Submitting Goal: "${testGoal}"\n`);
    // Run the full pipeline
    const result = await orchestrator.processGoal(testGoal);
    console.log(`\n==================================================`);
    console.log(`[AERA Response] ${result}`);
    console.log("==================================================");
}
runCLIWorkflow().catch(console.error);
