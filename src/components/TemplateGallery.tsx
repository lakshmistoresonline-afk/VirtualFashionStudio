import React from 'react';
import { Layers, Clock, Sparkles, Check, Flame } from 'lucide-react';
import { ReelTemplate } from '../types';
import { TEMPLATES_PRESETS } from '../data/presets';

interface TemplateGalleryProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: ReelTemplate) => void;
  onApplyAndCreate: (template: ReelTemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  onApplyAndCreate
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Curated Reel Storyline Templates</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Proven high-converting pacing, shot angles, and Malayalam copywriting structures designed for Kerala fashion retail.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TEMPLATES_PRESETS.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <div
              key={template.id}
              id={`template-card-${template.id}`}
              className={`bg-slate-950 rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-950/20 shadow-xl shadow-rose-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{template.name}</span>
                      {template.pacing === 'fast' && (
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-rose-400" />
                          <span>Trending</span>
                        </span>
                      )}
                    </h3>
                    <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                      {template.category} • {template.aspectRatio || '9:16'}
                    </div>
                  </div>

                  <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300 font-semibold flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{template.durationSec || template.recommendedDuration || 15}s Reel</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Shot Sequence Breakdown */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Pacing & Angle Breakdown:
                  </div>
                  {(template.shotSequence || [
                    { title: 'Dramatic Opening Hook', cameraMovement: 'Slow push in' },
                    { title: 'Full Length Model Showcase', cameraMovement: 'Smooth pan' },
                    { title: 'Fabric & Embroidery Macro', cameraMovement: 'Macro zoom' },
                    { title: 'Brand Call-to-Action', cameraMovement: 'Static hero frame' }
                  ]).map((shot, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between"
                    >
                      <span className="font-semibold text-rose-300">0{idx + 1}. {shot.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{shot.cameraMovement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-slate-850">
                <button
                  id={`btn-select-template-${template.id}`}
                  onClick={() => onSelectTemplate(template)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Active Template' : 'Select Template'}</span>
                </button>

                <button
                  id={`btn-use-template-${template.id}`}
                  onClick={() => onApplyAndCreate(template)}
                  className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create Reel With This</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
