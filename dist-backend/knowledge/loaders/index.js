"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLoader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class DocumentLoader {
    async loadFile(filePath) {
        console.log(`[Knowledge/Loaders] Attempting to load document at: ${filePath}`);
        const ext = path.extname(filePath).toLowerCase();
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // In a production environment, this would switch between pdf-parse, mammoth (docx), etc.
        switch (ext) {
            case '.txt':
            case '.md':
            case '.json':
            case '.csv':
                return fs.readFileSync(filePath, 'utf-8');
            case '.pdf':
                console.log(`[Knowledge/Loaders] Triggering PDF extraction pipeline...`);
                return "Mock extracted PDF text.";
            default:
                console.warn(`[Knowledge/Loaders] Unsupported file type: ${ext}. Attempting raw text read.`);
                return fs.readFileSync(filePath, 'utf-8');
        }
    }
}
exports.DocumentLoader = DocumentLoader;
