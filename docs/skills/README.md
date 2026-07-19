<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA Skills Documentation

AERA OS integrates deeply into physical applications via the `skills/` directory.

## Supported Skills
* **Photoshop (`skills/photoshop`)**: Communicates with Adobe UXP/JSX extensions.
* **VS Code (`skills/vscode`)**: Formats files, opens workspaces, triggers debugging.
* **Terminal (`skills/terminal`)**: Safely abstracts raw UNIX/Windows commands for the `DesktopAgent`.
* **Blender (`skills/blender`)**: Interfaces with Blender Python scripts for automated rendering and scene generation.

To add a new skill, create a new directory inside `skills/` and expose an `executeCommand(command: string)` payload router.