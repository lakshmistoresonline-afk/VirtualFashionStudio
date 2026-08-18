import React, { useState } from 'react';
import { 
  Volume2, 
  Play, 
  Square, 
  Languages, 
  Sparkles, 
  Sliders, 
  Subtitles, 
  Check, 
  AudioWaveform,
  UserCheck,
  Video,
  Mic,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { VoiceConfig, PresentationMode, SpeakingStyle, SpeakerType } from '../types';
import { VOICES_PRESETS } from '../data/presets';
import { audioSynth } from '../lib/audioSynth';

interface VoiceAndSubtitlesProps {
  voice: VoiceConfig;
  onUpdateVoice: (voice: VoiceConfig) => void;
  subtitleMode: 'ml_only' | 'en_only' | 'bilingual' | 'none';
  onUpdateSubtitleMode: (mode: 'ml_only' | 'en_only' | 'bilingual' | 'none') => void;
  scriptText: string;
  presentationMode?: PresentationMode;
  onUpdatePresentationMode?: (mode: PresentationMode) => void;
  speakingStyle?: SpeakingStyle;
  onUpdateSpeakingStyle?: (style: SpeakingStyle) => void;
  speakerType?: SpeakerType;
  onUpdateSpeakerType?: (type: SpeakerType) => void;
  modelName?: string;
  capabilities?: any;
}

export const VoiceAndSubtitles: React.FC<VoiceAndSubtitlesProps> = ({
  voice,
  onUpdateVoice,
  subtitleMode,
  onUpdateSubtitleMode,
  scriptText,
  presentationMode = 'hybrid',
  onUpdatePresentationMode,
  speakingStyle = 'festive',
  onUpdateSpeakingStyle,
  speakerType = 'female_model',
  onUpdateSpeakerType,
  modelName = 'AI Model',
  capabilities
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const isTalkingSupported = capabilities?.talkingVideo || capabilities?.isRealLipSyncAvailable;

  React.useEffect(() => {
    if (!isTalkingSupported && (presentationMode === 'talking_model' || presentationMode === 'hybrid')) {
      onUpdatePresentationMode?.('voice_over');
    }
  }, [isTalkingSupported, presentationMode, onUpdatePresentationMode]);

  const handleTogglePreview = () => {
    if (isPlayingPreview) {
      audioSynth.stopSpeech();
      setIsPlayingPreview(false);
    } else {
      setIsPlayingPreview(true);
      const textToSpeak =
        voice.language === 'ml-IN'
          ? scriptText || 'നിങ്ങളുടെ വിശേഷ ദിവസങ്ങൾക്ക് കൂടുതൽ മാറ്റുകൂട്ടാൻ...'
          : 'Elevate your festive celebrations with our breathtaking silk collection!';
      audioSynth.speak(textToSpeak, voice.language, () => {
        setIsPlayingPreview(false);
      });
    }
  };

  const presentationModes: Array<{
    id: PresentationMode;
    title: string;
    badge?: string;
    desc: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'voice_over',
      title: 'Voice-over',
      desc: 'All fashion shots are visual action with full off-screen voice narration.',
      icon: <Mic className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'talking_model',
      title: 'Talking Model',
      badge: !isTalkingSupported ? 'Not Supported' : undefined,
      desc: !isTalkingSupported
        ? 'Talking model is not supported by the current AI provider.'
        : 'The AI model directly speaks to the camera in portrait shots with lip-sync.',
      icon: <Video className={`w-4 h-4 ${!isTalkingSupported ? 'text-slate-500' : 'text-emerald-400'}`} />
    },
    {
      id: 'hybrid',
      title: 'Hybrid',
      badge: !isTalkingSupported ? 'Reduced Mode' : 'Recommended',
      desc: !isTalkingSupported
        ? 'Transitions between fashion shots and fabric closeups with voiceover (Model speech disabled).'
        : 'Model opens with speaking hook, transitions to fabric closeups with voiceover, returns to model for CTA.',
      icon: <Layers className={`w-4 h-4 ${!isTalkingSupported ? 'text-slate-500' : 'text-amber-400'}`} />
    }
  ];

  const speakingStyles: Array<{ id: SpeakingStyle; label: string; desc: string }> = [
    { id: 'natural', label: 'Natural Kerala Retail', desc: 'Conversational everyday Malayalam' },
    { id: 'festive', label: 'Festive & Joyful (ഓണം സ്പെഷ്യൽ)', desc: 'Warm, celebration-themed enthusiasm' },
    { id: 'luxury', label: 'Luxury & Royal Heritage', desc: 'Poised, refined, boutique pacing' },
    { id: 'high_energy', label: 'High Energy Promo', desc: 'Fast-paced call-to-action for flash sales' }
  ];

  const subtitleOptions = [
    {
      id: 'bilingual' as const,
      label: 'Bilingual (Malayalam + English)',
      desc: 'Top: മലയാളം • Bottom: English (Best for maximum reach)'
    },
    {
      id: 'ml_only' as const,
      label: 'Malayalam Only (മലയാളം)',
      desc: 'Authentic Kerala audience focus'
    },
    {
      id: 'en_only' as const,
      label: 'English Only',
      desc: 'Global and metropolitan buyers'
    },
    {
      id: 'none' as const,
      label: 'Clean Video (No Subtitles)',
      desc: 'Minimalist video presentation'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>6. Presentation Mode, Voice & Subtitle Engine</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
              Lip-Sync Ready
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure how the AI Model speaks, synthesizes native Malayalam audio, and presents product highlights.
          </p>
        </div>

        <button
          id="btn-preview-voice"
          onClick={handleTogglePreview}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            isPlayingPreview
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold'
          }`}
        >
          {isPlayingPreview ? (
            <>
              <Square className="w-3.5 h-3.5" />
              <span>Stop Voice Preview</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>▶ Preview Voice</span>
            </>
          )}
        </button>
      </div>

      {/* Presentation Mode Selector */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>How should the model present the product?</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isTalkingSupported ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
              Talking Model: {isTalkingSupported ? 'REAL AI AVAILABLE' : 'SIMULATED FALLBACK'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presentationModes.map((mode) => {
            const isSelected = presentationMode === mode.id;
            return (
              <button
                key={mode.id}
                id={`presentation-mode-${mode.id}`}
                type="button"
                onClick={() => onUpdatePresentationMode?.(mode.id)}
                className={`p-4 rounded-xl text-left transition-all border relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50 text-white shadow-lg'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    {mode.icon}
                    <span className="text-sm font-bold">{mode.title}</span>
                  </div>
                  {mode.badge && (
                    <span className="text-[10px] uppercase font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                      {mode.badge}
                    </span>
                  )}
                  {isSelected && !mode.badge && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{mode.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speaking Style Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Malayalam Speaking Style & Tone:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {speakingStyles.map((style) => {
              const isSelected = speakingStyle === style.id;
              return (
                <button
                  key={style.id}
                  id={`speaking-style-${style.id}`}
                  type="button"
                  onClick={() => onUpdateSpeakingStyle?.(style.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-950/40 text-rose-200 font-semibold'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-[11px] mb-0.5">{style.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{style.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Speaker Role Assignment:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="speaker-type-model"
              onClick={() => onUpdateSpeakerType?.('female_model')}
              className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                speakerType !== 'narrator'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-200 font-semibold'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white text-[11px] flex items-center space-x-1 mb-0.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Model Voice</span>
              </div>
              <div className="text-[10px] text-slate-400">Lip-synced to model on screen</div>
            </button>

            <button
              type="button"
              id="speaker-type-narrator"
              onClick={() => onUpdateSpeakerType?.('narrator')}
              className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                speakerType === 'narrator'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-200 font-semibold'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white text-[11px] flex items-center space-x-1 mb-0.5">
                <Mic className="w-3.5 h-3.5 text-sky-400" />
                <span>Studio Narrator</span>
              </div>
              <div className="text-[10px] text-slate-400">Professional brand voiceover</div>
            </button>
          </div>
        </div>
      </div>

      {/* Voice Selector Grid */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Select Malayalam Voice Character:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {VOICES_PRESETS.map((v) => {
            const isSelected = voice.voiceId === v.voiceId;
            return (
              <div
                key={v.voiceId}
                id={`voice-${v.voiceId}`}
                onClick={() => onUpdateVoice({ ...voice, ...v })}
                className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'border-rose-500 bg-rose-950/30 ring-1 ring-rose-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{v.voiceName.split('(')[0]}</span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-amber-400 font-medium">
                  {v.language === 'ml-IN' ? 'Malayalam (മലയാളം)' : 'Indian English'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{v.gender === 'female' ? 'Female Voice' : 'Male Voice'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtitle Configuration Mode */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
          <Subtitles className="w-3.5 h-3.5 text-amber-400" />
          <span>Subtitle Mode & Placement:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {subtitleOptions.map((opt) => {
            const isSelected = subtitleMode === opt.id;
            return (
              <div
                key={opt.id}
                id={`subtitle-mode-${opt.id}`}
                onClick={() => onUpdateSubtitleMode(opt.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-950 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center justify-between mb-1">
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">{opt.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

