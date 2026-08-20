# Phase 6: Video Model Benchmark (Image-to-Video)

This benchmark evaluates candidates for real image-to-video fashion movement.

| Model | License | VRAM | Identity | Garment | Saree | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CogVideoX-5B** | Apache 2.0 | 18GB (int8) | High | High | High | **WINNER** |
| **Wan2.1-I2V** | Restricted | 16GB (int8) | Ultra | High | High | Restricted |
| **AnimateDiff** | Restricted | 8GB | Med | Medium | Low | Blurry |
| **Stable Video Dif**| Restricted | 16GB | High | Medium | Medium | Restricted |

### **Benchmark Conclusion**
**CogVideoX-5B** is the only model that combines high-fidelity saree preservation (preserving the pallu and border) with a fully permissive commercial license. It will be implemented as the `CommercialVideoProvider`.
