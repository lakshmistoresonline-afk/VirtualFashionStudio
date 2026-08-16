# Gap Analysis - AI Fashion Reel Generator MVP

## 1. Existing Strengths
- **Workflow**: A multi-step studio (Studio Step 1-4) is already implemented.
- **Analysis**: Gemini-based product analysis is present.
- **Fidelity**: `GarmentDrapeCompositor` uses SVG patterns for high-fidelity fabric representation, which is excellent for the "Shirting Material" requirement.
- **Bilingual Support**: Malayalam and English script generation is already supported.
- **Model Recommendation**: Logic for recommending models based on category and gender is in place.

## 2. Identified Gaps
- **Product Photo Quality Check**: No pre-generation check for blur, resolution, or lighting as required by Section 5.
- **Offer Feature**: The "Current Active Offer" field (Section 19) is not explicitly implemented in the UI or integrated into the script generation pipeline.
- **Occasion Integration**: While "Occasion" is mentioned, it needs to be a primary UI choice that influences the script and styling more directly (Section 20).
- **Non-MVP Features**: The UI contains several "DO NOT implement" features like Batch Generation, Analytics, and Multi-store management which should be removed or hidden.
- **Video Generation**: Current "video" is a composition of 5 still shots with panning. While higher fidelity than a single image, it doesn't yet leverage "actual AI video generation" (e.g., Veo or similar) as preferred in Section 12.
- **Lip-Sync**: Currently simulated/mocked. Needs to be clearly labeled or toggled based on real provider capability (Section 18).

## 3. Required Modifications
- **UI Cleanup**: Remove "Batch", "Dashboard", "Admin" tabs from the main navigation.
- **Script Generation**: Update prompts to include `currentOffer` and `occasion`.
- **Product Uploader**: Add a basic validation step for image quality.
- **Garment Analysis**: Ensure specific detection of "Krishna and peacock-feather" style motifs for the critical Onam test case.
