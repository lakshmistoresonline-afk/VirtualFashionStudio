# Pre-Integration Audit (Phase 2): Real AI Upgrade

## 1. Existing System State
- **Frontend**: React (Vite) Studio with 8-step creation workflow.
- **Backend**: Express server with in-memory DB and mock/Gemini providers.
- **AI Engine**: 
    - **Vision**: Client-side Gemini REST proxy.
    - **Scripting**: Client-side Groq/Gemini proxy.
    - **Try-On**: Client-side SVG simulation (GarmentDrapeCompositor).
    - **Video**: Canvas-based camera motion on static images.
    - **Talking**: Canvas-based mouth mesh warp.

## 2. Identified Security Issues
- **Requirement 22 Violation**: API keys (Gemini, Groq) are currently stored in browser `localStorage`. 
- **Action**: Migrate keys to server-side `.env` and proxy/inject them securely.

## 3. Existing Gaps (Real AI vs. Simulation)
- **VTO**: Currently 2D SVG overlay. Needs Real Diffusion-based Virtual Try-On (CatVTON/OpenTryOn).
- **Video**: Currently Ken Burns effect. Needs temporal consistency (Wan2.1).
- **Talking**: Currently procedural warp. Needs neural lip-sync (MuseTalk).

## 4. Hardware Limitations
- **Local machine**: i5-4210U, 8GB RAM, Integrated GPU. 
- **Constraint**: Cannot run inference for Wan2.1 or MuseTalk locally. 
- **Solution**: Implement "Remote GPU Worker" architecture.
