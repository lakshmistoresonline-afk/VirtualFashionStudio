# Architecture Target (Phase 2): Split-Runtime Modular Studio

```mermaid
graph TD
    A[React Studio UI] --> B[Express Controller]
    B --> C{AI Factory}
    
    C --> D[LOCAL Path: Simulation]
    C --> E[REMOTE Path: Real AI]
    
    D --> D1[SVG Garment Drape]
    D --> D2[Canvas Motion]
    D --> D3[Mouth Mesh Warp]
    
    E --> E1[GPU Worker API]
    E1 --> E2[CatVTON - Real TryOn]
    E1 --> E3[Wan2.1 - Real Motion]
    E1 --> E4[MuseTalk - Real LipSync]
```

## Key Updates
1.  **Security**: Secrets moved to `server/.env`.
2.  **State**: Backend now manages the job queue for Real AI jobs.
3.  **Persistence**: Intermediate assets (Real VTO images, Clips) stored on server or Firebase Storage.
