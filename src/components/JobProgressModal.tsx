import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Mic, 
  Film, 
  Cpu,
  Video 
} from 'lucide-react';
import { GenerationJob } from '../types';

interface JobProgressModalProps {
  job: GenerationJob | null;
  onCancel?: () => void;
}

export const JobProgressModal: React.FC<JobProgressModalProps> = ({ job, onCancel }) => {
  if (!job || job.status === 'completed' || job.status === 'idle') return null;

  const pipelineSteps = [
    { key: 'analyzing', label: '1. Clothing Feature Extraction', icon: Layers },
    { key: 'model_selection', label: '2. AI Model & Environment Setup', icon: Cpu },
    { key: 'image_generation', label: '3. Photorealistic 9:16 Model Shots', icon: Sparkles },
    { key: 'fidelity_check', label: '4. Fabric & Border Fidelity Audit', icon: ShieldCheck },
    { key: 'talking_model', label: '5. Talking Model Synthesis & Lip-Sync', icon: Video },
    { key: 'video_generation', label: '6. Real AI Fashion Motion Generation', icon: Film },
    { key: 'script_generation', label: '7. Malayalam & English Copywriting', icon: FileText },
    { key: 'voice_synthesis', label: '8. Audio & Subtitles Generation', icon: Mic },
    { key: 'assembling', label: '9. Final Reel Video Composition', icon: Film }
  ];

  const currentStepIndex = pipelineSteps.findIndex((s) => s.key === job.step);
  const activeStepIdx = currentStepIndex >= 0 ? currentStepIndex : 2;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-up text-white">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-950/60 animate-pulse">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-base font-bold">AI Virtual Fashion Studio Pipeline</h3>
          <p className="text-xs text-slate-400 mt-1">{job.message || 'Synthesizing 9:16 Video Reel...'}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>Overall Progress</span>
            <span className="text-amber-400 font-bold">{job.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${job.progress}%` }}
            />
          </div>
        </div>

        {/* Step List */}
        <div className="space-y-2 mb-6">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < activeStepIdx;
            const isCurrent = idx === activeStepIdx;

            return (
              <div
                key={step.key}
                className={`flex items-center space-x-3 p-2 rounded-lg text-xs transition-all ${
                  isCurrent
                    ? 'bg-rose-950/40 text-white font-bold border border-rose-500/30'
                    : isDone
                    ? 'text-emerald-400 font-medium'
                    : 'text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-[10px] text-slate-500">
            Powered by Google Gemini 3.7 & Video AI Engine
          </p>
        </div>
      </div>
    </div>
  );
};
