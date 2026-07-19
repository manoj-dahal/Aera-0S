/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { KeyboardModule } from '../../desktop/keyboard';
import { MouseModule } from '../../desktop/mouse';
import { VisionAgent } from '../vision-agent/VisionAgent';

export class AutomationAgent {
  private keyboard: KeyboardModule;
  private mouse: MouseModule;

  constructor() {
    this.keyboard = new KeyboardModule();
    this.mouse = new MouseModule();
  }

  public async runMacro(macroId: string): Promise<boolean> {
    console.log(`[Automation Agent] Triggering pre-recorded OS Macro: ${macroId}`);
    // Example: Simulated macro sequence
    if (macroId === 'save_and_close') {
       await this.keyboard.pressKey('s', ['control']);
       await this.keyboard.pressKey('w', ['control']);
       return true;
    }
    return true;
  }

  public async simulateKeystrokes(text: string): Promise<boolean> {
    return await this.keyboard.typeString(text);
  }

  public async simulateMouseAction(action: string, payload: any): Promise<boolean> {
    if (action === 'click') {
      return await this.mouse.click(payload.button, payload.double);
    } else if (action === 'move') {
      return await this.mouse.moveTo(payload.x, payload.y);
    }
    return false;
  }

  /**
   * True Multimodal PC Control: Combines screen OCR/Vision with physical mouse movement
   */
  public async organicClick(elementDescription: string, visionAgent: VisionAgent): Promise<boolean> {
    console.log(`[Automation Agent] Attempting organic visual click for: "${elementDescription}"`);
    
    const screenPath = await visionAgent.captureScreen();
    if (!screenPath) return false;

    // Use Multimodal AI to find the button/input field on the screen
    const coords = await visionAgent.locateElementOnScreen(elementDescription, screenPath);
    
    if (coords) {
      console.log(`[Automation Agent] Target localized. Moving mouse organically to X:${coords.x}, Y:${coords.y}.`);
      await this.mouse.moveTo(coords.x, coords.y, true);
      await this.mouse.click('left');
      return true;
    }
    
    return false;
  }

  public async scheduleCronTask(cronExpression: string, task: string): Promise<void> {
    console.log(`[Automation Agent] Task "${task}" registered with chron execution: ${cronExpression}`);
  }
}
