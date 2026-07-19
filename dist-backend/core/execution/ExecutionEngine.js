"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionEngine = void 0;
const EventBus_1 = require("../event-bus/EventBus");
const DesktopAgent_1 = require("../../agents/desktop-agent/DesktopAgent");
const PluginManagerAgent_1 = require("../../agents/plugin-agent/PluginManagerAgent");
const BrowserAgent_1 = require("../../agents/browser-agent/BrowserAgent");
const VisionAgent_1 = require("../../agents/vision-agent/VisionAgent");
const VoiceAgent_1 = require("../../agents/voice-agent/VoiceAgent");
const ApplicationAgent_1 = require("../../agents/application-agent/ApplicationAgent");
const CodingAgent_1 = require("../../agents/coding-agent/CodingAgent");
const ResearchAgent_1 = require("../../agents/research-agent/ResearchAgent");
const FileAgent_1 = require("../../agents/file-agent/FileAgent");
const HealthAgent_1 = require("../../agents/health-agent/HealthAgent");
const KnowledgeAgent_1 = require("../../agents/knowledge-agent/KnowledgeAgent");
const MemoryAgent_1 = require("../../agents/memory-agent/MemoryAgent");
// newly implemented
const CreativeAgent_1 = require("../../agents/creative-agent/CreativeAgent");
const AutomationAgent_1 = require("../../agents/automation-agent/AutomationAgent");
const SchedulingAgent_1 = require("../../agents/scheduling-agent/SchedulingAgent");
const CommunicationAgent_1 = require("../../agents/communication-agent/CommunicationAgent");
const AnalyticsAgent_1 = require("../../agents/analytics-agent/AnalyticsAgent");
class ExecutionEngine {
    desktopAgent = new DesktopAgent_1.DesktopAgent();
    pluginManager = new PluginManagerAgent_1.PluginManagerAgent();
    browserAgent = new BrowserAgent_1.BrowserAgent();
    visionAgent = new VisionAgent_1.VisionAgent();
    voiceAgent = new VoiceAgent_1.VoiceAgent();
    appAgent = new ApplicationAgent_1.ApplicationAgent();
    codingAgent = new CodingAgent_1.CodingAgent();
    researchAgent = new ResearchAgent_1.ResearchAgent();
    fileAgent = new FileAgent_1.FileAgent();
    healthAgent = new HealthAgent_1.HealthAgent();
    knowledgeAgent = new KnowledgeAgent_1.KnowledgeAgent();
    creativeAgent = new CreativeAgent_1.CreativeAgent();
    automationAgent = new AutomationAgent_1.AutomationAgent();
    schedulingAgent = new SchedulingAgent_1.SchedulingAgent();
    commAgent = new CommunicationAgent_1.CommunicationAgent();
    analyticsAgent = new AnalyticsAgent_1.AnalyticsAgent();
    memoryAgent = new MemoryAgent_1.MemoryAgent();
    async executePlan(plan) {
        console.log(`[Execution Engine] Beginning execution for Plan ID: ${plan.planId}`);
        for (const step of plan.steps) {
            if (step.status === 'PENDING') {
                const success = await this.runStep(step);
                if (!success) {
                    console.error(`[Execution Engine] Halting plan. Step ${step.id} failed.`);
                    return false;
                }
            }
        }
        console.log(`[Execution Engine] Plan ${plan.planId} executed successfully.`);
        return true;
    }
    async runStep(step) {
        step.status = 'RUNNING';
        EventBus_1.eventBus.publish('execution:step_started', { step });
        console.log(`[Execution Engine] -> Agent [${step.agent}] executing: "${step.action}"`);
        let result = false;
        try {
            switch (step.agent) {
                case 'DesktopAgent':
                    result = await this.desktopAgent.executeCommand(step.action);
                    break;
                case 'ApplicationAgent':
                    const parts = step.action.split(':');
                    const targetApp = parts[0] || 'Unknown';
                    const command = parts.length > 1 ? parts[1].trim() : step.action;
                    result = await this.appAgent.executeAppSkill(targetApp, command);
                    break;
                case 'BrowserAgent':
                    result = await this.browserAgent.launch(); // simplified for space
                    break;
                case 'VisionAgent':
                    const screenPath = await this.visionAgent.captureScreen();
                    result = !!screenPath;
                    break;
                case 'VoiceAgent':
                    await this.voiceAgent.speak(step.action);
                    result = true;
                    break;
                case 'CodingAgent':
                    await this.codingAgent.reviewCode(step.action);
                    result = true;
                    break;
                case 'ResearchAgent':
                    await this.researchAgent.searchWeb(step.action);
                    result = true;
                    break;
                case 'FileAgent':
                    await this.fileAgent.readConfig(step.action);
                    result = true;
                    break;
                case 'KnowledgeAgent':
                    await this.knowledgeAgent.queryVectorDatabase(step.action);
                    result = true;
                    break;
                case 'MemoryAgent':
                    console.log(`[Memory Agent] memory checking...`);
                    await this.memoryAgent.retrieveContext(step.action);
                    result = true;
                    break;
                case 'HealthAgent':
                    await this.healthAgent.runDiagnostics();
                    result = true;
                    break;
                case 'CreativeAgent':
                    await this.creativeAgent.generateAsset(step.action, 'image');
                    result = true;
                    break;
                case 'AutomationAgent':
                    await this.automationAgent.runMacro(step.action);
                    result = true;
                    break;
                case 'SchedulingAgent':
                    await this.schedulingAgent.getDailyAgenda();
                    result = true;
                    break;
                case 'CommunicationAgent':
                    await this.commAgent.sendMessage('slack', step.action);
                    result = true;
                    break;
                case 'AnalyticsAgent':
                    await this.analyticsAgent.generateReport(step.action);
                    result = true;
                    break;
                case 'PluginManagerAgent':
                    await this.pluginManager.scanAndLoadPlugins();
                    result = true;
                    break;
                default:
                    console.warn(`[Execution Engine] Unhandled Agent Type: ${step.agent}. Simulating success.`);
                    await new Promise(r => setTimeout(r, 500));
                    result = true;
            }
        }
        catch (err) {
            console.error(`[Execution Engine] Step failed during runtime:`, err);
            result = false;
        }
        step.status = result ? 'COMPLETED' : 'FAILED';
        EventBus_1.eventBus.publish('execution:step_completed', { step });
        return result;
    }
}
exports.ExecutionEngine = ExecutionEngine;
