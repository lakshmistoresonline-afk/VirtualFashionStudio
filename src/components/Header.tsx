import React from 'react';
import { 
  LayoutDashboard,
  Sparkles, 
  Video, 
  FolderPlus, 
  Users, 
  Layers, 
  Building2, 
  Music, 
  Layers3, 
  Settings, 
  Zap, 
  TestTube2,
  Film
} from 'lucide-react';
import { AdminSettings } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: AdminSettings;
  onToggleAiMode: () => void;
  productCount: number;
  reelCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  onToggleAiMode,
  productCount,
  reelCount
}) => {
  const tabs = [
    { id: 'studio', label: 'Studio Reel Creator', icon: Sparkles, badge: '9:16' },
    { id: 'reels', label: 'Reels Gallery', icon: Film, count: reelCount },
    { id: 'models', label: 'Kerala AI Models', icon: Users, badge: '100%' },
    { id: 'templates', label: 'Storylines', icon: Layers },
    { id: 'brand', label: 'Branding', icon: Building2 },
    { id: 'music', label: 'Audio Scores', icon: Music }
  ];

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 text-white backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-950/40 border border-amber-400/30">
              <span className="text-sm font-black tracking-wider text-white">LS</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">Lakshmi Stores</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  AI Virtual Fashion Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Showcase Fabrics & Sarees • Kerala Models • Malayalam Reels & WhatsApp</p>
            </div>
          </div>

          {/* AI Mode Toggle & Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              id="btn-toggle-ai-mode"
              onClick={onToggleAiMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                settings.aiMode === 'live'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 shadow-sm'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm'
              }`}
              title={settings.aiMode === 'live' ? 'Using Gemini API for live processing' : 'Using instant offline mock engine'}
            >
              {settings.aiMode === 'live' ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">AI Mode: Live Gemini</span>
                  <span className="sm:hidden">Gemini</span>
                </>
              ) : (
                <>
                  <TestTube2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">AI Mode: High-Speed Demo</span>
                  <span className="sm:hidden">Fast Demo</span>
                </>
              )}
            </button>

            <button
              id="btn-quick-create-reel"
              onClick={() => setActiveTab('studio')}
              className="bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-rose-900/40 flex items-center space-x-1.5 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Create Reel</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-rose-800 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold border ${
                    isActive 
                      ? 'bg-amber-300 text-amber-950 border-amber-400' 
                      : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
