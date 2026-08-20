# Phase 7C: Lip-Sync License Matrix (Updated)

This matrix evaluates candidates for the final commercial fashion presenter release.

| Candidate | Code License | Weight License | Commercial Use | Self Host | Redistribution | Restrictions | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **LatentSync** | Apache 2.0 | OpenRAIL++ | **YES** | YES | YES | Ethical use only | **PRODUCTION READY (High-Fi)** |
| **MuseTalk** | MIT | MIT | **YES** | YES | YES | Standard MIT | **PRODUCTION READY (Fast)** |
| **AniPortrait** | Apache 2.0 | Apache 2.0 | **YES** | YES | YES | None | **COMMERCIAL READY** |
| **SadTalker** | Apache 2.0 | Apache 2.0 | **YES** | YES | YES | None | **COMMERCIAL READY** |
| **LivePortrait**| MIT | Restricted | **NO** | YES | NO | Non-Commercial | **REJECTED** |

## Findings
Authoritative audit of the **TMElyralab/MuseTalk** repository confirms it is **MIT Licensed** for both code and weights, permitting commercial use. The previous "Research Only" classification was an error in the Phase 6 report.

For Phase 7C, we will implement **LatentSync** as the primary high-resolution engine for fashion advertisements, as it provides superior 512x512 facial texture preservation compared to MuseTalk's 256x256 internal resolution.
