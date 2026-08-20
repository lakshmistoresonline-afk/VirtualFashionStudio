# Real AI Setup Guide (Phase 2)

To enable photorealistic generation, you must configure a **Remote GPU Worker**.

## 1. Prerequisites
- A machine with an NVIDIA GPU (> 16GB VRAM recommended for Wan2.1).
- Python 3.10+
- Flask

## 2. Worker Setup
1.  Navigate to the `gpu-worker/` directory on your GPU machine.
2.  Install dependencies:
    ```bash
    pip install flask flask-cors torch diffusers
    ```
3.  Run the worker:
    ```bash
    python pipeline/worker.py
    ```

## 3. Web App Configuration
1.  Open `.env` in the root of the AI Virtual Fashion Studio.
2.  Set your worker's public IP/URL:
    ```env
    GPU_WORKER_URL="http://your-gpu-ip:5000"
    ```
3.  Restart the application.

## 4. Usage
1.  Open the Studio.
2.  In **Step 1**, select **Generation Mode: Real AI (GPU)**.
3.  The pipeline will now automatically offload VTO, Motion, and LipSync to the GPU worker.
