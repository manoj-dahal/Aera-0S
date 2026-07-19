"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityManager = void 0;
const db_1 = require("../../database/sqlite/db");
const schema_1 = require("../../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
class IdentityManager {
    async setIdentity(key, value) {
        console.log(`[Memory/Identity] Updating Identity: ${key} = ${value}`);
        await db_1.db.insert(schema_1.identityMemory).values({ key, value }).onConflictDoUpdate({ target: schema_1.identityMemory.key, set: { value } });
    }
    async getIdentity(key) {
        const res = await db_1.db.select().from(schema_1.identityMemory).where((0, drizzle_orm_1.eq)(schema_1.identityMemory.key, key));
        return res[0]?.value || null;
    }
}
exports.IdentityManager = IdentityManager;
