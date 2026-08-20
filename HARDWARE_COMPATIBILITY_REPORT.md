# Hardware Compatibility Report (Phase 2)

## Host PC (Dell Inspiron 3542)
- **CPU**: Intel i5-4210U (2 Cores, 1.7GHz)
- **RAM**: 8GB
- **GPU**: Intel HD Graphics
- **Inference Capability**: VERY LOW.

## Model Mapping

| Model | Path | Hardware Req | Local Run? |
| :--- | :--- | :--- | :--- |
| **SVG Drape** | Local | < 1GB RAM | YES |
| **Canvas Sound-Sync** | Local | < 1GB RAM | YES |
| **Llama 3 (Groq)** | API | N/A | YES |
| **Gemini Vision** | API | N/A | YES |
| **Wan2.1 (Real Video)** | Remote | > 16GB VRAM | NO |
| **MuseTalk (LipSync)** | Remote | > 12GB VRAM | NO |

### **Conclusion**
This project will use a **Split-Runtime Architecture**. UI and Simulation run on the i5-4210U. Real AI generation is offloaded to a **Modular GPU Worker** (e.g. Google Colab or a secondary GPU PC).
