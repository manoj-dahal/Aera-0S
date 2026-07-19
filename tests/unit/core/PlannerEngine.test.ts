/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { PlannerEngine } from '../../../core/planner/PlannerEngine';

describe('PlannerEngine', () => {
  let planner: PlannerEngine;

  beforeEach(() => {
    planner = new PlannerEngine();
  });

  it('should decompose a simple intent into an execution plan', async () => {
    const goal = 'Open VS Code';
    const plan = await planner.decomposeGoal(goal, {});

    expect(plan.planId).toBeDefined();
    expect(plan.originalGoal).toBe(goal);
    expect(plan.steps).toBeInstanceOf(Array);
    expect(plan.steps.length).toBeGreaterThan(0);
  });
});