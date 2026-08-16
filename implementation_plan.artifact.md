# AI Fashion Reel Generator MVP Implementation Plan

Implement a simple, reliable MVP focusing on the One Product -> One Professional Reel workflow.

## Proposed Changes

### [UI Cleanup & Navigation]
#### [MODIFY] [App.tsx](file:///D:/ai-virtual-fashion-studio/src/App.tsx)
- Remove non-MVP tabs: `dashboard`, `batch`, `settings`, `library`.
- Simplify navigation to only show "Studio" (Creation) and "Gallery" (History).

#### [MODIFY] [Header.tsx](file:///D:/ai-virtual-fashion-studio/src/components/Header.tsx)
- Remove non-MVP links.

### [Product Upload & Analysis]
#### [MODIFY] [ProductUploader.tsx](file:///D:/ai-virtual-fashion-studio/src/components/ProductUploader.tsx)
- Add image quality check (resolution, basic blur warning).
- Add "Confirm Product Type" step after analysis.

#### [MODIFY] [AnalysisAndProfile.tsx](file:///D:/ai-virtual-fashion-studio/src/components/AnalysisAndProfile.tsx)
- Add "Occasion" and "Current Offer" fields.

### [AI Integration Enhancements]
#### [MODIFY] [geminiProvider.ts](file:///D:/ai-virtual-fashion-studio/server/ai/geminiProvider.ts)
- Update `analyzeProduct` prompt to detect shirting material vs garment more accurately.
- Update `generateBilingualScript` to include "Current Offer" and "Occasion".
- Enhance `generateFashionShots` to respect the "Occasion" for styling and environment.

#### [MODIFY] [interfaces.ts](file:///D:/ai-virtual-fashion-studio/server/ai/interfaces.ts)
- Add `occasion` and `offer` to `GenerateScriptInput` and `RecommendModelInput`.

#### [MODIFY] [types.ts](file:///D:/ai-virtual-fashion-studio/src/types.ts)
- Update `UserProductInfo` to include `occasion` and `currentOffer`.

### [Workflow Refinement]
#### [MODIFY] [App.tsx](file:///D:/ai-virtual-fashion-studio/src/App.tsx)
- Ensure the preview image is approved BEFORE video generation.
- Implement the "Approved -> Generate Video" sequence.

## Verification Plan

### Manual Verification
- Perform the "Onam shirting-material" test case:
  - Upload Krishna/peacock feather shirting fabric.
  - Verify detection as shirting material.
  - Select male model.
  - Check if generated shirt uses the fabric pattern.
  - Verify Malayalam script includes the "Onam Special" offer if provided.
  - Verify final 9:16 Reel has branding and subtitles.
