import React, { useState } from 'react';
import { 
  Building2, 
  Music, 
  Play, 
  Square, 
  Volume2, 
  Check, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Sparkles,
  MapPin,
  Award,
  ChevronDown
} from 'lucide-react';
import { BrandProfile, MusicTrack } from '../types';
import { BRAND_PRESETS, KERALA_SHOWROOM_BRANCHES, MUSIC_TRACKS_PRESETS } from '../data/presets';
import { audioSynth } from '../lib/audioSynth';

interface BrandAndMusicProps {
  brand: BrandProfile;
  onUpdateBrand: (brand: BrandProfile) => void;
  selectedMusic: MusicTrack;
  onSelectMusic: (music: MusicTrack) => void;
  musicVolume: number;
  onUpdateMusicVolume: (vol: number) => void;
}

export const BrandAndMusic: React.FC<BrandAndMusicProps> = ({
  brand,
  onUpdateBrand,
  selectedMusic,
  onSelectMusic,
  musicVolume,
  onUpdateMusicVolume
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMusic = (track: MusicTrack) => {
    if (isPlayingMusic && selectedMusic.id === track.id) {
      audioSynth.stopMusic();
      setIsPlayingMusic(false);
    } else {
      onSelectMusic(track);
      audioSynth.startMusic(track.genre, musicVolume);
      setIsPlayingMusic(true);
    }
  };

  const handleSelectBrandPreset = (preset: BrandProfile) => {
    onUpdateBrand({
      ...preset,
      selectedShowroomId: brand.selectedShowroomId || 'br_kochi_mg'
    });
  };

  const currentBranch = KERALA_SHOWROOM_BRANCHES.find(b => b.id === (brand.selectedShowroomId || 'br_kochi_mg')) || KERALA_SHOWROOM_BRANCHES[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>7. Retail Brand Watermark, Showrooms & Music</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              Lakshmi Stores Enterprise Ready
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure your official Kerala retail showroom profile, WhatsApp video shopping routing, and royal background score.
          </p>
        </div>
      </div>

      {/* 1-Click Brand Presets Carousel */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Kerala Retail Brand Profile</span>
          </label>
          <span className="text-[10px] text-slate-400">1-Click Auto-Configure</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {BRAND_PRESETS.map((p) => {
            const isSelected = brand.id === p.id || brand.name === p.name;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectBrandPreset(p)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 shadow-md ring-1 ring-amber-400/50'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{p.name}</div>
                <div className="text-[9px] text-amber-300/90 truncate mt-0.5">{p.tagline.split('•')[0]}</div>
                {isSelected && (
                  <div className="mt-1.5 flex items-center space-x-1 text-[9px] font-bold text-amber-400">
                    <Check className="w-3 h-3" />
                    <span>Active Profile</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Information & Showroom Form */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-800">
            <Building2 className="w-4 h-4 text-rose-400" />
            <span>Storefront & Showroom Customization</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Brand Name on Watermark</label>
              <input
                type="text"
                id="input-brand-name"
                value={brand.name}
                onChange={(e) => onUpdateBrand({ ...brand, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 font-medium"
              />
            </div>

            {/* Showroom Branch Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Default Showroom Branch (WhatsApp Routing)</span>
              </label>
              <select
                value={brand.selectedShowroomId || 'br_kochi_mg'}
                onChange={(e) => {
                  const br = KERALA_SHOWROOM_BRANCHES.find(b => b.id === e.target.value);
                  onUpdateBrand({
                    ...brand,
                    selectedShowroomId: e.target.value,
                    whatsapp: br?.whatsapp || brand.whatsapp,
                    phone: br?.phone || brand.phone
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-rose-500 font-medium"
              >
                {KERALA_SHOWROOM_BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>Showroom WhatsApp</span>
                </label>
                <input
                  type="text"
                  id="input-brand-whatsapp"
                  value={brand.whatsapp}
                  onChange={(e) => onUpdateBrand({ ...brand, whatsapp: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center space-x-1">
                  <Instagram className="w-3 h-3 text-pink-400" />
                  <span>Instagram Handle</span>
                </label>
                <input
                  type="text"
                  id="input-brand-instagram"
                  value={brand.instagram}
                  onChange={(e) => onUpdateBrand({ ...brand, instagram: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                />
              </div>
            </div>

            {/* Quality Seals */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-300">On-Screen Verification Seals:</div>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={brand.hasSilkMarkBadge !== false}
                    onChange={(e) => onUpdateBrand({ ...brand, hasSilkMarkBadge: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-slate-200 font-semibold">Silk Mark Certified</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={brand.hasHandloomBadge !== false}
                    onChange={(e) => onUpdateBrand({ ...brand, hasHandloomBadge: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-200 font-semibold">100% Handloom Mark</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Music Library */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Music className="w-4 h-4 text-amber-400" />
                <span>Background Score (Royalty Free)</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Commercial License
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {MUSIC_TRACKS_PRESETS.map((track) => {
                const isSelected = selectedMusic.id === track.id;
                const isPlaying = isPlayingMusic && isSelected;
                return (
                  <div
                    key={track.id}
                    id={`track-${track.id}`}
                    onClick={() => {
                      onSelectMusic(track);
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-white truncate">{track.title}</div>
                      <div className="text-[10px] text-amber-400/90">{track.mood} • {track.bpm} BPM</div>
                    </div>

                    <button
                      id={`btn-play-track-${track.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMusic(track);
                      }}
                      className={`p-2 rounded-lg text-xs font-semibold flex-shrink-0 transition-all ${
                        isPlaying
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Volume Control */}
          <div className="pt-3 border-t border-slate-800 flex items-center space-x-3 text-xs">
            <Volume2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-300 whitespace-nowrap">Music Volume:</span>
            <input
              type="range"
              id="slider-music-volume"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onUpdateMusicVolume(val);
                audioSynth.setMusicVolume(val);
              }}
              className="w-full accent-amber-500"
            />
            <span className="text-amber-400 font-bold w-8 text-right">{Math.round(musicVolume * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

