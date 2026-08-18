# Integration Plan: Real Fashion Advertisement Generator

## Phase 1: Foundation (Current State)
- [x] Hardware & License Audit.
- [x] Multi-API Key Support (Gemini/Groq).
- [x] SVG-based "Zero-Cost" VTO.

## Phase 2: Lip-Sync Upgrade (The Talking Model)
- [ ] Implement `TalkingModelProvider` interface.
- [ ] **Path A (Free)**: Build a Canvas-based mouth animator (Simple mesh warp or mouth-overlay) synchronized with the Web Speech API frequency data.
- [ ] **Path B (Local/GPU)**: Create a Python bridge template for **MuseTalk** inference.

## Phase 3: Fashion Movement (Wan2.1)
- [ ] Refactor `videoCompositor.ts` to support raw Video Clip overlays.
- [ ] Implement `FashionMovementProvider`.
- [ ] Create a "Motion Preset" library (Walk, Pose, Detail) using the simulation engine as the baseline.

## Phase 4: Full Pipeline Integration
- [ ] Connect Script -> Audio -> Lip-Sync -> Video Assembly.
- [ ] Implement "Scene Caching" (Don't regenerate video if only script changes).
- [ ] Final 9:16 Social Media layout optimization.
