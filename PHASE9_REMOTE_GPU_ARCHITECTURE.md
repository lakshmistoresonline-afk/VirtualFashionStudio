# Phase 9: Remote GPU Deployment Architecture

This document describes the decoupled architecture used to run heavy AI models on a remote GPU machine while maintaining a responsive local user experience.

## 1. Network Flow
```mermaid
graph TD
    A[React Studio UI] --> B[Local Express Server]
    B --> C[Remote GPU Worker (HTTPS)]
    C --> D[Job Queue]
    D --> E[Inference Engine]
    E --> F[Artifact Storage]
    F --> C
    C --> B
    B --> A
```

## 2. Decoupling Features
- **Asynchronous Jobs**: The Local Server submits a job and polls for completion, preventing HTTP timeouts for long video generations.
- **Artifact Management**: Generated videos and images are hosted by the remote worker and fetched by the local server.
- **Security**: Authentication tokens and API URLs are managed strictly on the server-side `.env`.

## 3. Worker Reliability
- **Sequential Loading**: Ensures VRAM is never overloaded by swapping models between VTO, Motion, and LipSync stages.
- **Heartbeat Monitoring**: The local server tracks the `lastSeen` status of the remote worker to provide accurate UI feedback.
