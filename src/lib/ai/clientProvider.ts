import {
  ProductAnalysis,
  ReelScript,
  AIModelProfile,
  ShootEnvironment,
  UserProductInfo,
  FashionShot,
  FidelityReport,
  LipSyncQualityReport,
  ProviderCapabilities,
  VideoGenerationResult
} from '../../types';
import { PROMPT_VERSIONS } from '../../../server/ai/prompts';

/**
 * Dual-Path AI Provider (Phase 9C - Stability Patch)
 * 1. Primary: Tries to call the local Node.js server proxy (secure).
 * 2. Fallback: If on a static host (like Firebase web.app), performs direct client-side calls.
 */
export class ClientAIProvider {
  private mode: 'live' | 'mock' = 'live';

  constructor(mode: 'live' | 'mock' = 'live') {
    this.mode = mode;
  }

  private getStoredKey(provider: 'gemini' | 'groq'): string | null {
    const key = localStorage.getItem(provider === 'gemini' ? 'gemini_api_key' : 'groq_api_key');
    return key ? key.trim() : null;
  }

  private async fetchApi(endpoint: string, body: any): Promise<any> {
    try {
      const response = await fetch(`/api/ai/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const text = await response.text();

      // If we got HTML back, we are on a static host (Firebase) where the Node server isn't running.
      if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
        console.info(`[Client AI] Static host detected. Falling back to direct client-side call for: ${endpoint}`);
        return this.handleDirectClientCall(endpoint, body);
      }

      const result = JSON.parse(text);
      return result.success ? result.data : result;
    } catch (err) {
      console.warn(`[Client AI] Server proxy unreachable, trying direct client call:`, err);
      return this.handleDirectClientCall(endpoint, body);
    }
  }

  /**
   * Performs direct browser -> Google/Groq calls for static deployments
   */
  private async handleDirectClientCall(endpoint: string, body: any): Promise<any> {
    const geminiKey = this.getStoredKey('gemini');
    const groqKey = this.getStoredKey('groq');

    if (!geminiKey) throw new Error('API Key missing. Please provide your Gemini API key in Step 1.');

    if (endpoint === 'analyze') {
      return this.directGeminiAnalyze(geminiKey, body.imageBase64, body.hintText);
    }

    if (endpoint === 'script') {
       if (!groqKey) return this.directGeminiScript(geminiKey, body);
       return this.directGroqScript(groqKey, body);
    }

    if (endpoint === 'fidelity') {
       return this.directGeminiFidelity(geminiKey, body);
    }

    throw new Error(`Client-side execution not yet supported for: ${endpoint}`);
  }

  private async directGeminiAnalyze(key: string, imageBase64: string, hintText?: string): Promise<any> {
    // Using v1 API and ensuring model name is standard
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
    const payload = {
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split('base64,')[1] || imageBase64 } },
          { text: PROMPT_VERSIONS.PRODUCT_ANALYSIS_V1 + (hintText ? `\nHint: ${hintText}` : '') }
        ]
      }],
      generationConfig: {
        response_mime_type: "application/json"
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
       const errData = await res.json();
       throw new Error(errData.error?.message || `Gemini API Error: ${res.status}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini returned empty response');

    return JSON.parse(text.trim());
  }

  private async directGeminiFidelity(key: string, input: any): Promise<any> {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
    const payload = {
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: input.originalImageBase64.split('base64,')[1] || input.originalImageBase64 } },
          { text: PROMPT_VERSIONS.PRODUCT_FIDELITY_CHECK_V1 }
        ]
      }],
      generationConfig: {
        response_mime_type: "application/json"
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text || '{}');
  }

  private async directGroqScript(key: string, input: any): Promise<any> {
    const prompt = `${PROMPT_VERSIONS.MALAYALAM_SCRIPT_V1}\nPRODUCT: ${input.analysis?.category}\nCOLOR: ${input.analysis?.primaryColor}`;
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      })
    });
    const data = await res.json();
    return JSON.parse(data.choices?.[0]?.message?.content || '{}');
  }

  private async directGeminiScript(key: string, input: any): Promise<any> {
    const prompt = `${PROMPT_VERSIONS.MALAYALAM_SCRIPT_V1}\nPRODUCT: ${input.analysis?.category}`;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });
    const data = await res.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || '{}');
  }

  async analyzeProduct(imageBase64: string, hintText?: string): Promise<ProductAnalysis> {
    return this.fetchApi('analyze', { imageBase64, hintText });
  }

  async generateDrapedShots(
    productImage: string,
    model: AIModelProfile,
    analysis: ProductAnalysis,
    environment: ShootEnvironment,
    productName: string
  ): Promise<FashionShot[]> {
    return this.fetchApi('vto', { productImage, model, analysis, environment, productName });
  }

  async generateBilingualScript(input: any): Promise<ReelScript> {
    return this.fetchApi('script', input);
  }

  async checkProductFidelity(input: any): Promise<FidelityReport> {
    return this.fetchApi('fidelity', input);
  }

  async generateVideo(input: any): Promise<VideoGenerationResult> {
    return this.fetchApi('video', input);
  }

  getCapabilities(): ProviderCapabilities {
    return {
      textGeneration: true,
      imageGeneration: true,
      videoGeneration: true,
      tts: true,
      talkingVideo: true,
      lipSync: true,
      referencePreservation: true,
      languagesSupported: ['ml-IN', 'en-IN'],
      activeTtsProvider: 'Browser Native / Server Hybrid',
      activeLipSyncProvider: 'Integrated / MuseTalk',
      isRealLipSyncAvailable: true
    };
  }
}
