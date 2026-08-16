import React from 'react';
import { 
  Check, 
  Sparkles, 
  UserCheck, 
  RefreshCw, 
  Building, 
  Sun, 
  Church, 
  ShoppingBag, 
  Trees, 
  SlidersHorizontal,
  Crown
} from 'lucide-react';
import { AIModelProfile, ShootEnvironment, TargetGender } from '../types';
import { AI_MODELS_PRESETS } from '../data/presets';

interface ModelSelectorProps {
  recommendedModel: AIModelProfile;
  selectedModel: AIModelProfile;
  onSelectModel: (model: AIModelProfile) => void;
  selectedEnvironment: ShootEnvironment;
  onSelectEnvironment: (env: ShootEnvironment) => void;
  targetGender: TargetGender;
  onSelectGender: (gender: TargetGender) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  recommendedModel,
  selectedModel,
  onSelectModel,
  selectedEnvironment,
  onSelectEnvironment,
  targetGender,
  onSelectGender
}) => {
  const genderTabs: Array<{ id: TargetGender; label: string }> = [
    { id: 'women', label: '👩 Women' },
    { id: 'men', label: '👨 Men' },
    { id: 'girls', label: '👧 Girls' },
    { id: 'boys', label: '👦 Boys' },
    { id: 'product_only', label: '✨ Product Only (No Model)' }
  ];

  const environments: Array<{ id: ShootEnvironment; label: string; icon: any; desc: string }> = [
    {
      id: 'traditional_kerala',
      label: 'Kerala Heritage (Nalukettu)',
      icon: Building,
      desc: 'Teak pillars, brass lamp (Nilavilakku), authentic courtyard'
    },
    {
      id: 'wedding_temple',
      label: 'Royal Temple & Wedding',
      icon: Church,
      desc: 'Grand golden temple architecture, marigold flowers, auspicious glow'
    },
    {
      id: 'festival_onam',
      label: 'Onam / Vishu Festival',
      icon: Sun,
      desc: 'Pookkalam flower carpet, festive sunlight, celebratory atmosphere'
    },
    {
      id: 'premium_studio',
      label: 'Royale Luxury Studio',
      icon: Crown,
      desc: 'High-contrast studio lighting, soft gold rim reflections, sleek dark backdrop'
    },
    {
      id: 'boutique_interior',
      label: 'Modern Boutique',
      icon: ShoppingBag,
      desc: 'Chic designer showroom, warm ambient spotlighting'
    },
    {
      id: 'outdoor_nature',
      label: 'Kerala Backwaters & Greens',
      icon: Trees,
      desc: 'Coconut palms, scenic natural daylight, calm river backdrop'
    }
  ];

  const filteredModels = AI_MODELS_PRESETS.filter(
    (m) => m.gender === targetGender || (targetGender === 'product_only' && m.id === 'p01')
  );

  const isUsingRecommendation = selectedModel.id === recommendedModel.id;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>3. AI Model Recommendation & Customization</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
              <span>🌴 100% Kerala Native Models Only</span>
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exclusively authentic Malayali / Kerala models with traditional facial features, hairstyles, and styling tailored for Kerala retail brands like Lakshmi Stores.
          </p>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="mb-6 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/15 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <img
            src={recommendedModel.avatarUrl}
            alt={recommendedModel.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md flex-shrink-0"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommended Model</span>
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                98% Match
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{recommendedModel.name}</h4>
            <p className="text-xs text-slate-300/80">{recommendedModel.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            id="btn-accept-recommendation"
            onClick={() => {
              onSelectGender(recommendedModel.gender);
              onSelectModel(recommendedModel);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              isUsingRecommendation
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isUsingRecommendation ? 'Active Selection' : 'Use Recommendation'}</span>
          </button>
        </div>
      </div>

      {/* Target Gender Category Filter */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Model Category / Target Audience:
        </label>
        <div className="flex flex-wrap gap-2">
          {genderTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-gender-${tab.id}`}
              onClick={() => {
                onSelectGender(tab.id);
                const first = AI_MODELS_PRESETS.find((m) => m.gender === tab.id);
                if (first) onSelectModel(first);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                targetGender === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Model Library Grid */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Select AI Model Identity:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {filteredModels.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <div
                key={model.id}
                id={`card-model-${model.id}`}
                onClick={() => onSelectModel(model)}
                className={`relative rounded-xl p-3 cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'border-rose-500 bg-rose-950/30 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-slate-900">
                  <img
                    src={model.avatarUrl}
                    alt={model.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-amber-300">
                    {model.code}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white truncate" title={model.name}>{model.name}</h4>
                <div className="text-[10px] text-emerald-400 font-semibold truncate mt-0.5">{model.ethnicity}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{model.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photoshoot Environment */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Photoshoot Backdrop & Atmosphere:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {environments.map((env) => {
            const Icon = env.icon;
            const isSelected = selectedEnvironment === env.id;
            return (
              <button
                key={env.id}
                id={`env-${env.id}`}
                onClick={() => onSelectEnvironment(env.id)}
                className={`flex items-start space-x-3 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500/80 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-950 text-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white">{env.label}</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{env.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
