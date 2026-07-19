"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMemory = void 0;
const db_1 = require("../../database/sqlite/db");
const schema_1 = require("../../database/schema");
class ProjectMemory {
    async logProjectAccess(projectName, path) {
        console.log(`[Memory/Projects] Logging workspace active project: ${projectName}`);
        await db_1.db.insert(schema_1.projectMemory).values({
            id: `proj_${Date.now()}`,
            projectName,
            path,
            createdAt: new Date(),
            lastAccessed: new Date(),
        });
    }
}
exports.ProjectMemory = ProjectMemory;
