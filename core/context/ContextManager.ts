/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

export interface TaskContext {
  userId: string;
  projectId?: string;
  workspacePath?: string;
  recentCommands: string[];
  activeAgents: string[];
  preferences?: any;
  activeProject?: any;
  systemState?: any;
}

export class ContextManager {
  private currentContext: TaskContext;

  constructor() {
    this.currentContext = {
      userId: 'default_user',
      recentCommands: [],
      activeAgents: ['HeadAgent']
    };
  }

  public updateContext(partial: Partial<TaskContext>): void {
    this.currentContext = { ...this.currentContext, ...partial };
    console.log(`[Context] Context Updated.`, partial);
  }

  public getContext(): TaskContext {
    return this.currentContext;
  }

  public addRecentCommand(cmd: string): void {
    this.currentContext.recentCommands.push(cmd);
    if (this.currentContext.recentCommands.length > 10) {
      this.currentContext.recentCommands.shift(); // Keep only last 10
    }
  }
}