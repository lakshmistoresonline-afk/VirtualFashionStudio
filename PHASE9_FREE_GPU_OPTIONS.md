# Phase 9: Free GPU Deployment Options

Since the local development machine lacks a CUDA GPU, the following platforms can be used as temporary, free remote workers.

| Platform | GPU Type | VRAM | Session Limit | decide |
| :--- | :--- | :--- | :--- | :--- |
| **Google Colab** | T4 (Free) | 16 GB | ~12 hours | **BEST FOR DEV** |
| **Kaggle** | T4 x 2 | 32 GB | 9 hours | **BEST FOR VIDEO** |
| **Hugging Face** | ZeroGPU | Shared | Credits-based | Experimental |

## 1. Google Colab Setup
1. Open a new Notebook.
2. Select **Runtime -> Change runtime type -> T4 GPU**.
3. Upload the `gpu-worker/` folder.
4. Run: `!python pipeline/worker.py`
5. Use **ngrok** or **localtunnel** to expose the 5000 port to the local application.

## 2. Kaggle Setup
1. Create a new Dataset containing the model checkpoints.
2. Create a new Notebook and attach the dataset.
3. Select **GPU T4 x2**.
4. Run the worker script.
