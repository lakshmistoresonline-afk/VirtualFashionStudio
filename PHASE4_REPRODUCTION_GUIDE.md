# Phase 4 Reproduction Guide

To reproduce the Forensic Audit results and confirm the Mock status:

## 1. Inspect the GPU Worker
1. Open `gpu-worker/pipeline/worker.py`.
2. Observe the `generate_vto`, `generate_motion`, and `generate_lipsync` functions.
3. Verification: Note that they use `time.sleep()` and return hardcoded strings/input images.

## 2. Verify Security
1. Open the browser Developer Tools (F12) while running the app.
2. Go to **Application** -> **Local Storage**.
3. Verification: Note that `gemini_api_key` and `groq_api_key` are still readable in the browser.

## 3. Run a Real AI Generation
1. Start the server: `npm run dev`.
2. Start the worker: `python gpu-worker/pipeline/worker.py`.
3. In the UI, select **Generation Mode: Real AI**.
4. Upload a photo and click **Auto-Generate**.
5. Verification: Note that the "Fashion Shot" produced is identical to your uploaded photo (proving no VTO occurred) and the "Talking Video" is the static `talking_demo.mp4`.
