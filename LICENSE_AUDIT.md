# License Audit: Free-First AI Integration

| Component | Provider | Code License | Model License | Commercial Use | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gemini API** | Google | BSD-3 | Custom (Free Tier) | Yes (with limits) | **MANDATORY** |
| **Groq API** | Groq | Apache 2.0 | Meta Llama 3.1/3.3 | Yes (Free Tier) | **MANDATORY** |
| **MuseTalk** | TMElyralab | Apache 2.0 | Non-Commercial? | **REVIEW REQ** | **OPTIONAL ADAPTER** |
| **Wan2.1** | Wan-Video | Apache 2.0 | Creative Commons | **YES** | **OPTIONAL ADAPTER** |
| **CatVTON** | Ziyu-Wan | MIT | Non-Commercial | **NO** | **REFERENCE ONLY** |
| **MediaRecorder** | Browser | Native | N/A | Yes | **CORE EXPORT** |

### **Strategic Decision**
Because several "Real AI" models (like MuseTalk) have restrictive commercial terms for their weights, they will be implemented as **Optional Providers**. The **Simulation Engine** (MIT/Apache compatible) will remain the core production-safe path.
