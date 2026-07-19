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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqAdapter = void 0;
var groq_sdk_1 = __importDefault(require("groq-sdk"));
var dotenv_1 = require("dotenv");
var path = __importStar(require("path"));
// Load environment variables manually in Electron backend
(0, dotenv_1.config)({ path: path.resolve(process.cwd(), '.env') });
var GroqAdapter = /** @class */ (function () {
    function GroqAdapter() {
        this.client = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY || 'mock-key',
        });
        console.log("[API] Groq Adapter Initialized");
    }
    GroqAdapter.prototype.generatePlanCompletion = function (goal) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        console.log("[API] Requesting LPU acceleration from Groq for goal: ".concat(goal));
                        // If we don't have a real key in the environment, fallback to structured simulation
                        if (process.env.GROQ_API_KEY === 'mock-key' || !process.env.GROQ_API_KEY) {
                            return [2 /*return*/, this.mockLlamaResponse(goal)];
                        }
                        return [4 /*yield*/, this.client.chat.completions.create({
                                messages: [
                                    { role: 'system', content: "You are the AERA OS Planner Agent. Break down the user's intent into an array of modular steps. Return ONLY valid JSON format: [{\"id\": \"1\", \"action\": \"Launch App\", \"agent\": \"DesktopAgent\", \"dependencies\": []}]" },
                                    { role: 'user', content: goal }
                                ],
                                model: 'llama3-70b-8192',
                                temperature: 0.1, // Strict logic parsing
                                response_format: { type: "json_object" }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "[]"];
                    case 2:
                        error_1 = _c.sent();
                        console.error("[API] Groq inference failed:", error_1);
                        return [2 /*return*/, this.mockLlamaResponse(goal)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroqAdapter.prototype.mockLlamaResponse = function (goal) {
        // Fallback parser if API keys aren't provided
        console.log("[API] Fallback to Mock Llama-3 parsing...");
        if (goal.toLowerCase().includes('open') || goal.toLowerCase().includes('launch')) {
            return JSON.stringify([
                { id: "1", action: goal, agent: "DesktopAgent", dependencies: [] }
            ]);
        }
        return JSON.stringify([
            { id: "1", action: "Analyze intent", agent: "HeadAgent", dependencies: [] },
            { id: "2", action: "Search global knowledge graph", agent: "MemoryAgent", dependencies: ["1"] }
        ]);
    };
    return GroqAdapter;
}());
exports.GroqAdapter = GroqAdapter;
