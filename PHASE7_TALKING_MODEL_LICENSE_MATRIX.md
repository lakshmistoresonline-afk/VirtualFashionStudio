# Phase 7: Talking Model License Matrix

This matrix evaluates potential talking-head/lip-sync models for commercial production.

| Candidate | Code License | Weight License | Commercial Use | Identity | Garment | Lip Sync | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MuseTalk** | Apache 2.0 | Restricted | **NO** | High | High | Ultra | **RESEARCH ONLY** |
| **SadTalker** | MIT | Non-Commercial | **NO** | Medium | Medium | High | **RESEARCH ONLY** |
| **Wav2Lip** | MIT | Restricted | **NO** | Low | High | High | **RESEARCH ONLY** |
| **Hallo** | Apache 2.0 | Non-Commercial | **NO** | Ultra | High | High | **RESEARCH ONLY** |
| **LivePortrait**| MIT | Non-Commercial | **NO** | Ultra | High | Medium | **RESEARCH ONLY** |
| **CogVideoX-Lip**| Apache 2.0 | Apache 2.0 | **YES** | High | High | Med | **EXPERIMENTAL** |

## Findings
There is currently a global shortage of high-fidelity, open-source talking head models with **commercially cleared weights**. Most models use the VoxCeleb2 or LRS3 datasets, which are restricted to research.

### **Final Decision**
- **Commercial Mode**: We will use a **Modular Frame-Swap Strategy**. We use CogVideoX to generate a video of the model talking (prompt-based), which is commercially safe. We then apply procedural alignment if neural sync is unavailable with commercial weights.
- **Research Mode**: MuseTalk remains the primary engine for users with their own weight-clearance.
