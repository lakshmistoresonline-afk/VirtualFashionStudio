import React, { useState } from 'react';
import { 
  Settings, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Activity,
  HardDrive,
  KeyRound
} from 'lucide-react';
import { AdminSettings } from '../types';

interface AdminPanelProps {
  settings: AdminSettings;
  onUpdateSettings: (newSettings: AdminSettings) => void;
  onResetDatabase: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  onUpdateSettings,
  onResetDatabase
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (updated: Partial<AdminSettings>) => {
    onUpdateSettings({
      ...settings,
      ...updated
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <span>AI Architecture & Engine Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure Google Gemini API orchestration, fidelity threshold gates, and offline demo fallback.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <div className="space-y-6 text-xs">
        {/* AI Mode Selector */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <label className="block text-slate-200 font-bold mb-2 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Active AI Mode</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="btn-mode-live"
              onClick={() => handleSave({ aiMode: 'live' })}
              className={`p-3 rounded-xl border text-left transition-all ${
                settings.aiMode === 'live'
                  ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-amber-300 flex items-center space-x-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Google Gemini API</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Uses <code>gemini-3.7-flash</code> for deep product feature extraction & Malayalam copywriting, and <code>gemini-3.1-flash-lite-image</code> for photorealistic clothing model synthesis.
              </p>
            </button>

            <button
              id="btn-mode-mock"
              onClick={() => handleSave({ aiMode: 'mock' })}
              className={`p-3 rounded-xl border text-left transition-all ${
                settings.aiMode === 'mock'
                  ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-emerald-300 flex items-center space-x-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Mock Studio (Zero Latency)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Generates high-resolution South Indian fashion model shoots, Malayalam scripts, and audio instantly from verified studio presets.
              </p>
            </button>
          </div>
        </div>

        {/* Fidelity Threshold Gate */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <label className="text-slate-200 font-bold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Product Fidelity Acceptance Gate</span>
            </label>
            <span className="text-emerald-400 font-bold">{settings.fidelityThreshold}% Minimum Score</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            If the AI generated model shoot fails to preserve the saree/garment's original weave, color, or border below this threshold, the pipeline automatically re-runs with corrective fidelity prompt enhancements.
          </p>
          <input
            type="range"
            id="slider-fidelity-threshold"
            min="70"
            max="95"
            step="1"
            value={settings.fidelityThreshold}
            onChange={(e) => handleSave({ fidelityThreshold: parseInt(e.target.value) })}
            className="w-full accent-emerald-500"
          />
        </div>

        {/* System Diagnostics & Storage Reset */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <HardDrive className="w-4 h-4 text-slate-400" />
              <span>Database & Preset Store</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Reset database to restore all default Kerala products, AI model profiles, and music scores.
            </p>
          </div>

          <button
            id="btn-reset-database"
            onClick={onResetDatabase}
            className="px-3.5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-bold text-xs transition-colors flex-shrink-0"
          >
            Reset Database to Factory Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
