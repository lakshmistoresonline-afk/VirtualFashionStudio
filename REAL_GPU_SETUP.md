# Production Real-GPU Setup Guide (Phase 8)

This guide provides the exact procedure to deploy the Actual Neural Inference Worker on an NVIDIA machine.

## 1. Hardware Requirements
- **GPU**: NVIDIA GPU with >= 24GB VRAM (RTX 3090, 4090, A100, H100).
- **Driver**: NVIDIA Driver 535+.
- **CUDA**: 12.1+.
- **OS**: Linux (Ubuntu 22.04 recommended) or Windows 10/11 Pro.

## 2. Environment Setup
```bash
# Create Conda Environment
conda create -n fashion-studio python=3.10
conda activate fashion-studio

# Install PyTorch with CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install Inference Dependencies
pip install flask flask-cors diffusers transformers accelerate xformers
pip install protobuf sentencepiece opencv-python numpy
```

## 3. Checkpoint Download
```bash
# Weights will be automatically downloaded by diffusers during first run, 
# or can be pre-cached:
python -c "from diffusers import CogVideoXImageToVideoPipeline; CogVideoXImageToVideoPipeline.from_pretrained('THUDM/CogVideoX-5b')"
```

## 4. Startup
```bash
cd gpu-worker
python pipeline/worker.py
```

## 5. Verification
Run the following health check from your server:
`curl http://your-gpu-ip:5000/health`

**Expected Output**:
`{"gpu_available": true, "vto_ready": true, "status": "ready"}`
