/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { VSCodeSkill } from '../../skills/vscode';
import { PhotoshopSkill } from '../../skills/photoshop';
import { OSControllerSkill } from '../../skills/custom/os-controller';
import { MediaPlayerSkill } from '../../skills/custom/media-player';
import { FundamentalAnalysisSkill } from '../../skills/fundamental';
import { TechnicalAnalysisSkill } from '../../skills/technical';

export class ApplicationAgent {
  public async executeAppSkill(appName: string, command: string): Promise<boolean> {
    console.log(`[Application Agent] Routing command to ${appName} skill module...`);

    const normalizedApp = appName.toLowerCase().replace(/\s/g, '');

    switch (normalizedApp) {
      case 'music':
      case 'spotify':
      case 'applemusic':
      case 'media':
      case 'audio':
        return await MediaPlayerSkill.executeCommand(command);
      case 'os':
      case 'system':
      case 'pc':
      case 'keyboard':
      case 'mouse':
        return await OSControllerSkill.executeCommand(command);
      case 'vscode':
      case 'code':
        return await VSCodeSkill.executeCommand(command);
      case 'photoshop':
      case 'ps':
        return await PhotoshopSkill.executeCommand(command);
      case 'fundamental':
      case 'fundamentals':
      case 'finance':
      case 'investing':
        return await FundamentalAnalysisSkill.executeCommand(command);
      case 'technical':
      case 'technicals':
      case 'chart':
      case 'trading':
        return await TechnicalAnalysisSkill.executeCommand(command);
      case 'blender':
      case 'figma':
      case 'premiere':
      case 'docker':
      case 'github':
        // Example passthrough logic for scaffolded application skills
        console.log(`[Application Agent] Simulated execution of ${normalizedApp} skill payload: ${command}`);
        return true;
      default:
        console.warn(`[Application Agent] Application skill module for "${appName}" not found.`);
        return false;
    }
  }
}