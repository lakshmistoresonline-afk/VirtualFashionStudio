export type TargetGender = 'women' | 'men' | 'girls' | 'boys' | 'baby' | 'unisex' | 'product_only';

export type AgeGroup = 'young_adult' | 'adult' | 'mature' | 'child_3_5' | 'preteen_6_9' | 'preteen_10_13' | 'teen_14_17' | 'baby_0_1' | 'baby_1_2';

export type ShootEnvironment = 
  | 'premium_studio'
  | 'traditional_kerala'
  | 'wedding_temple'
  | 'festival_onam'
  | 'modern_fashion'
  | 'casual_lifestyle'
  | 'boutique_interior'
  | 'outdoor_nature'
  | 'luxury_palace'
  | 'minimal_studio';

export type ShotType = 'full_body' | 'three_quarter' | 'movement' | 'close_up' | 'final_pose' | 'portrait' | 'landscape';

export type OccasionType = 'None' | 'Onam' | 'Vishu' | 'Wedding' | 'Festival' | 'New Arrival' | 'Sale';

export interface ProductAnalysis {
  category: string;
  subcategory: string;
  targetGender: TargetGender;
  ageGroup: AgeGroup;
  primaryColor: string;
  secondaryColors: string[];
  fabricAppearance: string;
  pattern: string;
  printOrWeave: string;
  embroidery: string;
  border: string;
  motifs: string[];
  garmentStructure: string;
  style: string;
  occasion: string;
  detectedOccasion?: OccasionType;
  confidence: number;
  extractedDetails: string[];
  isShirtingMaterial?: boolean;
  shirtingType?: 'plain' | 'printed' | 'checks' | 'stripes' | 'textured';
  fabricSpecs?: {
    gsm?: string;
    count?: string;
    materialBlend?: string;
    suggestedMeters?: string;
    recommendedCollar?: string;
    pairingSuggestion?: string;
  };
}

export interface UserProductInfo {
  productName: string;
  category: string;
  subcategory: string;
  gender: TargetGender;
  ageGroup: AgeGroup;
  color: string;
  fabric: string;
  brand: string;
  price?: number;
  mrp?: number;
  currentOffer?: string;
  sizes: string[];
  description: string;
  specialFeatures: string[];
  occasion: OccasionType;
  sku: string;
  inStock: boolean;
  isShirtingMaterial?: boolean;
  shirtingType?: 'plain' | 'printed' | 'checks' | 'stripes' | 'textured';
  cutLength?: string;
  gsmOrCount?: string;
}

export interface AIModelProfile {
  id: string;
  code: string; // e.g. 'W01', 'M02', 'G01'
  name: string;
  gender: TargetGender;
  ageGroup: AgeGroup;
  ethnicity: string;
  appearanceStyle: 'traditional_south_indian' | 'modern_indian' | 'kerala_authentic' | 'contemporary_chic' | 'festive_royal' | 'minimalist';
  description: string;
  avatarUrl: string;
  recommendedFor: string[];
  recommendedGarments?: string[];
}

export type PresentationMode = 'voice_over' | 'talking_model' | 'hybrid';

export type SpeakingStyle = 
  | 'professional'
  | 'friendly'
  | 'premium'
  | 'festive'
  | 'energetic'
  | 'traditional'
  | 'elegant'
  | 'natural'
  | 'luxury'
  | 'high_energy';

export type SpeakerType = 'female_model' | 'male_model' | 'voice_over';

export type ScriptSegmentType = 'TALKING_MODEL' | 'VOICE_OVER' | 'PRODUCT_TEXT' | 'CTA';

export interface ScriptSegment {
  segmentId: string;
  text: string;
  textEn?: string;
  language: 'ml-IN' | 'en-IN' | string;
  duration: number; // e.g. 4 seconds
  type: ScriptSegmentType;
  speaker: string; // e.g. 'AI Model (Kavya)' or 'Narrator (Kalyani)'
  shotId?: string;
  shotIndex?: number;
  startTime: number;
  endTime: number;
}

export interface TalkingModelData {
  isSpeaking: boolean;
  speakerName: string;
  speakerRole: 'PRIMARY_MODEL' | 'VOICE_NARRATOR';
  lipSyncScore: number;
  faceConsistencyScore: number;
  speechQualityScore: number;
  scriptSegmentId?: string;
  expression: 'welcoming_smile' | 'neutral_professional' | 'festive_enthusiastic' | 'subtle_elegant';
  cameraFraming: 'medium_close_up' | 'chest_up_eye_level' | 'three_quarter_profile';
  providerType: 'REAL' | 'MOCK' | 'SIMULATED';
  providerName: string;
}

export interface FashionShot {
  id: string;
  shotType: ShotType;
  title: string;
  cameraMovement: 'slow_push' | 'slow_pull' | 'gentle_tracking' | 'natural_turn' | 'macro_pan' | 'static_hero';
  imageUrl: string;
  videoClipUrl?: string;
  durationSec: number;
  fidelityScore: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  promptUsed?: string;
  isTalkingShot?: boolean;
  talkingModelData?: TalkingModelData;
}

export interface FidelityReport {
  overallScore: number; // 0-100
  colorAccuracy: number;
  borderPreservation: number;
  patternFidelity: number;
  garmentStructure: number;
  passed: boolean;
  notes: string[];
}

export interface SubtitleSegment {
  id: string;
  startTime: number;
  endTime: number;
  textMl: string;
  textEn: string;
}

export interface ReelScript {
  malayalamTitle: string;
  malayalamScript: string;
  malayalamCaption: string;
  malayalamHashtags: string[];
  englishTitle: string;
  englishScript: string;
  englishCaption: string;
  englishHashtags: string[];
  durationSec: number;
  hookLine: string;
  callToAction: string;
  subtitles: SubtitleSegment[];
  presentationMode: PresentationMode;
  speakingStyle: SpeakingStyle;
  speakerType: SpeakerType;
  scriptSegments: ScriptSegment[];
  isApproved?: boolean;
  approvedAt?: string;
  approvedScriptVersion?: number;
}

export interface VoiceConfig {
  language: 'ml-IN' | 'en-IN';
  voiceId: string;
  voiceName: string;
  gender: 'female' | 'male';
  speed: number;
  pitch: number;
  audioUrl?: string;
}

export interface ShowroomBranch {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  isFlagship?: boolean;
}

export type KeralaCampaignMode = 
  | 'standard'
  | 'onam_utsavam'
  | 'souparnika_bridal'
  | 'vishu_kaineettam'
  | 'mens_shirting_fest'
  | 'ramzan_eid'
  | 'christmas_newyear';

export interface BrandProfile {
  id: string;
  name: string;
  logoUrl?: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  disclaimer: string;
  showDisclaimer: boolean;
  brandTier?: 'enterprise_retailer' | 'boutique' | 'designer_studio';
  showrooms?: ShowroomBranch[];
  selectedShowroomId?: string;
  verifiedBadgeText?: string;
  hasSilkMarkBadge?: boolean;
  hasHandloomBadge?: boolean;
  campaignMode?: KeralaCampaignMode;
}

export interface ReelTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  previewThumbnail: string;
  badge: string;
  recommendedDuration: number;
  durationSec?: number;
  aspectRatio?: string;
  pacing?: 'fast' | 'moderate' | 'cinematic' | string;
  shotSequence?: { title: string; cameraMovement: string }[];
  themeColor: string;
  transitionEffect: 'crossfade' | 'zoom_pan' | 'cinematic_blur' | 'slide_up';
  defaultMusicMood: string;
  ctaText: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  genre: 'traditional_kerala' | 'temple_classical' | 'luxury_acoustic' | 'festival_energetic' | 'ambient_calm';
  mood: string;
  durationSec: number;
  bpm: number;
  audioUrl: string;
  license: string;
}

export interface ProductItem {
  id: string;
  name: string;
  originalImage: string;
  processedImage?: string;
  referenceImages?: string[];
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
  createdAt: string;
  reelsCount: number;
  status: 'analyzed' | 'in_progress' | 'completed';
}

export type JobStatus = 
  | 'idle'
  | 'analyzing'
  | 'model_selection'
  | 'image_generation'
  | 'fidelity_check'
  | 'talking_model'
  | 'script_generation'
  | 'video_generation'
  | 'voice_synthesis'
  | 'assembling'
  | 'completed'
  | 'failed'
  | 'QUEUED'
  | 'ANALYZING'
  | 'GENERATING_MODEL'
  | 'GENERATING_IMAGES'
  | 'VALIDATING_PRODUCT'
  | 'GENERATING_VIDEO'
  | 'GENERATING_SCRIPT'
  | 'GENERATING_VOICE'
  | 'GENERATING_SUBTITLES'
  | 'ASSEMBLING'
  | 'QUALITY_CHECK'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface GenerationJob {
  id: string;
  reelId?: string;
  productId: string;
  productName: string;
  status: JobStatus;
  step?: string;
  message?: string;
  progress?: number;
  progressPercent?: number;
  currentStepMessage?: string;
  stepsCompleted?: string[];
  reelResult?: ReelProject;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LipSyncQualityReport {
  overallScore: number;
  lipSyncScore: number;
  faceConsistencyScore: number;
  speechQualityScore: number;
  audioSyncDeltaMs: number;
  providerMode: 'REAL' | 'MOCK' | 'PROVIDER_DEPENDENT';
  providerName: string;
  passed: boolean;
  checks: {
    mouthMovement: boolean;
    audioSync: boolean;
    identityPreserved: boolean;
    garmentPreserved: boolean;
    naturalBlinking: boolean;
    noTeethArtifacts: boolean;
  };
  details: string[];
}

export interface ProviderCapabilities {
  textGeneration: boolean;
  imageGeneration: boolean;
  videoGeneration: boolean;
  tts: boolean;
  talkingVideo: boolean;
  lipSync: boolean;
  referencePreservation: boolean;
  languagesSupported: string[];
  activeTtsProvider: string;
  activeLipSyncProvider: string;
  isRealLipSyncAvailable: boolean;
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

export interface ReelProject {
  id: string;
  productId: string;
  productName: string;
  version: number;
  originalImage: string;
  modelProfile: AIModelProfile;
  environment: ShootEnvironment;
  presentationMode?: PresentationMode;
  speakingStyle?: SpeakingStyle;
  speakerType?: SpeakerType;
  shots: FashionShot[];
  videoResult?: VideoGenerationResult;
  fidelity: FidelityReport;
  script: ReelScript;
  voice: VoiceConfig;
  template: ReelTemplate;
  brand: BrandProfile;
  music: MusicTrack;
  musicVolume: number;
  voiceVolume: number;
  subtitleMode: 'ml_only' | 'en_only' | 'bilingual' | 'none';
  durationSec: number;
  userInfo?: UserProductInfo;
  status: 'draft' | 'processing' | 'ready' | 'failed';
  outputVideoUrl?: string;
  thumbnailUrl?: string;
  approvalStatus?: 'approved' | 'pending' | 'rejected' | 'revision_requested';
  approvalNotes?: string;
  approvedAt?: string;
  lipSyncQuality?: LipSyncQualityReport;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSettings {
  aiMode: 'live' | 'mock';
  textProvider: string;
  imageProvider: string;
  videoProvider: string;
  ttsProvider: string;
  fidelityThreshold: number; // default 85
  defaultLanguage: 'ml-IN' | 'en-IN';
  defaultDuration: number;
  maxUploadSizeMb: number;
  autoQualityCheck: boolean;
}
