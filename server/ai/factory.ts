import { GeminiAIProvider } from './geminiProvider';
import { MockAIProvider } from './mockProvider';
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

  static getProvider(mode: 'live' | 'mock' = 'live'): {
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
