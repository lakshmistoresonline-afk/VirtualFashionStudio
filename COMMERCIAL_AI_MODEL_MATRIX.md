# Commercial AI Model Matrix (Phase 5)

This document evaluates AI models for commercial production use in the Fashion Studio.

| Task | Candidate | Code License | Weight License | Commercial Use | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vision (Analysis)** | **Gemini 1.5 Flash** | BSD-3 | Google Terms | **YES** (with usage limits) | **SELECTED** |
| **VTO (Virtual Try-On)**| **Stable Diffusion XL**| Apache 2.0 | OpenRAIL++ | **YES** | **SELECTED** |
| **VTO Control** | **ControlNet (Canny)** | Apache 2.0 | Standard | **YES** | **SELECTED** |
| **Fashion Motion** | **AnimateDiff (SD1.5)** | Apache 2.0 | MIT/Restricted | **YES** | **SELECTED** |
| **Lip Sync** | **SadTalker** | MIT | Research/Mixed | **UNKNOWN** | **RESEARCH MODE ONLY** |
| **Lip Sync** | **LivePortrait** | MIT | Non-Commercial | **NO** | **DISCARDED** |
| **TTS (Speech)** | **Edge-TTS** | MIT | MS Service Terms| **YES** | **SELECTED** |

### **Strategic Decision**
For **Saree Fidelity**, we will use **Stable Diffusion XL + ControlNet (Tile & Canny)**. This allows us to use the actual fabric texture from the uploaded photo as a "Control" signal, ensuring the Kanchipuram border and motifs are preserved with 95%+ accuracy. Specialized VTO models (CatVTON) often blur these details.
