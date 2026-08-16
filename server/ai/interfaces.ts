import { 
  AIModelProfile, 
  FidelityReport, 
  ProductAnalysis, 
  ReelScript, 
  ShootEnvironment, 
  UserProductInfo, 
  VoiceConfig,
  FashionShot,
  PresentationMode,
  SpeakingStyle,
  SpeakerType,
  ScriptSegment,
  LipSyncQualityReport,
  ProviderCapabilities
} from '../../src/types';

export interface AnalyzeProductInput {
  imageBase64: string;
  mimeType: string;
  hintText?: string;
}

export interface AIProductAnalyzer {
  analyzeProduct(input: AnalyzeProductInput): Promise<ProductAnalysis>;
}

export interface RecommendModelInput {
  analysis: ProductAnalysis;
  userInfo?: UserProductInfo;
}

export interface AIModelRecommender {
  recommendModel(input: RecommendModelInput): Promise<{
    recommendedModel: AIModelProfile;
    recommendedEnvironment: ShootEnvironment;
    confidence: number;
    reasoning: string;
    alternativeModels: AIModelProfile[];
  }>;
}

export interface GenerateFashionShotsInput {
  productImageBase64: string;
  originalImage?: string;
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
  modelProfile: AIModelProfile;
  environment: ShootEnvironment;
  presentationMode?: PresentationMode;
  speakingStyle?: SpeakingStyle;
  count?: number;
}

export interface AIImageGenerator {
  generateFashionShots(input: GenerateFashionShotsInput): Promise<FashionShot[]>;
  regenerateSingleShot(input: GenerateFashionShotsInput & { shotIndex: number; shotType: string }): Promise<FashionShot>;
}

export interface FidelityCheckInput {
  originalImageBase64: string;
  generatedShots: FashionShot[];
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
}

export interface AIQualityChecker {
  checkProductFidelity(input: FidelityCheckInput): Promise<FidelityReport>;
}

export interface GenerateScriptInput {
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
  modelProfile: AIModelProfile;
  brandName: string;
  tagline: string;
  durationSec: number;
  environment: ShootEnvironment;
  presentationMode?: PresentationMode;
  speakingStyle?: SpeakingStyle;
  speakerType?: SpeakerType;
}

export interface AIScriptGenerator {
  generateBilingualScript(input: GenerateScriptInput): Promise<ReelScript>;
}

export interface GenerateSpeechInput {
  text: string;
  language: 'ml-IN' | 'en-IN' | string;
  voiceId: string;
  gender?: 'female' | 'male';
  speed: number;
  pitch: number;
  speakingStyle?: SpeakingStyle;
}

export interface AITTSProvider {
  generateSpeech(input: GenerateSpeechInput): Promise<{ 
    audioBase64?: string; 
    audioUrl?: string; 
    format: string;
    durationSec?: number;
    providerName: string;
    isMock: boolean;
  }>;
}

export interface GenerateTalkingVideoInput {
  modelProfile: AIModelProfile;
  productImageBase64: string;
  scriptSegment: ScriptSegment;
  audioInput?: {
    audioUrl?: string;
    audioBase64?: string;
    format?: string;
  };
  expression?: 'welcoming_smile' | 'neutral_professional' | 'festive_enthusiastic' | 'subtle_elegant';
  cameraFraming?: 'medium_close_up' | 'chest_up_eye_level' | 'three_quarter_profile';
  garmentAnalysis?: ProductAnalysis;
  environment?: ShootEnvironment;
  providerType?: 'GENUINE_AI' | 'SIMULATED';
}

export interface TalkingVideoResult {
  shot: FashionShot;
  videoUrl?: string;
  lipSyncReport: LipSyncQualityReport;
  providerName: string;
  providerType: 'REAL' | 'MOCK' | 'SIMULATED';
}

export interface AILipSyncProvider {
  generateTalkingShot(input: GenerateTalkingVideoInput): Promise<TalkingVideoResult>;
  validateLipSyncQuality(shot: FashionShot, audioUrl?: string): Promise<LipSyncQualityReport>;
}

export interface GenerateVideoInput {
  referenceImageBase64: string;
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
  modelProfile: AIModelProfile;
  environment: ShootEnvironment;
  motionType: 'walking' | 'turning' | 'pose_change' | 'close_up_detail';
  cameraMovement: 'tracking' | 'push_in' | 'static' | 'pan';
  durationSec: number;
}

export interface VideoGenerationResult {
  videoUrl: string;
  thumbnailUrl: string;
  durationSec: number;
  providerName: string;
  isMock: boolean;
  fidelityScore: number;
  qualityReport: {
    faceConsistency: 'GOOD' | 'NEEDS_REVIEW';
    garmentPreservation: 'GOOD' | 'NEEDS_REVIEW';
    movementRealism: 'GOOD' | 'NEEDS_REVIEW';
  };
}

export interface AIVideoGenerator {
  generateVideo(input: GenerateVideoInput): Promise<VideoGenerationResult>;
}

export interface AICapabilityChecker {
  getCapabilities(): Promise<ProviderCapabilities>;
}
