import React, { useState } from 'react';
import { Users, Sparkles, Check, Crown, Eye } from 'lucide-react';
import { AIModelProfile, TargetGender } from '../types';
import { AI_MODELS_PRESETS } from '../data/presets';

interface AIModelLibraryViewProps {
  onSelectModelAndCreate: (model: AIModelProfile) => void;
}

export const AIModelLibraryView: React.FC<AIModelLibraryViewProps> = ({
  onSelectModelAndCreate
}) => {
  const [selectedGender, setSelectedGender] = useState<TargetGender | 'all'>('all');

  const filtered = selectedGender === 'all'
    ? AI_MODELS_PRESETS
    : AI_MODELS_PRESETS.filter((m) => m.gender === selectedGender);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-rose-500" />
            <span>Kerala Native AI Model Rosters</span>
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              🌴 100% Kerala Native Models
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Photorealistic Kerala Malayali virtual model identities across Women, Men, Girls, Boys, and Kerala Heritage Studio photography.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'women', 'men', 'girls', 'boys', 'product_only'] as const).map((g) => (
            <button
              key={g}
              id={`filter-gender-${g}`}
              onClick={() => setSelectedGender(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedGender === g
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g === 'all' ? 'All Models' : g.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((model) => (
          <div
            key={model.id}
            id={`model-view-card-${model.id}`}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-rose-500/60 transition-all shadow-md"
          >
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img
                src={model.avatarUrl}
                alt={model.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300">
                {model.code}
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold capitalize">
                {model.gender.replace('_', ' ')}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-white">{model.name}</h3>
              <div className="text-xs text-amber-400/90 font-medium mt-0.5">{model.ethnicity}</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                {model.description}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-850">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5">
                  Best For:
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {model.recommendedGarments.slice(0, 3).map((g, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5 rounded">
                      {g}
                    </span>
                  ))}
                </div>

                <button
                  id={`btn-shoot-with-model-${model.id}`}
                  onClick={() => onSelectModelAndCreate(model)}
                  className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold py-2 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Shoot With {model.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
