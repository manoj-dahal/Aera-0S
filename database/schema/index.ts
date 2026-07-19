/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const identityMemory = sqliteTable('identity_memory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const projectMemory = sqliteTable('project_memory', {
  id: text('id').primaryKey(),
  projectName: text('project_name').notNull(),
  description: text('description'),
  path: text('path'),
  technologies: text('technologies', { mode: 'json' }), // stores array of strings
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  lastAccessed: integer('last_accessed', { mode: 'timestamp' }).notNull(),
});

export const vectorKnowledge = sqliteTable('vector_knowledge', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  embedding: blob('embedding', { mode: 'buffer' }), // stores binary vector
  source: text('source'),
  confidence: integer('confidence'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
