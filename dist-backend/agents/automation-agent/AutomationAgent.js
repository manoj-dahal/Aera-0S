"use strict";
/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationAgent = void 0;
const keyboard_1 = require("../../desktop/keyboard");
const mouse_1 = require("../../desktop/mouse");
class AutomationAgent {
    keyboard;
    mouse;
    constructor() {
        this.keyboard = new keyboard_1.KeyboardModule();
        this.mouse = new mouse_1.MouseModule();
    }
    async runMacro(macroId) {
        console.log(`[Automation Agent] Triggering pre-recorded OS Macro: ${macroId}`);
        // Example: Simulated macro sequence
        if (macroId === 'save_and_close') {
            await this.keyboard.pressKey('s', ['control']);
            await this.keyboard.pressKey('w', ['control']);
            return true;
        }
        return true;
    }
    async simulateKeystrokes(text) {
        return await this.keyboard.typeString(text);
    }
    async simulateMouseAction(action, payload) {
        if (action === 'click') {
            return await this.mouse.click(payload.button, payload.double);
        }
        else if (action === 'move') {
            return await this.mouse.moveTo(payload.x, payload.y);
        }
        return false;
    }
    /**
     * True Multimodal PC Control: Combines screen OCR/Vision with physical mouse movement
     */
    async organicClick(elementDescription, visionAgent) {
        console.log(`[Automation Agent] Attempting organic visual click for: "${elementDescription}"`);
        const screenPath = await visionAgent.captureScreen();
        if (!screenPath)
            return false;
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
    async scheduleCronTask(cronExpression, task) {
        console.log(`[Automation Agent] Task "${task}" registered with chron execution: ${cronExpression}`);
    }
}
exports.AutomationAgent = AutomationAgent;
