# License Audit (Phase 2): Real AI Components

| Component | Repository | Code License | Model License | Commercial Use | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MuseTalk** | TMElyralab | Apache 2.0 | Non-Commercial? | MARK AS UNKNOWN | **OPTIONAL ADAPTER** |
| **Wan2.1** | Wan-Video | Apache 2.0 | CC-BY-NC-SA 4.0 | NO (Research) | **OPTIONAL ADAPTER** |
| **CatVTON** | Ziyu-Wan | MIT | Non-Commercial | NO | **REFERENCE ONLY** |
| **OpenTryOn** | tryonlabs | Apache 2.0 | Restricted | MARK AS UNKNOWN | **REFERENCE ONLY** |
| **Mixtral/Llama** | Groq | Apache 2.0 | Mixed | YES (Free Tier) | **CORE SCRIPTING** |

### **Strategic Decision**
Because the "Real AI" models (Wan2.1, MuseTalk, CatVTON) have restrictive commercial terms (mostly research-only or non-commercial), they will be implemented as **Optional Remote Providers**. The **Simulation Engine** will remain the primary commercial-ready path for users without their own licensed model setup.
