# Free Tier Audit

## 1. Cloud Dependencies ($0 Strategy)
- **Google AI Studio**: Gemini 1.5 Flash (15 RPM, Free). Used for Vision analysis.
- **Groq Cloud**: Llama 3.3 (Generous Rate Limits, Free). Used for Malayalam/English scripting.
- **Firebase Hosting**: Spark Plan ($0). Static file hosting for SPA.

## 2. Local Dependencies ($0 Strategy)
- **Visuals**: `GarmentDrapeCompositor` (SVG based). Zero API calls.
- **Audio**: Web Speech API. Native to Windows/Mac/Android/iOS. Zero cost.
- **Encoding**: Browser Canvas Recording. Zero server CPU usage.

## 3. The "Talking Model" Paradox
Real AI Talking Models (HeyGen, D-ID) are paid. To keep the project free:
- **MuseTalk** will be the target for users with their own GPU.
- **Simulated Lip-Sync** (Canvas-based mesh warp or simple overlay) will be the "Free" alternative for the web-app.
