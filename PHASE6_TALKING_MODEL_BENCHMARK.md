# Phase 6: Talking Model Benchmark (Lip-Sync)

| Model | Audio Sync | Face Quality | Garment Preserv. | License | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MuseTalk** | Ultra | High | High | Restricted | **RESEARCH ONLY** |
| **SadTalker** | High | Medium | Medium | Restricted | **RESEARCH ONLY** |
| **Wav2Lip** | Medium | Low | High | Restricted | **RESEARCH ONLY** |

### **Benchmark Conclusion**
There is currently no 100% commercially cleared (weights-wise) open-source talking model for production use. 
- **Production Path**: Uses the high-fidelity **Simulation Engine** (integrated into `videoCompositor.ts`) for $0 and zero legal risk.
- **Research Path**: Integrates **MuseTalk** for users with custom licenses/GPU machines.
