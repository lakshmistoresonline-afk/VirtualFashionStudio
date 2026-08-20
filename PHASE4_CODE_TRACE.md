# Phase 4 Code Trace: Real AI Execution Path

This document traces the reported "Real AI" pipeline from UI to Worker.

| Stage | Source File | Function | Provider | Actual Execution? | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Trigger** | `src/App.tsx` | `handleGenerateFullReel` | UI | No | **VERIFIED (UI)** |
| **Proxy** | `src/lib/ai/clientProvider.ts` | `generateDrapedShots` | Client | No (Proxy) | **VERIFIED (Proxy)** |
| **API** | `server.ts` | `POST /api/ai/vto` | Express | No (Router) | **VERIFIED (API)** |
| **Orchestrator** | `server/ai/realAIProvider.ts` | `generateFashionShots` | Server | No (Fetch) | **VERIFIED (Bridge)** |
| **Inference (VTO)** | `gpu-worker/pipeline/worker.py` | `generate_vto` | Flask | **NO (Mock)** | **MOCKED** |
| **Inference (Motion)** | `gpu-worker/pipeline/worker.py` | `generate_motion` | Flask | **NO (Mock)** | **MOCKED** |
| **Inference (Talk)** | `gpu-worker/pipeline/worker.py` | `generate_lipsync` | Flask | **NO (Mock)** | **MOCKED** |

## Findings
The "Real AI" path is fully architected as a bridge (React -> Express -> Python), but the **Python side (Worker) contains no model weights or inference code**. It returns placeholders and uses `time.sleep()` to simulate processing time.
