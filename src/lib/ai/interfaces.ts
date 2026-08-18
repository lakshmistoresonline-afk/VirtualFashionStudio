import {
  AIModelProfile,
  FashionShot,
  ProductAnalysis,
  ReelScript,
  ShootEnvironment,
  UserProductInfo,
  VideoGenerationResult
} from '../../types';

export interface VTOProvider {
  generateDrapedShots(
    productImage: string,
    model: AIModelProfile,
    analysis: ProductAnalysis,
    environment: ShootEnvironment,
    productName: string
  ): Promise<FashionShot[]>;
}

export interface TalkingModelProvider {
  generateTalkingVideo(
    baseVideo: string | FashionShot,
    audioUrl: string,
    script: string
  ): Promise<string>; // Returns video URL or data URI
}

export interface ScriptProvider {
  generateBilingualScript(input: any): Promise<ReelScript>;
}

export interface VisionProvider {
  analyzeProduct(imageBase64: string, hintText?: string): Promise<ProductAnalysis>;
}
