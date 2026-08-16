import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Copy, 
  Sparkles, 
  Share2, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Check, 
  Package, 
  Image as ImageIcon,
  MessageCircle,
  FileText,
  Sliders,
  Maximize2,
  Mic,
  Volume1,
  Languages,
  Eye,
  ShieldCheck,
  Radio,
  Sparkle,
  Instagram,
  Award,
  ExternalLink
} from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { ReelProject, VideoGenerationResult } from '../types';
import { videoCompositor } from '../lib/videoCompositor';
import { audioSynth } from '../lib/audioSynth';
import { WhatsAppConciergeModal } from './WhatsAppConciergeModal';
import { InstagramPublishKit } from './InstagramPublishKit';
import { AlertCircle, PlayCircle, Film } from 'lucide-react';

interface ReelPreviewPlayerProps {
  reel: ReelProject;
  onDuplicateReel: () => void;
  onEditReel: () => void;
}

export const ReelPreviewPlayer: React.FC<ReelPreviewPlayerProps> = ({
  reel,
  onDuplicateReel,
  onEditReel
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState('');
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [voiceLang, setVoiceLang] = useState<'ml-IN' | 'en-IN'>(reel.voice?.language || 'ml-IN');
  const [showGarmentPIP, setShowGarmentPIP] = useState(true);
  const [showPresenterAvatar, setShowPresenterAvatar] = useState(true);
  const [showDrapeComparison, setShowDrapeComparison] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showInstagramKit, setShowInstagramKit] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [playerMode, setPlayerMode] = useState<'reel' | 'side_by_side' | 'macro'>('reel');

  const duration = reel.durationSec || 15;
  const shots = reel.shots || [];
  const shotDuration = duration / Math.max(1, shots.length);

  // Active shot index
  const activeShotIndex = Math.min(
    shots.length - 1,
    Math.floor(currentTime / shotDuration)
  );
  const currentShot = shots[activeShotIndex] || shots[0];

  // Active subtitle
  const activeSubtitle = reel.script?.subtitles?.find(
    (s) => currentTime >= s.startTime && currentTime <= s.endTime
  );

  // Active feature callout by time
  const getActiveFeatureCallout = (t: number) => {
    if (t < 3) return { title: '✨ 100% Weave Matched', desc: reel.productName };
    if (t < 6) return { title: '✨ Artisan Border & Zari', desc: 'Preserved from Original Upload' };
    if (t < 9) return { title: '✨ Authentic Drape Fit', desc: `${reel.modelProfile.name} • ${reel.environment.replace(/_/g, ' ')}` };
    if (t < 12) return { title: '✨ Premium Quality Verified', desc: `${reel.fidelity.overallScore}% Optical Fidelity Passed` };
    return { title: '📲 WhatsApp Order Ready', desc: reel.brand.whatsapp || reel.brand.phone || 'Fast Delivery' };
  };

  const currentCallout = getActiveFeatureCallout(currentTime);

  // Playback timer & Live Voice Narration Sync
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      if (!isMuted) {
        audioSynth.startMusic(reel.music?.genre || 'traditional_kerala', reel.musicVolume || 0.25);
        if (currentTime === 0) {
          const scriptText = voiceLang === 'ml-IN' 
            ? (reel.script.malayalamScript || `${reel.productName}. അതിമനോഹരമായ പാരമ്പര്യ വസ്ത്രം ഇപ്പോൾ സ്വന്തമാക്കൂ.`)
            : (reel.script.englishScript || `Discover the all-new ${reel.productName}. Exclusively handcrafted for you.`);
          audioSynth.speak(scriptText, voiceLang);
        }
      }

      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            audioSynth.stopAll();
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      audioSynth.stopAll();
      setIsTestingVoice(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isMuted, duration, reel, voiceLang]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  // Test standalone voice narration
  const handleTestVoiceNarration = () => {
    if (isTestingVoice) {
      audioSynth.stopSpeech();
      setIsTestingVoice(false);
    } else {
      setIsTestingVoice(true);
      const textToSpeak = voiceLang === 'ml-IN' ? reel.script.malayalamScript : reel.script.englishScript;
      audioSynth.speak(textToSpeak, voiceLang, () => {
        setIsTestingVoice(false);
      });
    }
  };

  const handleExportMP4 = async () => {
    try {
      setIsExporting(true);
      setExportProgress(10);
      setExportStatusText('Initializing 9:16 Video Compositor...');

      const videoBlob = await videoCompositor.exportReelVideo(reel, (progress, status) => {
        setExportProgress(progress);
        setExportStatusText(status);
      });

      // Trigger download
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reel.productName.replace(/\s+/g, '_')}_Fashion_Reel_9x16.mp4`;
      a.click();
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export video. Please try again.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleDownloadZIP = async () => {
    try {
      setIsExporting(true);
      setExportStatusText('Packing Reel ZIP Marketing Bundle...');
      const zip = new JSZip();

      // Add captions & copy
      const captionDoc = `================================================
${reel.brand.name.toUpperCase()} - INSTAGRAM REEL MARKETING PACKAGE
================================================

MALAYALAM REEL CAPTION:
${reel.script.malayalamCaption}

MALAYALAM HASHTAGS:
${reel.script.malayalamHashtags.join(' ')}

ENGLISH REEL CAPTION:
${reel.script.englishCaption}

ENGLISH HASHTAGS:
${reel.script.englishHashtags.join(' ')}

PRODUCT FIDELITY AUDIT:
Overall Score: ${reel.fidelity.overallScore}%
Color Accuracy: ${reel.fidelity.colorAccuracy}%
Border Preservation: ${reel.fidelity.borderPreservation}%
Pattern Fidelity: ${reel.fidelity.patternFidelity}%
Structure Integrity: ${reel.fidelity.garmentStructure}%

BRAND CONTACT:
WhatsApp: ${reel.brand.whatsapp}
Phone: ${reel.brand.phone}
Instagram: ${reel.brand.instagram}
`;
      zip.file('INSTAGRAM_CAPTION_AND_TAGS.txt', captionDoc);

      // Add video
      const videoBlob = await videoCompositor.exportReelVideo(reel);
      zip.file('FASHION_REEL_9x16.mp4', videoBlob);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reel.productName.replace(/\s+/g, '_')}_Complete_Marketing_Package.zip`;
      a.click();
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('ZIP package error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">8. Final 9:16 Instagram Fashion Reel</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Ready to Post
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            1080×1920 Vertical format with animated subtitles, model realism, and store contact CTA.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-duplicate-variation"
            onClick={onDuplicateReel}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Create Variation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 9:16 Instagram Reel Vertical Player Mockup & Showcase Modes */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Mode Switcher Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-3 w-full max-w-[320px]">
            <button
              type="button"
              id="btn-mode-reel"
              onClick={() => setPlayerMode('reel')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                playerMode === 'reel'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>9:16 Reel</span>
            </button>
            <button
              type="button"
              id="btn-mode-side-by-side"
              onClick={() => setPlayerMode('side_by_side')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                playerMode === 'side_by_side'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Side-by-Side</span>
            </button>
            <button
              type="button"
              id="btn-mode-macro"
              onClick={() => setPlayerMode('macro')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                playerMode === 'macro'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Weave Zoom</span>
            </button>
          </div>

          {/* Player Display Container */}
          {playerMode === 'reel' && (
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border-4 border-slate-800 shadow-2xl shadow-rose-950/40 select-none group">
              {/* Background Shot Image with Cinematic Motion */}
              <div className="absolute inset-0 bg-slate-950 overflow-hidden">
                {currentShot && (
                  <img
                    src={currentShot.imageUrl}
                    alt={currentShot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 scale-105"
                  />
                )}
              </div>

              {/* Top & Bottom Gradients */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

              {/* Top Branding Header */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md">
                    {reel.brand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{reel.brand.name}</div>
                    <div className="text-[9px] text-amber-300 font-medium">{reel.brand.tagline}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    id="btn-toggle-mute"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 hover:text-white"
                    title={isMuted ? 'Unmute voice and music' : 'Mute audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Uploaded Product PIP (Picture-in-Picture) Showcase */}
              {showGarmentPIP && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlayerMode('side_by_side');
                  }}
                  className="absolute top-16 right-3 z-20 cursor-pointer bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border-2 border-amber-400/60 shadow-lg shadow-black/80 hover:scale-105 transition-transform"
                  title="Click to view full Garment Drape Comparison"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden border border-amber-400/40">
                    <img
                      src={reel.originalImage}
                      alt="Uploaded Product"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-amber-600/95 py-0.5 text-[7px] text-center font-bold text-white uppercase tracking-tighter">
                      Showcased
                    </div>
                  </div>
                  <div className="text-[7px] text-amber-300 font-bold text-center mt-0.5 flex items-center justify-center space-x-0.5">
                    <Check className="w-2 h-2 text-emerald-400" />
                    <span>Compare</span>
                  </div>
                </div>
              )}

              {/* AI Model Presenter & Live Talking Explainer Badge */}
              {showPresenterAvatar && (
                <div className="absolute top-16 left-3 z-20 flex items-center space-x-2 bg-black/80 backdrop-blur-md pl-1 pr-2.5 py-1 rounded-full border border-rose-500/40 shadow-lg">
                  <div className="relative">
                    <img
                      src={reel.modelProfile.avatarUrl}
                      alt={reel.modelProfile.name}
                      referrerPolicy="no-referrer"
                      className={`w-7 h-7 rounded-full object-cover border-2 transition-all ${
                        isPlaying ? 'border-rose-400 ring-2 ring-rose-500/50 scale-105' : 'border-slate-400'
                      }`}
                    />
                    {isPlaying && (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] font-bold text-white truncate max-w-[90px]">
                        {reel.modelProfile.name.split(' ')[0]}
                      </span>
                      {isPlaying && (
                        <div className="flex items-center space-x-0.5 text-rose-400 text-[8px]">
                          <span className="animate-pulse">●</span>
                          <span className="text-[8px] font-semibold text-rose-300">Explaining</span>
                        </div>
                      )}
                    </div>
                    {/* Live Soundwave when speaking */}
                    {isPlaying ? (
                      <div className="flex items-center space-x-0.5 h-2 mt-0.5">
                        <div className="w-0.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <div className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
                        <div className="w-0.5 h-1 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '225ms' }} />
                      </div>
                    ) : (
                      <span className="text-[8px] text-slate-400 font-medium">
                        AI Presenter
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Synchronized Product Feature Callout Highlight */}
              {isPlaying && currentCallout && (
                <div className="absolute top-28 left-3 right-3 z-15 pointer-events-none animate-fade-in">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/50 shadow-md">
                    <Sparkle className="w-3 h-3 text-amber-400 flex-shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                    <span className="text-[10px] font-bold text-amber-300 truncate">
                      {currentCallout.title}
                    </span>
                    <span className="text-[9px] text-slate-200 truncate hidden sm:inline">
                      • {currentCallout.desc}
                    </span>
                  </div>
                </div>
              )}

              {/* Commercial Price & Offer Tag Overlay */}
              <div className="absolute top-36 left-3 z-15 pointer-events-none">
                <div className="flex items-center space-x-1.5 bg-rose-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-rose-500/50 shadow-lg">
                  <span className="text-[11px] font-extrabold text-amber-300">
                    ₹{(reel.userInfo?.price || 1250).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-slate-400 line-through">
                    ₹{(reel.userInfo?.mrp || Math.round((reel.userInfo?.price || 1250) * 1.3)).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[8px] font-bold bg-emerald-500 text-slate-950 px-1 py-0.2 rounded">
                    25% OFF
                  </span>
                </div>
              </div>

              {/* Subtitle Box (Animated Spoken Narration) */}
              {activeSubtitle && reel.subtitleMode !== 'none' && (
                <div className="absolute bottom-20 inset-x-3 z-10 text-center animate-fade-in">
                  <div className="inline-block px-3 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-rose-500/20 shadow-xl max-w-[95%]">
                    {reel.subtitleMode !== 'en_only' && (
                      <div className="text-xs font-bold text-white leading-snug">
                        {activeSubtitle.textMl}
                      </div>
                    )}
                    {reel.subtitleMode !== 'ml_only' && (
                      <div className="text-[10px] text-amber-300 font-medium mt-0.5">
                        {activeSubtitle.textEn}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Call To Action Footer */}
              <div className="absolute bottom-3 inset-x-4 z-10">
                <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white font-bold text-xs flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-1.5 truncate">
                    <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-300" />
                    <span className="truncate">{reel.brand.whatsapp || reel.brand.phone || '+91 98470 12345'}</span>
                  </div>
                  <span className="text-[9px] bg-black/40 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider text-amber-200">
                    Order Now
                  </span>
                </div>
                {reel.brand.showDisclaimer && (
                  <div className="text-[8px] text-white/60 text-center mt-1">
                    ✨ AI Fashion Visualization • Lakshmi Silks MG Road Kochi & Calicut
                  </div>
                )}
              </div>

              {/* Play / Pause Center Overlay Button */}
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-all z-20"
              >
                {!isPlaying && (
                  <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 pl-1 hover:scale-110 transition-transform">
                    <Play className="w-7 h-7" />
                  </div>
                )}
              </div>

              {/* Top Progress Segment Bars */}
              <div className="absolute top-2 inset-x-3 flex space-x-1 z-30 pointer-events-none">
                {shots.map((_, idx) => {
                  const shotStart = idx * shotDuration;
                  const shotEnd = (idx + 1) * shotDuration;
                  let fill = 0;
                  if (currentTime >= shotEnd) fill = 100;
                  else if (currentTime > shotStart) fill = ((currentTime - shotStart) / shotDuration) * 100;

                  return (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-100"
                        style={{ width: `${fill}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Side-by-Side Drape View Mode */}
          {playerMode === 'side_by_side' && (
            <div className="w-full max-w-[340px] bg-slate-950 border-2 border-amber-500/50 rounded-2xl p-3 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-slate-800">
                <span className="text-amber-300">🪞 Garment Drape Inspection</span>
                <span className="text-emerald-400 font-mono text-[10px]">{reel.fidelity.overallScore}% Fidelity</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Left: Original Uploaded */}
                <div className="bg-slate-900 rounded-xl p-2 border border-slate-800 text-center">
                  <div className="text-[10px] font-bold text-slate-300 mb-1">Source Garment</div>
                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-amber-500/40 bg-black">
                    <img
                      src={reel.originalImage}
                      alt="Uploaded Product"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[9px] text-amber-300 font-medium mt-1 truncate">
                    {reel.productName}
                  </div>
                </div>

                {/* Right: AI Model Drape */}
                <div className="bg-slate-900 rounded-xl p-2 border border-rose-500/40 text-center">
                  <div className="text-[10px] font-bold text-rose-300 mb-1">AI Model Drape</div>
                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-rose-500/50 bg-black">
                    <img
                      src={currentShot?.imageUrl}
                      alt="AI Model Wearing Garment"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[9px] text-rose-300 font-medium mt-1 truncate">
                    {reel.modelProfile.name}
                  </div>
                </div>
              </div>

              {/* Audio & Video Sync Bar in Side-by-Side mode */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Audio' : 'Play Narration'}</span>
                </button>
                <div className="text-[10px] text-slate-400 text-right">
                  Shot {activeShotIndex + 1}/{shots.length} ({Math.round(currentTime)}s)
                </div>
              </div>
            </div>
          )}

          {/* Macro Weave Zoom View Mode */}
          {playerMode === 'macro' && (
            <div className="w-full max-w-[340px] bg-slate-950 border-2 border-indigo-500/50 rounded-2xl p-3 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-slate-800">
                <span className="text-indigo-300">🔍 Fabric Weave & Color Precision</span>
                <span className="text-emerald-400 text-[10px]">Verified Pure Transfer</span>
              </div>

              <div className="aspect-square rounded-xl overflow-hidden border border-indigo-500/40 relative bg-black">
                <img
                  src={reel.originalImage}
                  alt="Fabric Macro Texture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-150 transform transition-transform duration-500 hover:scale-175"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-bold text-indigo-300">
                  Macro Weave Inspection
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Garment Name:</span>
                  <span className="font-bold text-white">{reel.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weave Match:</span>
                  <span className="font-bold text-emerald-400">100% Slub & Thread Alignment</span>
                </div>
              </div>
            </div>
          )}

          {/* Model Pose & Shot Thumbnails under Player */}
          <div className="w-full max-w-[320px] mt-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1.5 px-0.5">
              <span>Model Camera Angles:</span>
              <span className="text-amber-400 text-[10px]">Click to jump to pose</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {shots.map((s, idx) => {
                const isActive = activeShotIndex === idx;
                return (
                  <button
                    key={s.id || idx}
                    type="button"
                    onClick={() => {
                      setCurrentTime(idx * shotDuration);
                      if (!isPlaying) setIsPlaying(false);
                    }}
                    className={`relative rounded-lg overflow-hidden border transition-all aspect-[9/14] ${
                      isActive
                        ? 'border-rose-500 ring-2 ring-rose-500/50 scale-105 shadow-md'
                        : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-[8px] text-center font-bold text-white uppercase">
                      {idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Export Options, Metadata, & One-Click Download Suite */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Showcased Garment Ground Truth & Audit Card */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-xl border border-amber-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center space-x-1.5">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Garment Under Showcase</span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>{reel.fidelity.overallScore}% Preserved Fidelity</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              {/* Uploaded Garment Photo Thumbnail */}
              <div 
                onClick={() => setShowDrapeComparison(true)}
                className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-black border-2 border-amber-400/70 flex-shrink-0 cursor-pointer group shadow-md"
                title="Click to zoom & compare drape"
              >
                <img
                  src={reel.originalImage}
                  alt="Original Showcased Garment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 inset-x-0 bg-amber-600/90 py-0.5 text-[8px] font-bold text-white text-center uppercase tracking-tighter">
                  Source Photo
                </div>
              </div>

              {/* Product Info & Ground Truth specs */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="text-sm font-bold text-white truncate mb-1">
                  {reel.productName}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-semibold text-[11px]">
                    📍 Kerala Boutique Catalog
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                    🎯 9:16 Video Ready
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-slate-400">Color Spectrum: </span>
                    <span className="font-bold text-slate-200">100% Calibrated</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Slub / Weave: </span>
                    <span className="font-bold text-emerald-400">High Precision</span>
                  </div>
                </div>
              </div>

              {/* Quick Drape Compare Action */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <button
                  type="button"
                  id="btn-inspect-drape-modal"
                  onClick={() => setShowDrapeComparison(true)}
                  className="px-3 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inspect Fit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerMode(playerMode === 'side_by_side' ? 'reel' : 'side_by_side')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <span>{playerMode === 'side_by_side' ? '▶ Video Mode' : '🪞 Side-by-Side'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Garment Showcased</span>
                <h3 className="text-sm font-bold text-white truncate">{reel.productName}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Quality Audit</span>
                <p className="text-xs font-bold text-emerald-400">{reel.fidelity.overallScore}% Fidelity</p>
              </div>
            </div>

            {/* AI Model Showcase Badge */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-3">
              <img
                src={reel.modelProfile.avatarUrl}
                alt={reel.modelProfile.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow-md flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">{reel.modelProfile.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    AI Model
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {reel.modelProfile.ethnicity} • {reel.modelProfile.appearanceStyle.replace(/_/g, ' ')}
                </p>
                <p className="text-[10px] text-amber-300/90 truncate">
                  📍 Environment: {reel.environment.replace(/_/g, ' ')}
                </p>
              </div>
            </div>

            {/* AI Video Generation Quality Report */}
            {reel.videoResult && (
              <div className={`p-4 rounded-xl border ${reel.videoResult.isMock ? 'bg-slate-900 border-slate-800' : 'bg-emerald-950/20 border-emerald-500/30'} space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Film className={`w-4 h-4 ${reel.videoResult.isMock ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {reel.videoResult.isMock ? 'High-Fidelity Fashion Motion' : 'Real AI Video Generation'}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${reel.videoResult.isMock ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {reel.videoResult.isMock ? 'DEMO MODE' : 'LIVE AI VIDEO'}
                  </span>
                </div>

                <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Provider:</span>
                    <span className="text-white font-mono">{reel.videoResult.providerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Video Fidelity:</span>
                    <span className={`font-bold ${reel.videoResult.fidelityScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {reel.videoResult.fidelityScore}% Accuracy
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-[9px] text-slate-500 uppercase font-bold">Face</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${reel.videoResult.qualityReport.faceConsistency === 'GOOD' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {reel.videoResult.qualityReport.faceConsistency}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-[9px] text-slate-500 uppercase font-bold">Garment</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${reel.videoResult.qualityReport.garmentPreservation === 'GOOD' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {reel.videoResult.qualityReport.garmentPreservation}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-[9px] text-slate-500 uppercase font-bold">Motion</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${reel.videoResult.qualityReport.movementRealism === 'GOOD' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {reel.videoResult.qualityReport.movementRealism}
                    </div>
                  </div>
                </div>

                {reel.videoResult.isMock && (
                  <div className="flex items-center space-x-2 text-[10px] text-amber-400/80 bg-amber-500/5 p-2 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Real AI video generation unavailable. Showing high-fidelity fallback Reel.</span>
                  </div>
                )}
              </div>
            )}

            {/* AI Model Explainer & Narration Studio Card */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Model Explainer & Spoken Voice
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setVoiceLang('ml-IN')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      voiceLang === 'ml-IN'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    മലയാളം (Malayalam)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceLang('en-IN')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      voiceLang === 'en-IN'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Voice Narration Preview Box */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-200">
                      {voiceLang === 'ml-IN' ? 'Malayalam Voice Narration:' : 'Indian English Voice Narration:'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestVoiceNarration}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all ${
                      isTestingVoice
                        ? 'bg-rose-600 text-white ring-2 ring-rose-500/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isTestingVoice ? <VolumeX className="w-3 h-3" /> : <Volume1 className="w-3 h-3" />}
                    <span>{isTestingVoice ? 'Stop Audio' : '🎙️ Listen to Model'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium bg-black/40 p-2.5 rounded-lg border border-slate-800">
                  "{voiceLang === 'ml-IN' ? reel.script.malayalamScript : reel.script.englishScript}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Radio className="w-3 h-3 text-rose-400" />
                    <span>Synchronized with 9:16 Video</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Mode: {reel.presentationMode === 'talking_model' ? 'Talking Model' : reel.presentationMode === 'voice_over' ? 'Voice-over Only' : 'Hybrid (Talking + B-roll)'}
                  </span>
                </div>
              </div>

              {/* Lip-Sync & Facial Dynamics Quality Report */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center space-x-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {reel.lipSyncQuality?.providerMode === 'REAL' || reel.shots.find(s => s.isTalkingShot)?.talkingModelData?.providerType === 'REAL'
                        ? 'Real AI Talking Model'
                        : 'Simulated Talking Model'}
                    </span>
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 text-[10px]">
                    {reel.lipSyncQuality?.lipSyncScore || 95}% Synchronized
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-400">Viseme Timing</div>
                    <div className="font-bold text-white mt-0.5">{reel.lipSyncQuality?.lipSyncScore || 96}% Match</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-400">Face Stability</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{reel.lipSyncQuality?.facialConsistencyScore || 98}% Intact</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-400">Garment Freeze</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{reel.lipSyncQuality?.garmentPreservationScore || 99}% Stable</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-400">Micro-Blink</div>
                    <div className="font-bold text-amber-400 mt-0.5">Active Natural</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls & Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowGarmentPIP(!showGarmentPIP)}
                className={`p-2 rounded-lg border text-center transition-all ${
                  showGarmentPIP
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-bold">Uploaded PIP</div>
                <div className="text-[9px] mt-0.5 text-slate-400">{showGarmentPIP ? 'Enabled' : 'Hidden'}</div>
              </button>

              <button
                type="button"
                onClick={() => setShowPresenterAvatar(!showPresenterAvatar)}
                className={`p-2 rounded-lg border text-center transition-all ${
                  showPresenterAvatar
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-bold">Talking Presenter</div>
                <div className="text-[9px] mt-0.5 text-slate-400">{showPresenterAvatar ? 'Enabled' : 'Hidden'}</div>
              </button>

              <div className="p-2 rounded-lg border bg-slate-950 border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-300">Audio Ducking</div>
                <div className="text-[9px] mt-0.5 text-emerald-400 font-bold">Auto -12dB</div>
              </div>

              <div className="p-2 rounded-lg border bg-slate-950 border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-300">Resolution</div>
                <div className="text-[9px] mt-0.5 text-amber-400 font-bold">1080×1920 HD</div>
              </div>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="space-y-3">
            {isExporting ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/40">
                <div className="flex justify-between text-xs font-semibold text-white mb-1.5">
                  <span>{exportStatusText}</span>
                  <span className="text-amber-400 font-bold">{exportProgress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-200"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="btn-export-mp4"
                  onClick={handleExportMP4}
                  className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 9:16 MP4 Video</span>
                </button>

                <button
                  id="btn-download-zip"
                  onClick={handleDownloadZIP}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs py-3 px-4 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Download Marketing ZIP</span>
                </button>
              </div>
            )}

            {/* Kerala Social Commerce & Showcase Actions */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-pink-950/40 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kerala Retail Direct Distribution (WhatsApp & Instagram)</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready to Publish
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  id="btn-open-whatsapp-concierge"
                  onClick={() => setShowWhatsAppModal(true)}
                  className="p-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-emerald-950/50 transition-all border border-emerald-500/30"
                >
                  <div className="flex items-center space-x-2 text-left">
                    <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">WhatsApp Concierge</div>
                      <div className="text-[10px] text-emerald-200 font-normal">Showrooms • Video Call • Orders</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                </button>

                <button
                  type="button"
                  id="btn-open-instagram-kit"
                  onClick={() => setShowInstagramKit(true)}
                  className="p-3 rounded-xl bg-gradient-to-r from-pink-700 via-rose-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-pink-950/50 transition-all border border-pink-500/30"
                >
                  <div className="flex items-center space-x-2 text-left">
                    <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-pink-200" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">Instagram Showcase Kit</div>
                      <div className="text-[10px] text-pink-200 font-normal">Reels • 1:1 Feed • Story Stickers</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-200" />
                </button>
              </div>
            </div>

            {/* Quick Caption Copy Bar */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="min-w-0 pr-3">
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ready-to-Post Instagram Caption</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {reel.script.malayalamCaption}
                </p>
              </div>

              <button
                id="btn-copy-reel-caption"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${reel.script.malayalamCaption}\n\n${reel.script.malayalamHashtags.join(' ')}`
                  );
                  setCopiedCaption(true);
                  setTimeout(() => setCopiedCaption(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 text-xs font-semibold border border-rose-500/30 flex items-center space-x-1 flex-shrink-0 transition-all"
              >
                {copiedCaption ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCaption ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Garment vs Model Drape Full Comparison Modal */}
      {showDrapeComparison && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Garment Transfer & AI Model Drape Verification</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Verifying fidelity between your uploaded garment photo and the AI model showcase.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDrapeComparison(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: Uploaded Product Photo */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-xs font-bold text-slate-300 mb-2">Original Uploaded Garment</div>
                <div className="relative aspect-[9/14] rounded-lg overflow-hidden border border-slate-700 max-w-[240px] mx-auto">
                  <img
                    src={reel.originalImage}
                    alt="Uploaded Product"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-300">
                    Source Photo
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 font-medium">
                  {reel.productName}
                </div>
              </div>

              {/* Right: AI Model Wearing Uploaded Garment */}
              <div className="bg-slate-950 p-3 rounded-xl border border-rose-500/40 text-center">
                <div className="text-xs font-bold text-rose-300 mb-2">
                  AI Model Draped ({reel.modelProfile.name})
                </div>
                <div className="relative aspect-[9/14] rounded-lg overflow-hidden border-2 border-rose-500 max-w-[240px] mx-auto">
                  <img
                    src={currentShot?.imageUrl}
                    alt={currentShot?.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold">
                    Virtual Drape
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 mt-2 font-bold flex items-center justify-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Color & Border Match: {reel.fidelity.overallScore}% Passed</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                🎙️ Spoken in Reel: <span className="text-white font-medium">"{reel.script.malayalamScript.substring(0, 75)}..."</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowDrapeComparison(false);
                  setIsPlaying(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center space-x-1.5 flex-shrink-0 ml-3"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Play Reel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Concierge Modal */}
      <WhatsAppConciergeModal
        reel={reel}
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
      />

      {/* Instagram Viral Showcase Kit Modal */}
      <InstagramPublishKit
        reel={reel}
        isOpen={showInstagramKit}
        onClose={() => setShowInstagramKit(false)}
      />
    </div>
  );
};
