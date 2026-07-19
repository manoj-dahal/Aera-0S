<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA UI Framework Documentation

The AERA OS utilizes a bleeding-edge UI stack strictly optimized for Electron desktop rendering:

- **React 19**: Rendering library.
- **Framer Motion**: Handles all layout transitions, stagger animations, and Command Palette physics.
- **Three.js / React-Three-Fiber**: Powers the 3D Holographic Core (dot matrix) and the interactive Force-Graph Knowledge DB.
- **Tailwind CSS**: Configured with a custom Cyberpunk Glassmorphism theme (`#050A14`, `#48E8FF`, `#00BFFF`).

## Viewports
State transitions in `App.tsx` smoothly fade between:
1. `Hologram`: The ambient listening orb.
2. `Workspace`: Project, Health monitoring, and the File Ingestion Dropzone.
3. `Knowledge`: Real-time 3D Semantic mapping.
4. `Terminal`: Raw `xterm.js` hardware accelerated logging.
5. `Settings`: Encrypted vault for managing and testing API keys and discovering new Foundation Models.
