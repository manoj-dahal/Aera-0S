<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# Architecture Overview: AERA OS Multi-Agent Engine

AERA OS uses an **Event-Driven, Clean Architecture** approach to manage its Artificial General Intelligence loop. It separates physical OS operations, deep-reasoning layers, and UI states.

## Core Intelligence Modules (`core/`)

### 1. `Orchestrator.ts`
The heartbeat of the OS. It manages the `StateMachine` (Idle, Thinking, Executing) and passes data between the Planner, Executor, Verifier, and the Neural Core.

### 2. `PlannerEngine.ts`
When the Orchestrator receives a raw string goal, it uses an ultra-fast LLM API (Groq/Llama-3) strictly configured to output JSON. It breaks the goal into sequential or parallel `Step` objects.

### 3. `ExecutionEngine.ts`
Consumes the DAG array from the Planner. It contains a massive routing switch that instantiates over 20 different specific `Agent` classes. 

### 4. `NeuralCore.ts` & `CognitiveProcessor.ts`
The highest order of logic. Before the Planner acts, the Neural Brain accepts the stimulus, stores it inside the local `SynapticMemory`, uses a Chain-of-Thought engine to determine the logical path, and resolves any implicit linguistic ambiguities.

### 5. `TeamworkOrchestrator.ts`
Manages the agent "Swarm". Allows independent agents (like `VisionAgent` and `BrowserAgent`) to continuously broadcast extracted context into a shared, asynchronous memory pool so they can collaborate without blocking each other.

---

## Specialized Agents (`agents/`)
Agents are tightly scoped logic boundaries. An Agent should only possess the tools required for its specific domain.
* **`DesktopAgent`**: Has `child_process.exec` access. Can launch raw applications.
* **`BrowserAgent`**: Runs `playwright` to navigate web endpoints dynamically.
* **`VisionAgent`**: Uses `screencapture` and multimodal vision models to find specific UI elements (bounding box X/Y coordinates) on the screen.
* **`UnderstandingAgent`**: Resolves code-switching (mixed languages) and extracts explicit NLP variables.

---

## Application Intelligence (`skills/`)
When the `ApplicationAgent` receives a command, it delegates it to the `skills/` directory. Each skill folder contains deep integrations for specific software. 
* E.g., `skills/photoshop/index.ts` integrates with Adobe's JSX/UXP scripting API.
* E.g., `skills/custom/os-controller.ts` triggers physical keyboard inputs and mouse clicks to literally pilot the user's computer.

---

## Memory Engine (`memory/` & `database/`)
* **Vector Knowledge**: AERA locally chunks files and inserts them into a local Drizzle ORM SQLite database (`aera-os.db`) for semantic RAG (Retrieval-Augmented Generation).
* **Neural Graph**: A fast, local JSON graph mapping synaptic relationships between ideas, natively implementing long-term potentiation and memory pruning for decayed data.
