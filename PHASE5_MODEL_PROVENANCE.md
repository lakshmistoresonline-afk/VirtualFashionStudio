# Phase 5: Model Provenance Report

This document records the origin and licensing of the primary neural models used in the Fashion Studio production pipeline.

| Model Name | Source | Weights License | Commercial Status |
| :--- | :--- | :--- | :--- |
| **Stable Diffusion XL** | Stability AI | OpenRAIL++ | **COMMERCIAL READY** |
| **ControlNet (Canny)** | LLlyasviel | Apache 2.0 | **COMMERCIAL READY** |
| **AnimateDiff** | Guansihui | MIT / Restricted | **BENCHMARK ONLY** |
| **Gemini 1.5 Flash** | Google | BSD-3 (API Terms) | **PRODUCTION READY** |
| **Edge-TTS** | Microsoft | MS Service Terms | **PRODUCTION READY** |

## Findings
For the **Commercial Production Path**, the system uses Stable Diffusion XL with ControlNet. This configuration is fully cleared for commercial fashion advertising. High-fidelity video generation via AnimateDiff is currently kept in the **Research Mode** until a commercially permissive video model (like CogVideoX) is fully benchmarked.
