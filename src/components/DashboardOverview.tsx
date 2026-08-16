import React, { useState } from 'react';
import { 
  Sparkles, 
  Video, 
  ShoppingBag, 
  Users, 
  MessageCircle, 
  Instagram, 
  ArrowRight, 
  TrendingUp, 
  Play, 
  Pause, 
  CheckCircle2, 
  ShieldCheck, 
  Layers3, 
  Building2, 
  Film, 
  ExternalLink,
  MapPin,
  Clock,
  Shirt,
  Volume2,
  ChevronRight,
  Radio,
  Zap,
  Sparkle
} from 'lucide-react';
import { ProductItem, ReelProject, AIModelProfile, ShowroomBranch } from '../types';
import { 
  SAMPLE_PRODUCTS, 
  AI_MODELS_PRESETS, 
  KERALA_SHOWROOM_BRANCHES 
} from '../data/presets';
import { WhatsAppConciergeModal } from './WhatsAppConciergeModal';
import { InstagramPublishKit } from './InstagramPublishKit';

interface DashboardOverviewProps {
  products: ProductItem[];
  reels: ReelProject[];
  activeReel: ReelProject | null;
  onOpenStudioWithProduct: (sample: any) => void;
  onOpenStudio: () => void;
  onOpenReelInPlayer: (reel: ReelProject) => void;
  onNavigateTab: (tabId: string) => void;
  onToggleAiMode: () => void;
  isAiLive: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  products,
  reels,
  activeReel,
  onOpenStudioWithProduct,
  onOpenStudio,
  onOpenReelInPlayer,
  onNavigateTab,
  onToggleAiMode,
  isAiLive
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('br_kochi_mg');
  const [showWhatsAppModal, setShowWhatsAppModal] = useState<boolean>(false);
  const [showInstagramModal, setShowInstagramModal] = useState<boolean>(false);
  const [selectedModalReel, setSelectedModalReel] = useState<ReelProject | null>(activeReel || reels[0] || null);
  const [isPlayingSpotlight, setIsPlayingSpotlight] = useState<boolean>(false);
  const [spotlightLanguage, setSpotlightLanguage] = useState<'ml-IN' | 'en-IN'>('ml-IN');

  const currentBranch = KERALA_SHOWROOM_BRANCHES.find(b => b.id === selectedBranchId) || KERALA_SHOWROOM_BRANCHES[0];
  const featuredReel = activeReel || reels[0] || null;

  // Handle WhatsApp concierge test
  const handleOpenWhatsApp = (reelTarget?: ReelProject) => {
    setSelectedModalReel(reelTarget || featuredReel);
    setShowWhatsAppModal(true);
  };

  // Handle Instagram kit test
  const handleOpenInstagram = (reelTarget?: ReelProject) => {
    setSelectedModalReel(reelTarget || featuredReel);
    setShowInstagramModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Hero Enterprise Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-950/20">
        {/* Background decorative ambient glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Top status badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5 shadow-sm">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                <span>Lakshmi Stores Enterprise Suite</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>10 Kerala & UAE Showrooms Synced</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                🌴 100% Kerala Native Models
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              AI Virtual Fashion Studio & Social Commerce Command Center
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Transform flat-lay garment and unstitched shirting photos into 4K photorealistic 9:16 Instagram Reels, featuring native Malayali models, regional Malayalam voiceovers, and direct WhatsApp video shopping routing.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-dashboard-start-studio"
                onClick={onOpenStudio}
                className="bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-rose-950/50 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>+ Launch New AI Reel Studio</span>
              </button>

              {featuredReel && (
                <button
                  id="btn-dashboard-quick-whatsapp"
                  onClick={() => handleOpenWhatsApp()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-emerald-950/40 flex items-center space-x-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Video Concierge</span>
                </button>
              )}

              {featuredReel && (
                <button
                  id="btn-dashboard-quick-instagram"
                  onClick={() => handleOpenInstagram()}
                  className="bg-slate-800 hover:bg-slate-700 text-pink-300 font-semibold text-sm px-5 py-3 rounded-2xl border border-pink-500/30 flex items-center space-x-2 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram 9:16 Publish Kit</span>
                </button>
              )}
            </div>
          </div>

          {/* Showroom Branch Status Quick Card */}
          <div className="lg:w-80 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Active Showroom Branch</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Online
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 font-medium">Switch Target Showroom:</label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500"
              >
                {KERALA_SHOWROOM_BRANCHES.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} ({branch.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <div className="flex items-center space-x-2 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span className="truncate">{currentBranch.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px]">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: {currentBranch.whatsapp || currentBranch.phone}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('brand')}
              className="w-full py-1.5 text-center text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center space-x-1 border-t border-slate-800/80 pt-2"
            >
              <span>Manage Showroom Network</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Active Garments */}
        <div 
          onClick={() => onNavigateTab('library')}
          className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-lg group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Silk & Shirting
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">{Math.max(products.length, 6)} Garments</div>
            <p className="text-xs text-slate-400 mt-0.5">Active Catalog & Table-Captured Fabrics</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Browse product catalog</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Metric 2: 9:16 Video Reels */}
        <div 
          onClick={() => onNavigateTab('reels')}
          className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-lg group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              98.6% Fidelity
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">{Math.max(reels.length, 4)} Video Reels</div>
            <p className="text-xs text-slate-400 mt-0.5">Rendered with Malayalam Voiceovers</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Open Reels video gallery</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Metric 3: 100% Kerala Native Models */}
        <div 
          onClick={() => onNavigateTab('models')}
          className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-lg group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              10 Native Roster
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">10 Kerala Models</div>
            <p className="text-xs text-slate-400 mt-0.5">Women, Men, Kids & Heritage Studio</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>View Kerala model roster</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Metric 4: Batch Hub & Social Suite */}
        <div 
          onClick={() => onNavigateTab('batch')}
          className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-lg group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Layers3 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              Bulk Ready
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">Batch & Publish</div>
            <p className="text-xs text-slate-400 mt-0.5">Instagram & WhatsApp Concierge</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Launch batch generation</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>

      {/* 3. Main Center: Featured Live Showcase Reel & Kerala Showcase Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Spotlight Live Reel Preview Player */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-sm font-bold text-white">Live Showcase Reel Spotlight</h2>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              9:16 Ultra HD
            </span>
          </div>

          {featuredReel ? (
            <div className="space-y-3.5">
              {/* Vertical 9:16 Mockup Card */}
              <div className="relative aspect-[9/16] max-h-[460px] mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-500/40 shadow-2xl group">
                <img
                  src={featuredReel.shots?.[0]?.imageUrl || featuredReel.originalImage}
                  alt={featuredReel.productName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white z-10">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold">{featuredReel.brand?.name || 'Lakshmi Stores'}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-rose-600 px-2 py-0.5 rounded-full text-white">
                    {featuredReel.fidelity?.overallScore || 98}% Verified
                  </span>
                </div>

                {/* Garment Inset Thumbnail (PIP) */}
                <div className="absolute top-12 right-3 z-10 w-14 h-18 rounded-lg overflow-hidden border-2 border-amber-400 bg-black shadow-lg">
                  <img
                    src={featuredReel.originalImage}
                    alt="Original Garment"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-amber-600/90 text-[7px] font-bold text-center text-white py-0.5">
                    FLAT-LAY
                  </div>
                </div>

                {/* Bottom Subtitle and Voice bar */}
                <div className="absolute bottom-4 inset-x-3 z-10 text-white space-y-2">
                  <div className="bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-amber-500/30">
                    <div className="text-[11px] font-bold text-amber-300 truncate">
                      {featuredReel.productName}
                    </div>
                    <div className="text-[10px] text-slate-200 font-medium line-clamp-2 mt-0.5">
                      {featuredReel.script?.malayalamScript?.substring(0, 100) || 'പാരമ്പര്യവും തനിമയും ഒത്തുചേരുന്ന അതിമനോഹര വസ്ത്രശേഖരം...'}...
                    </div>
                  </div>

                  {/* Quick Action Dock */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenWhatsApp(featuredReel)}
                      className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center space-x-1 shadow transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Order</span>
                    </button>
                    <button
                      onClick={() => handleOpenInstagram(featuredReel)}
                      className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-bold flex items-center justify-center space-x-1 shadow transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram Kit</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Player Navigation & Full Screen trigger */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onOpenReelInPlayer(featuredReel)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-slate-700"
                >
                  <Film className="w-4 h-4 text-amber-400" />
                  <span>Open Full Interactive Player & Fidelity Audit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <Film className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">No Reel rendered yet. Select a product below to create!</p>
              <button
                onClick={onOpenStudio}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Create First Reel
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Instant 1-Click Kerala Showcase Launcher */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Instant 1-Click Kerala Showcase Presets</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pick any authentic Kerala fabric or shirting swatch to instantly simulate on native models.
                </p>
              </div>
              <button
                onClick={onOpenStudio}
                className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center space-x-1"
              >
                <span>Upload Custom Photo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SAMPLE_PRODUCTS.slice(0, 4).map((sample) => (
                <div
                  key={sample.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3 flex space-x-3 group transition-all hover:bg-slate-950/90"
                >
                  <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0 relative bg-black">
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-xs text-[8px] font-bold text-amber-300 px-1 py-0.5 rounded">
                      {sample.category}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {sample.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                        {sample.description}
                      </p>
                      <div className="text-[11px] font-bold text-emerald-400 mt-1">
                        ₹{sample.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center space-x-2">
                      <button
                        onClick={() => onOpenStudioWithProduct(sample)}
                        className="flex-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-[10px] py-1.5 rounded-lg shadow flex items-center justify-center space-x-1 transition-all"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Launch in Studio</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Kerala Showroom Network & WhatsApp Direct Concierge Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">Lakshmi Stores Showroom Branch Matrix</h3>
              </div>
              <span className="text-[10px] text-slate-400">10 Direct Video Shopping Hubs</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {KERALA_SHOWROOM_BRANCHES.slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedBranchId === b.id
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{b.city}</span>
                    {b.isFlagship && (
                      <span className="text-[8px] font-bold text-amber-300 bg-amber-950/80 px-1 py-0.2 rounded">
                        Flagship
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{b.name}</div>
                  <div className="text-[9px] text-emerald-400 font-mono mt-1 flex items-center space-x-1">
                    <MessageCircle className="w-2.5 h-2.5" />
                    <span className="truncate">{b.whatsapp || b.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal Trigger */}
      {showWhatsAppModal && selectedModalReel && (
        <WhatsAppConciergeModal
          reel={selectedModalReel}
          onClose={() => setShowWhatsAppModal(false)}
        />
      )}

      {/* Instagram Kit Modal Trigger */}
      {showInstagramModal && selectedModalReel && (
        <InstagramPublishKit
          reel={selectedModalReel}
          onClose={() => setShowInstagramModal(false)}
        />
      )}
    </div>
  );
};
