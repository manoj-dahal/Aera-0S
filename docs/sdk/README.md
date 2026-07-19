<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA Plugin SDK

AERA-OS supports third-party execution payloads via a highly secured `vm2` sandboxing environment. 

Plugins must be dropped into `plugins/runtime/<plugin_name>` and must include a `manifest.json`.

## Manifest Structure
```json
{
  "id": "com.developer.plugin",
  "name": "My Custom Skill",
  "version": "1.0.0",
  "description": "Adds a new API skill to AERA",
  "permissions": ["os.notify", "agents.request"],
  "entryPoint": "index.js"
}
```

## Writing `index.js`
The plugin entry point must export `activate` and `deactivate` lifecycle hooks. AERA injects an `AeraPluginContext` object natively into the VM sandbox.

```javascript
module.exports = {
  activate: async (context) => {
    // Safely utilize AERA APIs
    context.os.notify("Custom skill loaded!");
    
    // Request other agents to do work
    await context.agents.request('DesktopAgent', { 
       command: 'open code' 
    });
  },
  deactivate: async () => {
    // Cleanup logic
  }
}
```

*Note: Native modules like `fs` and `child_process` are strictly blocked from the `vm2` sandbox to prevent RCE vectors.*