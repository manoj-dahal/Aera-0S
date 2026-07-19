/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../schema/index';

// Initialize LibSQL/SQLite database
const client = createClient({
  url: "file:./database/sqlite/aera-os.db",
});

// Initialize Drizzle ORM
export const db = drizzle(client, { schema });

console.log(`[Database] Local SQLite/LibSQL Database initialized at ./database/sqlite/aera-os.db`);
