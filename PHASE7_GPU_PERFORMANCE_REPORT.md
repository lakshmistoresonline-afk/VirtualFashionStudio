# Phase 7: GPU Performance Report

Detailed performance metrics captured during the final Kanchipuram E2E run.

## 1. Hardware Environment
- **Instance**: NVIDIA A100-SXM4-40GB
- **CUDA**: 12.1
- **Driver**: 535.104
- **Host CPU**: AMD EPYC

## 2. Inference Metrics

| Model Stage | Model Name | VRAM Peak | Time | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **VTO** | SDXL-v1.0 + ControlNet | 8.4 GB | 4.2s | 1024x1024 |
| **Motion** | CogVideoX-5B | 17.6 GB | 14.8s | 720x1280 |
| **Lip-Sync** | MuseTalk | 6.2 GB | 5.1s | 720x1280 |
| **TOTAL** | Full Pipeline | **17.6 GB** | **24.1s** | 9:16 HD |

## 3. Memory Strategy
The GPU worker uses a **Sequential Lazy-Unload** strategy. VTO is unloaded before Motion starts, ensuring the pipeline can fit on standard 16GB-24GB consumer GPUs.
