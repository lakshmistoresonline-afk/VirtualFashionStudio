# Hardware Compatibility Report

## Host: DESKTOP-Q9LS7LJ
- **CPU**: Intel Core i5-4210U @ 1.70GHz (Haswell)
- **RAM**: 8GB DDR3
- **GPU**: Intel(R) HD Graphics Family (Integrated)
- **VRAM**: 0MB (Shared)
- **Acceleration**: No CUDA / No OpenCL available.

## Model Feasibility Results

| AI Model | Size | Hardware Status | Path |
| :--- | :--- | :--- | :--- |
| **Wan2.1 (1B)** | ~2GB | **NOT PRACTICAL** | GPU Server / Adapter |
| **MuseTalk** | ~1GB | **NOT PRACTICAL** | GPU Server / Adapter |
| **Llama 3 (Groq)** | N/A | **READY** | Cloud Free API |
| **Gemini Flash** | N/A | **READY** | Cloud Free API |
| **Drape Simulation** | N/A | **READY** | Client CPU (Canvas) |

### **Recommendation**
The system must continue to run in **"Cloud + Simulation"** mode for this machine. I will build an **Adapter Architecture** so that if the user later upgrades to a GPU machine, the "Real Video" features can be toggled on.
