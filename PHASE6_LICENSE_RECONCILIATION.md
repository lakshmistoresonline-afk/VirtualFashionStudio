# Phase 6: License Reconciliation Report

This document reconciles contradictions regarding model-weight licensing for the Real AI production path.

| Component | Code License | Weight License | Commercial Use | Decision |
| :--- | :--- | :--- | :--- | :--- |
| **CogVideoX-5B** | Apache 2.0 | Apache 2.0 | **YES** | **SELECTED FOR PRODUCTION MOTION** |
| **Stable Diffusion XL**| Apache 2.0 | OpenRAIL++ | **YES** | **CORE VTO ENGINE** |
| **MuseTalk** | Apache 2.0 | Restricted | **NO** | **RESEARCH/OPTIONAL ONLY** |
| **SadTalker** | MIT | Non-Commercial | **NO** | **RESEARCH/OPTIONAL ONLY** |
| **Wav2Lip** | MIT | Restricted | **NO** | **RESEARCH/OPTIONAL ONLY** |
| **Edge-TTS** | MIT | MS Service Terms| **YES** | **CORE PRODUCTION TTS** |

### **Final Decision for Commercial Path**
1.  **VTO**: SDXL + ControlNet (Apache 2.0 / OpenRAIL++).
2.  **Motion**: CogVideoX-5B (Apache 2.0). 
3.  **Talking**: Due to the global lack of commercially cleared open-weights for lip-sync, the **Talking Presenter** will be offered as a **Research/Experimental Feature**. The **Production/Commercial Default** will be a non-talking High-Fidelity Fashion Motion video with professional voice-over.
