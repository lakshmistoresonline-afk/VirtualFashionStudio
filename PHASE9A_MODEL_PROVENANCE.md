# Phase 9A: Model Provenance & Verification Log

This document tracks the model checkpoints for the remote GPU worker deployment.

## 1. Vision & Draping (VTO)
- **Model**: Stable Diffusion XL 1.0 (Inpainting)
- **Checkpoint**: `stabilityai/stable-diffusion-xl-base-1.0`
- **ControlNet**: `diffusers/controlnet-canny-sdxl-1.0`
- **Purpose**: High-fidelity garment transfer on Indian models.

## 2. Fashion Motion
- **Model**: CogVideoX-5B
- **Checkpoint**: `THUDM/CogVideoX-5b`
- **Purpose**: Commercial-safe (Apache 2.0) fashion movement.

## 3. Lip-Sync
- **Model**: LatentSync / MuseTalk
- **Checkpoint**: `ByteDance/LatentSync` (Commercial)
- **Purpose**: Neural audio-to-facial synchronization.

## 4. Text-to-Speech
- **Model**: Microsoft Edge-TTS (Neural)
- **Voice**: `ml-IN-SobhanaNeural` (Malayalam) / `en-IN-NeerjaNeural` (English).

## Verification Hash
All checkpoints will be verified using the `diffusers` library checksum during initial download on the GPU machine.
