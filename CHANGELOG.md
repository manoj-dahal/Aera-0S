<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Genesis Release
### Added
- Complete Monorepo Folder Structure defined by the Master Prompt.
- `App.tsx` multi-view router (Hologram, Workspace, Terminal, Knowledge Graph).
- Interactive 3D Hologram built with `@react-three/fiber` and `@react-three/drei`.
- Interactive 3D Semantic Memory layout using `react-force-graph-3d`.
- XTerm.js embedded terminal for real-time system observability.
- Fully decoupled Event-Driven Multi-Agent Architecture (`HeadAgent`, `PlannerEngine`, `ExecutionEngine`, `VerifierEngine`).
- `GroqAdapter` (Llama-3) for hyper-fast JSON planning generation.
- `AnthropicAdapter` (Claude-3.5) for high-reasoning outcome verification.
- `BrowserAgent` integrated with `Playwright`.
- `VisionAgent` integrated with OS-native screencapture and local `Tesseract.js` OCR.
- Secure Plugin Sandbox architecture via `vm2`.
- Base Application routing modules established in the `skills/` directory (Photoshop, VSCode, Blender, Unity, etc.).