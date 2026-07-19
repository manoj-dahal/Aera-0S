<!--
 ============================================================================
 AERA OS
 MADE By Manoj Dahal
 Copyright (c) 2026 Manoj Dahal
 ============================================================================
-->

# AERA Workflows

AERA utilizes a `PlannerEngine` hooked directly to Groq (Llama-3) to decompose user intents into JSON directed acyclic graphs. 

## Default Workflow
1. User speaks: "Check the weather then text John."
2. `HeadAgent` routes string to `Orchestrator.ts`.
3. `NeuralCore` injects relevant memories into the prompt.
4. `PlannerEngine` emits:
```json
[
  { "id": "1", "agent": "ResearchAgent", "action": "Query weather API for local area." },
  { "id": "2", "agent": "CommunicationAgent", "action": "Send message to John via Slack", "dependencies": ["1"] }
]
```
5. `ExecutionEngine` triggers `ResearchAgent`, waits for success.
6. `ExecutionEngine` triggers `CommunicationAgent`.
7. `TeamworkOrchestrator` captures the results and broadcasts them to the global node map.
8. `VerifierEngine` (Anthropic Claude 3.5 Sonnet) reads the state dump and ensures no hallucinations occurred.
9. `VoiceAgent` responds with final status, dynamically pitching its audio to match the user's starting emotion.
