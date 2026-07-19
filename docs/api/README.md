<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA API Documentation

## Inter-Process Communication (IPC)

The primary method for communicating with AERA's underlying AGI node.js backend from the React UI is through secure Electron IPC channels defined in `electron/preload/index.ts`.

### `window.aeraAPI.processCommand(command: string)`
Sends a natural language string directly to the `HeadAgent`.
- **Returns**: `Promise<{ success: boolean, response?: string, error?: string }>`
- **Example**:
```javascript
const result = await window.aeraAPI.processCommand("Open Photoshop and batch export all layers.");
if (result.success) {
    console.log("AERA Output:", result.response);
}
```

### `window.aeraAPI.getSystemStatus()`
Retrieves live resource utilization metrics and the current `StateMachine` status of the Orchestrator.
- **Returns**: `Promise<{ status: string, memory: Object, cpuUsage: Object }>`

---

## Agent Interfaces

If writing internal extensions or modifying the Core Orchestrator, interact with Agents asynchronously:

```typescript
import { DesktopAgent } from '../../agents/desktop-agent/DesktopAgent';

const agent = new DesktopAgent();
await agent.executeCommand("Open VS Code"); // Resolves to boolean
```