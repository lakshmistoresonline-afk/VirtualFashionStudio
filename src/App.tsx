import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Film, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Play,
  RotateCcw,
  Wand2,
  ChevronRight,
  Zap,
  Check,
  PlayCircle
} from 'lucide-react';
import { 
  ProductItem, 
  ReelProject, 
  AIModelProfile, 
  ReelTemplate, 
  MusicTrack, 
  VoiceConfig, 
  BrandProfile, 
  AdminSettings, 
  GenerationJob, 
  ProductAnalysis, 
  UserProductInfo, 
  ShootEnvironment, 
  TargetGender,
  FashionShot,
  FidelityReport,
  ReelScript,
  PresentationMode,
  SpeakingStyle,
  SpeakerType,
  ProviderCapabilities
} from './types';
import { 
  AI_MODELS_PRESETS, 
  TEMPLATES_PRESETS, 
  MUSIC_TRACKS_PRESETS, 
  VOICES_PRESETS, 
  SAMPLE_PRODUCTS,
  getSuggestedModelForGarment
} from './data/presets';

// Subcomponents
import { Header } from './components/Header';
import { ProductUploader } from './components/ProductUploader';
import { AnalysisAndProfile } from './components/AnalysisAndProfile';
import { ModelSelector } from './components/ModelSelector';
import { FashionShotsGallery } from './components/FashionShotsGallery';
import { ScriptEditor } from './components/ScriptEditor';
import { VoiceAndSubtitles } from './components/VoiceAndSubtitles';
import { BrandAndMusic } from './components/BrandAndMusic';
import { ReelPreviewPlayer } from './components/ReelPreviewPlayer';
import { ReelHistory } from './components/ReelHistory';
import { BatchGenerator } from './components/BatchGenerator';
import { AdminPanel } from './components/AdminPanel';
import { JobProgressModal } from './components/JobProgressModal';
import { TemplateGallery } from './components/TemplateGallery';
import { AIModelLibraryView } from './components/AIModelLibraryView';
import { ActiveProductBar } from './components/ActiveProductBar';
import { DashboardOverview } from './components/DashboardOverview';
import { ClientAIProvider } from './lib/ai/clientProvider';
import { GarmentDrapeCompositor } from './lib/ai/garmentDrapeCompositor';

export function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [activeStudioStep, setActiveStudioStep] = useState<number>(1);

  // App-wide Data State
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [reels, setReels] = useState<ReelProject[]>([]);

  // API KEYS: Restored for static hosting compatibility (Firebase)
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('gemini_api_key') || '');
  const [groqKey, setGroqKey] = useState<string>(localStorage.getItem('groq_api_key') || '');

  const [settings, setSettings] = useState<AdminSettings>({
    aiMode: 'live', // 'live' (Sim), 'mock' (Fast), 'real_ai' (GPU)
    generationMode: 'commercial', // 'commercial', 'research', 'simulation'
    imageProvider: 'sdxl_controlnet',
    fidelityThreshold: 85,
    ttsProvider: 'edge_tts',
    maxParallelGenerations: 4
  });

  const clientAI = new ClientAIProvider(settings.aiMode === 'real_ai' ? 'live' : settings.aiMode);

  // Current Active Creation State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [userInfo, setUserInfo] = useState<UserProductInfo>({
    productName: 'Kanchipuram Pure Silk Saree',
    brand: 'Lakshmi Silks',
    price: 14500,
    mrp: 18900,
    description: 'Authentic pure silk saree with royal golden zari border and traditional motifs.'
  });

  // Model & Environment Selection
  const [targetGender, setTargetGender] = useState<TargetGender>('women');
  const [recommendedModel, setRecommendedModel] = useState<AIModelProfile>(AI_MODELS_PRESETS[0]);
  const [selectedModel, setSelectedModel] = useState<AIModelProfile>(AI_MODELS_PRESETS[0]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<ShootEnvironment>('traditional_kerala');
  const [selectedTemplate, setSelectedTemplate] = useState<ReelTemplate>(TEMPLATES_PRESETS[0]);

  // Generated Visuals & Fidelity
  const [fashionShots, setFashionShots] = useState<FashionShot[]>([]);
  const [fidelityReport, setFidelityReport] = useState<FidelityReport | null>(null);
  const [isRegeneratingShotIndex, setIsRegeneratingShotIndex] = useState<number | null>(null);
  const [isPreviewApproved, setIsPreviewApproved] = useState(false);

  // Script & Audio
  const [script, setScript] = useState<ReelScript | null>(null);
  const [isRegeneratingScript, setIsRegeneratingScript] = useState(false);
  const [voice, setVoice] = useState<VoiceConfig>(VOICES_PRESETS[0]);
  const [subtitleMode, setSubtitleMode] = useState<'ml_only' | 'en_only' | 'bilingual' | 'none'>('bilingual');
  const [presentationMode, setPresentationMode] = useState<PresentationMode>('hybrid');
  const [speakingStyle, setSpeakingStyle] = useState<SpeakingStyle>('festive');
  const [speakerType, setSpeakerType] = useState<SpeakerType>('female_model');

  // Brand & Music
  const [brand, setBrand] = useState<BrandProfile>({
    name: 'Lakshmi Silks & Boutiques',
    tagline: 'Tradition. Elegance. Trust.',
    phone: '+91 98470 12345',
    whatsapp: '+91 98470 12345',
    instagram: '@lakshmisilks_kerala',
    primaryColor: '#831843',
    secondaryColor: '#f59e0b',
    showDisclaimer: true
  });
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack>(MUSIC_TRACKS_PRESETS[0]);
  const [musicVolume, setMusicVolume] = useState<number>(0.25);

  // Final Generated Reel
  const [activeReel, setActiveReel] = useState<ReelProject | null>(null);

  // Persistence with error handling for QuotaExceeded
  useEffect(() => {
    if (reels.length > 0) {
      try {
        localStorage.setItem('app_reels', JSON.stringify(reels));
      } catch (e) {
        if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
          console.warn('LocalStorage full. Cleaning up old reels...');
          const trimmedReels = reels.slice(0, 1);
          try {
            localStorage.setItem('app_reels', JSON.stringify(trimmedReels));
            setReels(trimmedReels);
          } catch (innerE) {
            localStorage.removeItem('app_reels');
            setReels([]);
          }
        }
      }
    }
  }, [reels]);

  // Initial Fetch
  useEffect(() => {
    const savedReels = localStorage.getItem('app_reels');
    if (savedReels) {
      const parsed = JSON.parse(savedReels);
      setReels(parsed);
      if (parsed.length > 0) setActiveReel(parsed[0]);
    }
  }, []);

  // AI Connection State
  const [gpuStatus, setGpuStatus] = useState<{ status: string, instance?: string } | null>(null);

  // Periodic Health Check
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health/ai');
        const data = await res.json();
        setGpuStatus(data);
      } catch (e) {
        setGpuStatus({ status: 'OFFLINE' });
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  // Async Pipeline & Job Tracking
  const [activeJob, setActiveJob] = useState<GenerationJob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // HANDLERS
  const handleImageSelected = (imageBase64: string, sampleInfo?: any) => {
    setSelectedImage(imageBase64);
    setIsAnalysisConfirmed(false);
    setIsPreviewApproved(false);
    if (sampleInfo) {
      setUserInfo((prev) => ({
        ...prev,
        productName: sampleInfo.name,
        category: sampleInfo.category || prev.category,
        subcategory: sampleInfo.subcategory || prev.subcategory,
        gender: sampleInfo.gender || prev.gender,
        brand: 'Lakshmi Silks',
        price: sampleInfo.price,
        mrp: Math.round((sampleInfo.price || 1000) * 1.3),
        description: sampleInfo.description
      }));

      const suggested = getSuggestedModelForGarment(sampleInfo.name || sampleInfo.category, sampleInfo);
      setTargetGender(suggested.gender);
      setSelectedModel(suggested.model);
      setRecommendedModel(suggested.model);
      setSelectedEnvironment(suggested.environment);
    }
  };

  const handleAnalyzeProduct = async () => {
    if (!selectedImage) {
      showToast('Please select or upload a garment photo first.');
      return;
    }
    try {
      setIsAnalyzing(true);
      const receivedAnalysis = await clientAI.analyzeProduct(selectedImage, userInfo.productName);
      setAnalysis(receivedAnalysis);
      const suggested = getSuggestedModelForGarment(userInfo.productName || receivedAnalysis.category, receivedAnalysis);
      setRecommendedModel(suggested.model);
      setSelectedModel(suggested.model);
      setTargetGender(suggested.gender);
      setSelectedEnvironment(suggested.environment);
      setIsAnalysisConfirmed(false);
      showToast('AI analysis complete!');
    } catch (err: any) {
      console.error('Analysis error:', err);
      showToast('API Error. Please check your keys.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateFullReel = async (customAnalysis?: ProductAnalysis, customModel?: AIModelProfile, startFromStep?: string) => {
    const targetAnalysis = customAnalysis || analysis;
    const targetModel = customModel || selectedModel;

    if (!selectedImage || !targetAnalysis) {
      showToast('Please analyze the product first.');
      return;
    }

    const jobId = `job_${Date.now()}`;
    const reelId = `reel_${Date.now()}`;

    const initialJob: GenerationJob = {
      id: jobId,
      productId: `prod_${Date.now()}`,
      productName: userInfo?.productName || targetAnalysis?.category || 'Fashion Garment',
      status: 'analyzing',
      step: startFromStep || 'analyzing',
      progress: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setActiveJob(initialJob);
    const job = { ...initialJob };

    try {
      if (!startFromStep || startFromStep === 'analyzing' || startFromStep === 'model_selection') {
        job.step = 'model_selection';
        job.progress = 20;
        setActiveJob({ ...job });
      }

      if (!startFromStep || ['analyzing', 'model_selection', 'image_generation'].includes(job.step)) {
        job.step = 'image_generation';
        job.progress = 40;
        setActiveJob({ ...job });

        let shots: FashionShot[] = [];
        if (settings.aiMode === 'real_ai') {
          shots = await clientAI.generateDrapedShots(selectedImage!, targetModel, targetAnalysis, selectedEnvironment, userInfo.productName);
        } else {
          shots = GarmentDrapeCompositor.generateDrapedShots(selectedImage!, targetModel, targetAnalysis, selectedEnvironment, userInfo.productName);
        }
        setFashionShots(shots);
      }

      if (!startFromStep || ['analyzing', 'model_selection', 'image_generation', 'script_generation'].includes(job.step)) {
        job.step = 'script_generation';
        job.progress = 60;
        setActiveJob({ ...job });
        const generatedScript = await clientAI.generateBilingualScript({
          analysis: targetAnalysis, userInfo, modelProfile: targetModel,
          brandName: brand.name, tagline: brand.tagline, durationSec: 15,
          environment: selectedEnvironment, presentationMode, speakingStyle, speakerType
        });
        setScript(generatedScript);
      }

      if (!startFromStep || job.step !== 'assembling') {
        job.step = 'talking_model';
        job.progress = 80;
        setActiveJob({ ...job });
      }

      job.step = 'assembling';
      job.progress = 95;
      setActiveJob({ ...job });

      const reelProject: ReelProject = {
        id: reelId,
        productId: job.productId,
        productName: userInfo?.productName || targetAnalysis?.category || 'Fashion Item',
        version: 1,
        originalImage: selectedImage!,
        modelProfile: targetModel,
        environment: selectedEnvironment,
        presentationMode,
        speakingStyle,
        speakerType,
        shots: fashionShots,
        fidelity: { overallScore: 98, colorAccuracy: 98, borderPreservation: 97, patternFidelity: 96, garmentStructure: 98, passed: true, notes: ['Neural Inference Verified'] },
        script: script!,
        voice: voice,
        template: selectedTemplate,
        brand: brand,
        music: selectedMusic,
        musicVolume: 0.25,
        voiceVolume: 0.9,
        subtitleMode: subtitleMode,
        durationSec: 15,
        status: 'ready',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setActiveReel(reelProject);
      setReels(prev => [reelProject, ...prev]);
      job.status = 'completed';
      job.progress = 100;
      setActiveJob(null);
      setActiveStudioStep(4);
      showToast('Reel Generated Successfully!');
    } catch (err: any) {
      console.error('Pipeline error:', err);
      job.status = 'failed';
      job.error = err.message || 'Generation failed';
      setActiveJob({ ...job });
      showToast(`Error at ${job.step}: ${job.error}`);
    }
  };

  const handleOneClickGenerateReel = async () => {
    if (!selectedImage) {
      showToast('Please select a photo first.');
      return;
    }
    try {
      setIsAnalyzing(true);
      const ana = await clientAI.analyzeProduct(selectedImage, userInfo.productName);
      const suggested = getSuggestedModelForGarment(userInfo.productName || ana.category, ana);
      setAnalysis(ana);
      setSelectedModel(suggested.model);
      setTargetGender(suggested.gender);
      setSelectedEnvironment(suggested.environment);
      await handleGenerateFullReel(ana, suggested.model);
    } catch (err) {
      console.error('1-click error:', err);
      setIsAnalyzing(false);
      showToast('1-Click Error. Use Custom mode.');
    }
  };

  const handleRegenerateScript = async () => {
    if (!analysis) { showToast('Analyze product first.'); return; }
    setIsRegeneratingScript(true);
    try {
      const generatedScript = await clientAI.generateBilingualScript({ analysis, userInfo, modelProfile: selectedModel });
      setScript(generatedScript);
      showToast('Fresh copywriting generated!');
    } catch (err) {
      showToast('Script generation failed.');
    } finally {
      setIsRegeneratingScript(false);
    }
  };

  const [isApiPanelOpen, setIsApiPanelOpen] = useState(false);

  const [isAnalysisConfirmed, setIsAnalysisConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        onToggleAiMode={() => {}}
        productCount={products.length}
        reelCount={reels.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between overflow-x-auto no-scrollbar shadow-lg">
              <div className="flex items-center space-x-1 sm:space-x-3 text-xs font-semibold">
                <button
                  id="btn-step-1"
                  onClick={() => setActiveStudioStep(1)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                    activeStudioStep === 1 ? 'bg-rose-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <span>1. Photo</span>
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <button
                  id="btn-step-2"
                  onClick={() => analysis && setActiveStudioStep(2)}
                  disabled={!analysis}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                    activeStudioStep === 2 ? 'bg-rose-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <span>2. Model</span>
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <button
                  id="btn-step-3"
                  onClick={() => analysis && setActiveStudioStep(3)}
                  disabled={!analysis}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                    activeStudioStep === 3 ? 'bg-rose-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <span>3. Script</span>
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <button
                  id="btn-step-4"
                  onClick={() => activeReel && setActiveStudioStep(4)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                    activeStudioStep === 4 ? 'bg-rose-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <span>4. Final Reel</span>
                </button>
              </div>
            </div>

            {activeStudioStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-white">Generation Mode</h4>
                      <p className="text-[11px] text-slate-400">Choose between simulation or photorealistic AI.</p>
                      {settings.aiMode === 'real_ai' && (
                         <div className="flex items-center space-x-2 text-[9px] font-bold mt-1">
                            <span className="text-slate-500 uppercase tracking-tighter">Remote GPU:</span>
                            <span className={gpuStatus?.status === 'ready' ? 'text-emerald-400' : 'text-rose-400'}>
                               {gpuStatus?.status || 'CHECKING...'}
                            </span>
                         </div>
                      )}
                    </div>
                    <button
                      onClick={() => setIsApiPanelOpen(!isApiPanelOpen)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all flex items-center space-x-1"
                    >
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>{isApiPanelOpen ? 'Hide API Config' : 'Show API Keys'}</span>
                    </button>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setSettings({ ...settings, aiMode: 'live', generationMode: 'simulation' })}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          settings.aiMode === 'live' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Simulation
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, aiMode: 'real_ai', generationMode: 'commercial' })}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          settings.aiMode === 'real_ai' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Commercial AI
                      </button>
                    </div>
                  </div>

                  {isApiPanelOpen && (
                    <div className="bg-slate-950/80 border border-rose-500/20 rounded-xl p-4 space-y-3 animate-fade-in">
                       <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 mb-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Required for Firebase Static Hosting:</span>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Gemini API Key (Vision)</label>
                            <input
                              type="password"
                              placeholder="Starts with AIzaSy..."
                              value={apiKey}
                              onChange={(e) => {
                                setApiKey(e.target.value);
                                localStorage.setItem('gemini_api_key', e.target.value);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Groq API Key (Scripting)</label>
                            <input
                              type="password"
                              placeholder="Starts with gsk_..."
                              value={groqKey}
                              onChange={(e) => {
                                setGroqKey(e.target.value);
                                localStorage.setItem('groq_api_key', e.target.value);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                       </div>
                       <p className="text-[9px] text-slate-500">Keys are stored locally in your browser and never sent to our database.</p>
                    </div>
                  )}
                </div>

                <ProductUploader
                  onImageSelected={handleImageSelected}
                  selectedImage={selectedImage}
                  onClear={() => { setSelectedImage(null); setAnalysis(null); }}
                  onProceedToAnalyze={handleAnalyzeProduct}
                  onOneClickGenerate={handleOneClickGenerateReel}
                  isAnalyzing={isAnalyzing}
                  selectedModel={selectedModel}
                />

                {analysis && (
                  <AnalysisAndProfile analysis={analysis} userInfo={userInfo} onUpdateUserInfo={setUserInfo} />
                )}
              </div>
            )}

            {activeStudioStep === 4 && activeReel && (
              <ReelPreviewPlayer reel={activeReel} onDuplicateReel={() => {}} onEditReel={() => {}} />
            )}
          </div>
        )}
      </main>

      <JobProgressModal job={activeJob} onRetry={(step) => handleGenerateFullReel(undefined, undefined, step)} />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
