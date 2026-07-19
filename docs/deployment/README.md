<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA Deployment & Build Guide

AERA-OS is a monolithic Electron/React application utilizing Vite as the primary frontend bundler and `tsc` for the backend Node services.

## Local Development
```bash
# 1. Install all dependencies
npm install

# 2. Run the hot-reloading Vite dev server + Electron watcher concurrently
npm run electron:serve
```

## Production Compilation
To build the finalized distributable binary (e.g., `.exe`, `.dmg`, `.AppImage`):

```bash
# 1. Build the Vite React Payload into /dist
# 2. Compile the Electron typescript into /dist-electron
# 3. Package the final binaries using electron-builder
npm run build
```

See `electron-builder.yml` to configure code signing, auto-update hooks, and platform specific architectures.