/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { db } from '../../database/sqlite/db';
import { identityMemory } from '../../database/schema';
import { eq } from 'drizzle-orm';

export class IdentityManager {
  public async setIdentity(key: string, value: string): Promise<void> {
    console.log(`[Memory/Identity] Updating Identity: ${key} = ${value}`);
    await db.insert(identityMemory).values({ key, value }).onConflictDoUpdate({ target: identityMemory.key, set: { value } });
  }

  public async getIdentity(key: string): Promise<string | null> {
    const res = await db.select().from(identityMemory).where(eq(identityMemory.key, key));
    return res[0]?.value || null;
  }
}