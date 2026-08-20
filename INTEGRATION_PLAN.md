# Integration Plan (Phase 2): Real AI Pipeline

## Phase 1: Security & Provider Prep
- [ ] Migrate `localStorage` keys to `server/.env`.
- [ ] Refactor `ClientAIProvider` to use server-side config.
- [ ] Implement `RealAIProvider` interface.

## Phase 2: Real Virtual Try-On (VTO)
- [ ] Implement `CatVTON` / `OpenTryOn` adapter in GPU worker.
- [ ] Connect Studio "Try On" button to Real VTO when mode is "Real AI".
- [ ] Implement Saree-specific pose preprocessing (masking).

## Phase 3: Fashion Movement (Wan2.1)
- [ ] Implement `Wan21` adapter in GPU worker.
- [ ] Create short scene generation (3s clips).
- [ ] Cache generated clips to prevent redundant GPU calls.

## Phase 4: Talking Presenter (MuseTalk)
- [ ] Implement `MuseTalk` adapter.
- [ ] Connect Dressed Video + TTS Audio -> LipSynced Video.
- [ ] Preserve garment and background during lip-sync.

## Phase 5: Pipeline & QA
- [ ] Implement Fidelity Scoring (Vision Comparison).
- [ ] Implement "Retry Stage" logic.
- [ ] Full end-to-end test with Kanchipuram Saree.
