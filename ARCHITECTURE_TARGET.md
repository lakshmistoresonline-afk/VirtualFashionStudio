# Target Architecture: Modular Fashion Studio

The existing monolithic controller will be refactored into a **Provider-Based Architecture**.

```mermaid
graph TD
    A[UI Controller] --> B{AI Factory}
    B --> C[VTO Provider]
    B --> D[Script Provider]
    B --> E[Talking Provider]
    
    C --> C1[SVG Simulation - DEFAULT]
    C --> C2[Wan2.1 Adapter - OPTIONAL]
    
    D --> D1[Groq Llama 3 - DEFAULT]
    D --> D2[Gemini Flash - BACKUP]
    
    E --> E1[Canvas Sound-Sync - DEFAULT]
    E --> E2[MuseTalk Adapter - OPTIONAL]
```

## Key Interfaces
- `generateTryOn(product, model)`
- `generateTalkingShot(video, audio)`
- `exportMP4(canvasStream)`
