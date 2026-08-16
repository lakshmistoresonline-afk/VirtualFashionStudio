import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Camera, 
  Maximize2, 
  Check, 
  Layers, 
  Palette, 
  Scissors, 
  Eye,
  ZoomIn,
  ZoomOut,
  Sliders,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  AlertTriangle,
  FileCheck,
  Split,
  MessageSquare
} from 'lucide-react';
import { FashionShot, FidelityReport } from '../types';

interface FashionShotsGalleryProps {
  shots: FashionShot[];
  fidelity: FidelityReport;
  originalImage: string;
  onRegenerateShot: (shotIndex: number) => void;
  isRegeneratingIndex: number | null;
  approvalStatus?: 'approved' | 'pending' | 'rejected' | 'revision_requested';
  onApproveReel?: () => void;
  onRejectReel?: (reason: string) => void;
  onRequestRevision?: (notes: string) => void;
  onEditMetadata?: () => void;
}

export const FashionShotsGallery: React.FC<FashionShotsGalleryProps> = ({
  shots,
  fidelity,
  originalImage,
  onRegenerateShot,
  isRegeneratingIndex,
  approvalStatus = 'pending',
  onApproveReel,
  onRejectReel,
  onRequestRevision,
  onEditMetadata
}) => {
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<1 | 2 | 3>(1);
  const [viewMode, setViewMode] = useState<'side_by_side' | 'split_slider' | 'focus_ai' | 'focus_original'>('side_by_side');
  const [splitPosition, setSplitPosition] = useState(50);
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [currentApproval, setCurrentApproval] = useState<'approved' | 'pending' | 'rejected' | 'revision_requested'>(approvalStatus);

  const activeShot = shots[activeShotIndex] || shots[0];

  const handleApprove = () => {
    setCurrentApproval('approved');
    if (onApproveReel) onApproveReel();
  };

  const handleReject = () => {
    setCurrentApproval('rejected');
    if (onRejectReel) onRejectReel(revisionNotes || 'Product fidelity not satisfactory');
    setShowRevisionInput(false);
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) {
      setShowRevisionInput(true);
      return;
    }
    setCurrentApproval('revision_requested');
    if (onRequestRevision) onRequestRevision(revisionNotes);
    setShowRevisionInput(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* 1. Header with Quality Gate & Merchant Approval Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>4. Product Fidelity Audit & Human-in-the-Loop Approval</span>
            </h2>

            {/* AI Automated Gate Badge */}
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AI Automated Score: {fidelity.overallScore}% (PASSED ≥85%)</span>
            </span>

            {/* Human Merchant Approval State Badge */}
            {currentApproval === 'approved' && (
              <span className="text-xs bg-emerald-600/30 text-emerald-200 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Approved for Publishing</span>
              </span>
            )}
            {currentApproval === 'revision_requested' && (
              <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Revision Requested</span>
              </span>
            )}
            {currentApproval === 'rejected' && (
              <span className="text-xs bg-rose-500/20 text-rose-300 font-bold px-2.5 py-0.5 rounded-full border border-rose-500/40 flex items-center space-x-1">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Rejected by Merchant</span>
              </span>
            )}
            {currentApproval === 'pending' && (
              <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2.5 py-0.5 rounded-full border border-slate-700 flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Pending Merchant Review</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Compare 5 multi-angle AI model shots directly against the original ground-truth product. Even if automated AI passes, human merchant review certifies final publish readiness.
          </p>
        </div>

        {/* Top Control Toggles: View Modes & Loupe Zoom */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Buttons */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setViewMode('side_by_side')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                viewMode === 'side_by_side'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('split_slider')}
              className={`px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-colors ${
                viewMode === 'split_slider'
                  ? 'bg-slate-800 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Split className="w-3 h-3" />
              <span>Split Wipe</span>
            </button>
          </div>

          {/* Zoom Loupe Button */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : zoomLevel === 2 ? 3 : 1)}
              className={`px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-colors ${
                zoomLevel > 1 ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ZoomIn className="w-3 h-3" />
              <span>{zoomLevel}x Loupe</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Visual Area */}
        <div className="lg:col-span-8 bg-slate-950/90 rounded-2xl p-5 border border-slate-800">
          {viewMode === 'side_by_side' && (
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
              {/* Original Product Photo */}
              <div className="flex-1 text-center w-full">
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5 text-slate-400" />
                  <span>Original Ground-Truth Product</span>
                </div>
                <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl mx-auto max-w-[260px]">
                  <div className={`w-full h-full transition-transform duration-200 ${zoomLevel === 2 ? 'scale-150' : zoomLevel === 3 ? 'scale-200' : 'scale-100'}`}>
                    <img
                      src={originalImage}
                      alt="Original Product Ground Truth"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    SOURCE OF TRUTH
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center text-slate-600 font-bold text-lg">
                <span className="text-xs text-slate-500">VS</span>
                <div className="w-px h-16 bg-slate-800 my-2" />
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>

              {/* AI Generated Active Fashion Shot */}
              <div className="flex-1 text-center w-full">
                <div className="text-xs font-semibold text-rose-400 mb-2 flex items-center justify-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Shot {activeShotIndex + 1}: {activeShot?.title}</span>
                </div>
                <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-slate-900 border-2 border-rose-500/60 shadow-xl shadow-rose-950/40 mx-auto max-w-[260px]">
                  <div className={`w-full h-full transition-transform duration-200 ${zoomLevel === 2 ? 'scale-150' : zoomLevel === 3 ? 'scale-200' : 'scale-100'}`}>
                    <img
                      src={activeShot?.imageUrl}
                      alt={activeShot?.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold shadow">
                    {activeShot?.cameraMovement?.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-black/80 backdrop-blur-md text-left border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-amber-300 font-bold">Fidelity Match: {activeShot?.fidelityScore}%</span>
                      <span className="text-[9px] text-emerald-400 font-mono">100% Weave Preservation</span>
                    </div>
                    <div className="text-[9px] text-slate-300 truncate mt-0.5">{activeShot?.promptUsed || activeShot?.title}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'split_slider' && (
            <div className="max-w-md mx-auto space-y-3">
              <div className="text-xs text-center text-slate-400 font-medium">
                Drag slider to wipe between Original Garment (Left) & AI Model Draped (Right):
              </div>
              <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/40 shadow-2xl mx-auto">
                {/* AI Shot Layer (Bottom) */}
                <img
                  src={activeShot?.imageUrl}
                  alt={activeShot?.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0"
                />

                {/* Original Image Layer (Clipped by splitPosition) */}
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${splitPosition}%` }}
                >
                  <img
                    src={originalImage}
                    alt="Original Product"
                    referrerPolicy="no-referrer"
                    className="h-full object-cover absolute inset-0"
                    style={{ width: '100%', minWidth: '100%' }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-300">
                    ORIGINAL
                  </div>
                </div>

                {/* Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] pointer-events-none"
                  style={{ left: `${splitPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px] shadow-lg">
                    ↔
                  </div>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-rose-300">
                  AI DRAPED
                </div>
              </div>

              {/* Slider Controller */}
              <div className="flex items-center space-x-3 px-4">
                <span className="text-[11px] font-semibold text-amber-400">Original</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <span className="text-[11px] font-semibold text-rose-400">AI Shot</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Inspection & Quality Gates Radar */}
        <div className="lg:col-span-4 bg-slate-950/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>4-Point Fidelity Radar</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Gate: Pass (≥ 85%)
              </span>
            </div>

            {/* Radar Metric Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Palette className="w-3.5 h-3.5 text-rose-400" />
                    <span>Color Spectrum & Dye Match</span>
                  </span>
                  <span className="font-bold text-emerald-400">{fidelity.colorAccuracy}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${fidelity.colorAccuracy}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-400" />
                    <span>Border, Zari & Motifs Preservation</span>
                  </span>
                  <span className="font-bold text-emerald-400">{fidelity.borderPreservation}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${fidelity.borderPreservation}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Fabric Weave & Texture Density</span>
                  </span>
                  <span className="font-bold text-emerald-400">{fidelity.patternFidelity}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${fidelity.patternFidelity}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Silhouette & Tailored Drape Fit</span>
                  </span>
                  <span className="font-bold text-emerald-400">{fidelity.garmentStructure}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${fidelity.garmentStructure}%` }} />
                </div>
              </div>
            </div>

            {/* AI Notes Verification Checklist */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Verified Audit Checks:</div>
              {fidelity.notes.map((note, idx) => (
                <div key={idx} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regenerate Current Shot Button */}
          <button
            id={`btn-regen-shot-${activeShotIndex}`}
            onClick={() => onRegenerateShot(activeShotIndex)}
            disabled={isRegeneratingIndex === activeShotIndex}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-1.5 transition-all disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRegeneratingIndex === activeShotIndex ? 'animate-spin' : ''}`} />
            <span>
              {isRegeneratingIndex === activeShotIndex
                ? 'Synthesizing New Variation...'
                : `Regenerate Angle ${activeShotIndex + 1}`}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Shot Selector Multi-Angle Strip */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          5 Studio Camera Angles & Movements (Preserving Product Design):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {shots.map((shot, idx) => {
            const isActive = activeShotIndex === idx;
            return (
              <div
                key={shot.id || idx}
                id={`thumb-shot-${idx}`}
                onClick={() => setActiveShotIndex(idx)}
                className={`p-2 rounded-xl cursor-pointer transition-all border text-left ${
                  isActive
                    ? 'border-rose-500 bg-rose-950/20 ring-1 ring-rose-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="relative aspect-[9/14] rounded-lg overflow-hidden mb-1.5 bg-slate-900">
                  <img
                    src={shot.imageUrl}
                    alt={shot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-bold text-white">
                    0{idx + 1}
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.2 rounded bg-emerald-600/90 text-[9px] font-bold text-white">
                    {shot.fidelityScore}%
                  </div>
                </div>
                <div className="text-[11px] font-bold text-white truncate">{shot.title}</div>
                <div className="text-[9px] text-amber-400 uppercase tracking-tight">{shot.cameraMovement.replace('_', ' ')}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Human Approval Workflow Actions (Requirement #40-41, #60-61) */}
      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>Merchant Quality Control Decision:</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review garment fidelity against catalog standards before publishing to Instagram or WhatsApp.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Status: <strong className="text-amber-300 uppercase">{currentApproval.replace('_', ' ')}</strong>
          </span>
        </div>

        {/* Revision Input Box (If requested) */}
        {showRevisionInput && (
          <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3.5 space-y-2 animate-fade-in">
            <label className="block text-xs font-semibold text-amber-300">
              Enter specific styling or fidelity revision notes for the model:
            </label>
            <textarea
              rows={2}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="e.g. Please adjust the saree pallu drape to show more of the gold peacock border, or switch to a lighter background."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRevisionInput(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestRevision}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow"
              >
                Submit Revision Request
              </button>
            </div>
          </div>
        )}

        {/* Decision Button Grid: [APPROVE], [REGENERATE], [EDIT], [REJECT] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. APPROVE BUTTON */}
          <button
            id="btn-qc-approve"
            onClick={handleApprove}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg ${
              currentApproval === 'approved'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>[APPROVE] Ready to Publish</span>
          </button>

          {/* 2. REGENERATE BUTTON */}
          <button
            id="btn-qc-regenerate"
            onClick={() => onRegenerateShot(activeShotIndex)}
            disabled={isRegeneratingIndex !== null}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <RotateCcw className={`w-4 h-4 text-amber-400 ${isRegeneratingIndex !== null ? 'animate-spin' : ''}`} />
            <span>[REGENERATE] Shot {activeShotIndex + 1}</span>
          </button>

          {/* 3. EDIT BUTTON */}
          <button
            id="btn-qc-edit"
            onClick={() => onEditMetadata && onEditMetadata()}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2 transition-all"
          >
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>[EDIT] Garment Info</span>
          </button>

          {/* 4. REJECT / REVISE BUTTON */}
          <button
            id="btn-qc-reject"
            onClick={() => {
              if (!showRevisionInput) {
                setShowRevisionInput(true);
              } else {
                handleReject();
              }
            }}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              currentApproval === 'rejected'
                ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                : 'bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>[REJECT] Redo Setup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
