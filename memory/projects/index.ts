/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { db } from '../../database/sqlite/db';
import { projectMemory } from '../../database/schema';

export class ProjectMemory {
  public async logProjectAccess(projectName: string, path: string): Promise<void> {
    console.log(`[Memory/Projects] Logging workspace active project: ${projectName}`);
    await db.insert(projectMemory).values({
       id: `proj_${Date.now()}`,
       projectName,
       path,
       createdAt: new Date(),
       lastAccessed: new Date(),
    });
  }
}