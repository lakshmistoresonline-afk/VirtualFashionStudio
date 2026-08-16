import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Tag, 
  Layers, 
  Palette, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  RefreshCw,
  Maximize2,
  X
} from 'lucide-react';
import { ProductAnalysis, UserProductInfo } from '../types';

interface ActiveProductBarProps {
  originalImage: string | null;
  analysis: ProductAnalysis | null;
  userInfo: UserProductInfo;
  onChangePhoto?: () => void;
  compact?: boolean;
}

export const ActiveProductBar: React.FC<ActiveProductBarProps> = ({
  originalImage,
  analysis,
  userInfo,
  onChangePhoto,
  compact = false
}) => {
  const [showFullModal, setShowFullModal] = useState(false);

  if (!originalImage) return null;

  const isShirting = analysis?.isShirtingMaterial || analysis?.category?.toLowerCase().includes('shirt');
  const isPrinted = analysis?.shirtingType === 'printed' || analysis?.pattern?.toLowerCase().includes('print');

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-amber-500/30 rounded-2xl p-3.5 shadow-lg shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Product Thumbnail & Details */}
          <div className="flex items-center space-x-3 min-w-0">
            {/* Clickable Image Thumbnail */}
            <div 
              onClick={() => setShowFullModal(true)}
              className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border-2 border-amber-400/60 flex-shrink-0 cursor-pointer group shadow-md"
              title="Click to view full original product"
            >
              <img
                src={originalImage}
                alt="Showcased Product"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-amber-600/90 py-0.5 text-[8px] font-bold text-white text-center uppercase tracking-tighter">
                Showcased
              </div>
            </div>

            {/* Product Meta */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center space-x-1">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>Garment in Showcase</span>
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>AI Draped</span>
                </span>
                {isShirting && (
                  <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                    isPrinted ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {isPrinted ? 'Printed Shirting' : 'Plain Shirting'}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white truncate mt-0.5">
                {userInfo.productName || analysis?.subcategory || analysis?.category || 'Fashion Garment'}
              </h3>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300 mt-1">
                {userInfo.price ? (
                  <span className="text-amber-300 font-bold">₹{userInfo.price.toLocaleString('en-IN')}{isShirting ? '/m' : ''}</span>
                ) : null}
                {analysis?.primaryColor && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                      <span>{analysis.primaryColor}</span>
                    </span>
                  </>
                )}
                {analysis?.fabricAppearance && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 truncate max-w-[200px]">
                      {analysis.fabricAppearance}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
            <button
              type="button"
              id="btn-inspect-product"
              onClick={() => setShowFullModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspect Garment</span>
            </button>

            {onChangePhoto && (
              <button
                type="button"
                id="btn-change-showcase-photo"
                onClick={onChangePhoto}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-700/60 flex items-center space-x-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Switch Photo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Modal Viewer */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Original Showcased Product</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowFullModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 border border-slate-700 max-h-[60vh] mx-auto">
              <img
                src={originalImage}
                alt="Original Product Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Product Name:</span>
                <span className="font-bold text-white">{userInfo.productName || 'Fashion Garment'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category & Weave:</span>
                <span className="font-semibold text-amber-300">{analysis?.category} • {analysis?.fabricAppearance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dominant Palette:</span>
                <span className="text-slate-200">{analysis?.primaryColor} ({analysis?.secondaryColors?.join(', ')})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Preservation Status:</span>
                <span className="text-emerald-400 font-bold">100% Weave, Border & Color Transfer to Model</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFullModal(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
