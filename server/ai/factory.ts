import { GeminiAIProvider } from './geminiProvider';
import { MockAIProvider } from './mockProvider';
import { RealAIProvider } from './realAIProvider';
import {
  AIImageGenerator, 
  AIModelRecommender, 
  AIProductAnalyzer, 
  AIQualityChecker, 
  AIScriptGenerator, 
  AITTSProvider,
  AILipSyncProvider,
  AICapabilityChecker,
  AIVideoGenerator
} from './interfaces';

export class AIFactory {
  private static geminiProvider = new GeminiAIProvider();
  private static mockProvider = new MockAIProvider();
  private static realProvider = new RealAIProvider();

  static getProvider(mode: 'live' | 'mock' | 'real_ai' = 'live'): {
    analyzer: AIProductAnalyzer;
    recommender: AIModelRecommender;
    imageGen: AIImageGenerator;
    qualityChecker: AIQualityChecker;
    scriptGen: AIScriptGenerator;
    tts: AITTSProvider;
    lipSync: AILipSyncProvider;
    capabilities: AICapabilityChecker;
    videoGen: AIVideoGenerator;
  } {
    if (mode === 'real_ai') {
       const hasGemini = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
       const base = hasGemini ? this.geminiProvider : this.mockProvider;
       return {
          analyzer: base,
          recommender: base,
          imageGen: this.realProvider,
          qualityChecker: base,
          scriptGen: base,
          tts: base,
          lipSync: this.realProvider,
          capabilities: base,
          videoGen: this.realProvider
       };
    }

    const isLive = mode === 'live' && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
    const provider = isLive ? this.geminiProvider : this.mockProvider;

    return {
      analyzer: provider,
      recommender: provider,
      imageGen: provider,
      qualityChecker: provider,
      scriptGen: provider,
      tts: provider,
      lipSync: provider,
      capabilities: provider,
      videoGen: provider
    };
  }
}
