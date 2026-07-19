/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { UnderstandingAgent } from '../../agents/understanding-agent/UnderstandingAgent';

import { KeyboardModule } from '../../desktop/keyboard';
import { MouseModule } from '../../desktop/mouse';

export class OSControllerSkill {
  protected understandingAgent = new UnderstandingAgent();

  private static keyboard = new KeyboardModule();
  private static mouse = new MouseModule();

  /**
   * Translates abstract natural language commands into physical PC actions
   */
  public static async executeCommand(command: string): Promise<boolean> {
    console.log(`[OS Controller Skill] Analyzing physical intent: "${command}"`);
    const normalized = command.toLowerCase();

    try {
      if (normalized.includes('copy') || normalized.includes('ctrl+c')) {
         console.log(`[OS Controller] Executing COPY shortcut...`);
         return await this.keyboard.pressKey('c', ['control']);
      }
      
      if (normalized.includes('paste') || normalized.includes('ctrl+v')) {
         console.log(`[OS Controller] Executing PASTE shortcut...`);
         return await this.keyboard.pressKey('v', ['control']);
      }

      if (normalized.includes('save') || normalized.includes('ctrl+s')) {
         console.log(`[OS Controller] Executing SAVE shortcut...`);
         return await this.keyboard.pressKey('s', ['control']);
      }

      if (normalized.includes('type') || normalized.includes('write')) {
         const payload = command.split(/type|write/i)[1].trim();
         console.log(`[OS Controller] Executing TYPE sequence...`);
         return await this.keyboard.typeString(payload);
      }

      if (normalized.includes('click') || normalized.includes('select')) {
         console.log(`[OS Controller] Executing LEFT CLICK...`);
         return await this.mouse.click('left');
      }

      if (normalized.includes('scroll down')) {
         console.log(`[OS Controller] Executing SCROLL DOWN sequence...`);
         return await this.mouse.scroll(500, 'down');
      }

      console.warn(`[OS Controller Skill] Physical PC intent not clearly mapped: "${command}"`);
      return false;
      
    } catch (err) {
      console.error(`[OS Controller Skill] Failed executing physical input:`, err);
      return false;
    }
  }
}
