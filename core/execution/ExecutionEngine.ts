/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { ExecutionPlan, Step } from '../planner/PlannerEngine';
import { eventBus } from '../event-bus/EventBus';

import { DesktopAgent } from '../../agents/desktop-agent/DesktopAgent';
import { PluginManagerAgent } from '../../agents/plugin-agent/PluginManagerAgent';
import { BrowserAgent } from '../../agents/browser-agent/BrowserAgent';
import { VisionAgent } from '../../agents/vision-agent/VisionAgent';
import { VoiceAgent } from '../../agents/voice-agent/VoiceAgent';
import { ApplicationAgent } from '../../agents/application-agent/ApplicationAgent';

import { CodingAgent } from '../../agents/coding-agent/CodingAgent';
import { ResearchAgent } from '../../agents/research-agent/ResearchAgent';
import { FileAgent } from '../../agents/file-agent/FileAgent';
import { HealthAgent } from '../../agents/health-agent/HealthAgent';
import { KnowledgeAgent } from '../../agents/knowledge-agent/KnowledgeAgent';

import { MemoryAgent } from '../../agents/memory-agent/MemoryAgent';

// newly implemented
import { CreativeAgent } from '../../agents/creative-agent/CreativeAgent';
import { AutomationAgent } from '../../agents/automation-agent/AutomationAgent';
import { SchedulingAgent } from '../../agents/scheduling-agent/SchedulingAgent';
import { CommunicationAgent } from '../../agents/communication-agent/CommunicationAgent';
import { AnalyticsAgent } from '../../agents/analytics-agent/AnalyticsAgent';


export class ExecutionEngine {
  private desktopAgent = new DesktopAgent();
  private pluginManager = new PluginManagerAgent();
  private browserAgent = new BrowserAgent();
  private visionAgent = new VisionAgent();
  private voiceAgent = new VoiceAgent();
  private appAgent = new ApplicationAgent();
  
  private codingAgent = new CodingAgent();
  private researchAgent = new ResearchAgent();
  private fileAgent = new FileAgent();
  private healthAgent = new HealthAgent();
  private knowledgeAgent = new KnowledgeAgent();

  private creativeAgent = new CreativeAgent();
  private automationAgent = new AutomationAgent();
  private schedulingAgent = new SchedulingAgent();
  private commAgent = new CommunicationAgent();
  private analyticsAgent = new AnalyticsAgent();
  private memoryAgent = new MemoryAgent();

  public async executePlan(plan: ExecutionPlan): Promise<boolean> {
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

  private async runStep(step: Step): Promise<boolean> {
    step.status = 'RUNNING';
    eventBus.publish('execution:step_started', { step });
    
    console.log(`[Execution Engine] -> Agent [${step.agent}] executing: "${step.action}"`);
    
    let result = false;

    try {
      switch (step.agent) {
        case 'DesktopAgent':
          result = await this.desktopAgent.executeCommand(step.action);
          break;
        case 'ApplicationAgent': {
          const parts = step.action.split(':');
          const targetApp = parts[0] || 'Unknown';
          const command = parts.length > 1 ? parts[1].trim() : step.action;
          result = await this.appAgent.executeAppSkill(targetApp, command);
          break;
        }
        case 'BrowserAgent':
          result = await this.browserAgent.launch(); // simplified for space
          break;
        case 'VisionAgent': {
          const screenPath = await this.visionAgent.captureScreen();
          result = !!screenPath;
          break;
        }
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
    } catch (err) {
      console.error(`[Execution Engine] Step failed during runtime:`, err);
      result = false;
    }
    
    step.status = result ? 'COMPLETED' : 'FAILED';
    eventBus.publish('execution:step_completed', { step });
    return result;
  }
}