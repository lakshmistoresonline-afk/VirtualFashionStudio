# Phase 9: Remote GPU Worker Setup Guide

Follow these instructions to deploy the AI Fashion Studio worker on any machine with an NVIDIA GPU.

## 1. Environment Creation
```bash
conda create -n fashion-remote python=3.10
conda activate fashion-remote
pip install flask flask-cors torch diffusers transformers accelerate xformers
```

## 2. Model Caching
Ensure weights are pre-downloaded to avoid job timeouts:
```python
from diffusers import StableDiffusionXLControlNetInpaintPipeline
# Pre-caching SDXL
StableDiffusionXLControlNetInpaintPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")
```

## 3. Starting the Remote Bridge
```bash
# Start the worker with public access enabled
python pipeline/worker.py
```

## 4. Connecting the Local App
Update your local `.env`:
```env
GPU_WORKER_URL="https://your-public-gpu-url.com"
GPU_WORKER_MODE="remote"
```
