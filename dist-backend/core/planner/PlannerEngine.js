"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerEngine = void 0;
class PlannerEngine {
    async decomposeGoal(goal, context) {
        console.log(`[Planner Engine] Decomposing complex goal: "${goal}"`);
        // In reality, this calls an LLM (e.g. Claude/GPT4) to break down the goal.
        // We mock the semantic output here.
        let steps = [];
        if (goal.toLowerCase().includes('react')) {
            steps = [
                { id: '1', action: 'Create project directory', agent: 'DesktopAgent', dependencies: [], status: 'PENDING' },
                { id: '2', action: 'Run npm create vite', agent: 'AutomationAgent', dependencies: ['1'], status: 'PENDING' },
                { id: '3', action: 'Install dependencies', agent: 'AutomationAgent', dependencies: ['2'], status: 'PENDING' },
            ];
        }
        else {
            steps = [
                { id: '1', action: 'Retrieve relevant semantic knowledge', agent: 'MemoryAgent', dependencies: [], status: 'PENDING' },
                { id: '2', action: 'Execute abstract query', agent: 'ResearchAgent', dependencies: ['1'], status: 'PENDING' }
            ];
        }
        return {
            planId: `plan_${Date.now()}`,
            originalGoal: goal,
            steps,
            confidence: 0.95
        };
    }
}
exports.PlannerEngine = PlannerEngine;
