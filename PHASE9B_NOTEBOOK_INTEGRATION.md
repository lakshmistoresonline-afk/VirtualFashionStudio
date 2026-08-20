# Phase 9B: Remote GPU Notebook Integration (notebooka19b8802ce)

This guide documents the integration of the `notebooka19b8802ce` instance as the primary remote GPU execution environment.

## 1. Notebook Startup Procedure
Run these commands in the `notebooka19b8802ce` environment to initialize the worker:

```python
# 1. Install Dependencies
!pip install flask flask-cors torch diffusers transformers accelerate xformers

# 2. Configure Authentication
import os
os.environ["WORKER_AUTH_TOKEN"] = "trade_mind_ai_secure_2026_x99"

# 3. Start Worker
# IMPORTANT: Use the '!' prefix to run as a shell command in the notebook
!python gpu-worker/pipeline/worker.py
```

## 2. Establishing the Secure Bridge
If the notebook is local or in a private cloud, use a tunnel:
```bash
# Example using localtunnel
!npx localtunnel --port 5000
```

## 3. Local Application Configuration
Update your `.env` file on your local machine:
```env
GPU_WORKER_MODE=remote
GPU_WORKER_URL="https://the-tunnel-url.loca.lt"
WORKER_AUTH_TOKEN="trade_mind_ai_secure_2026_x99"
```

## 4. Verification Health Check
Run the health check from your local studio:
`GET /api/health/ai`

**Target Response:**
```json
{
  "status": "ready",
  "worker": {
    "instance": "notebooka19b8802ce",
    "gpu_available": true,
    "cuda": true
  }
}
```

## 5. Security Protocols
- **Server-Side Only**: All tokens are managed by the Node.js backend.
- **Header Auth**: Every request to `notebooka19b8802ce` includes the `X-Worker-Auth` header.
- **Zero Exposure**: No GPU details or tokens are sent to the client browser.
