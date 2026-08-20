# Phase 7D: Fidelity Forensic Report

This document audits the methodology used to calculate the reported 97.42% fidelity.

## 1. Metric Methodology
- **Metric**: Root Mean Square Error (RMSE) inverse.
- **Normalization**: Pixel values (0-255).
- **Masking**: Spatial torso mask applied during calculation to focus on the garment area.
- **Formula**: `100 - (RMSE / 2.55)`

## 2. Forensic Verification
- **Input**: Original Product Image.
- **Result**: Neural/Simulated Draped Image.
- **Audit Result**: The fidelity score is now **calculated in real-time** per request. It is no longer a hardcoded constant in the frontend or worker.

## 3. Accuracy Disclaimer
The fidelity score represents **Visual Color & Texture Preservation** at the pixel level. It is an engineering quality gate used to decide if a generation should be automatically retried.
