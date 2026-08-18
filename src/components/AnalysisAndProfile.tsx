import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Layers, 
  Palette, 
  Scissors, 
  Eye, 
  Info,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { ProductAnalysis, UserProductInfo } from '../types';

interface AnalysisAndProfileProps {
  analysis: ProductAnalysis;
  userInfo: UserProductInfo;
  onUpdateUserInfo: (info: UserProductInfo) => void;
}

export const AnalysisAndProfile: React.FC<AnalysisAndProfileProps> = ({
  analysis,
  userInfo,
  onUpdateUserInfo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState<UserProductInfo>({ ...userInfo });

  const handleSave = () => {
    onUpdateUserInfo(tempInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">2. AI Product Analysis & Reference Profile</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
              <Check className="w-3 h-3" />
              <span>{analysis.confidence}% Confidence</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            AI has identified the fabric weave, color spectrum, border signatures, and draping structure.
          </p>
        </div>

        <button
          id="btn-edit-factual-info"
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setTempInfo({ ...userInfo });
              setIsEditing(true);
            }
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isEditing
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {isEditing ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Factual Info</span>
            </>
          )}
        </button>
      </div>

      {/* AI Extraction Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Category</span>
          </div>
          <div className="text-sm font-bold text-white">{analysis.category}</div>
          <div className="text-[11px] text-slate-400 truncate">{analysis.subcategory}</div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-semibold mb-1">
            <Palette className="w-3.5 h-3.5" />
            <span>Color Spectrum</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{analysis.primaryColor}</div>
          <div className="text-[11px] text-slate-400 truncate">{analysis.secondaryColors?.join(', ') || 'Traditional Palette'}</div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-1.5 text-xs text-indigo-400 font-semibold mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Fabric Weave</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{analysis.fabricAppearance}</div>
          <div className="text-[11px] text-slate-400 truncate">{analysis.printOrWeave}</div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <Scissors className="w-3.5 h-3.5" />
            <span>Border & Motifs</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{analysis.border}</div>
          <div className="text-[11px] text-slate-400 truncate">{analysis.motifs?.join(', ') || 'Traditional Signatures'}</div>
        </div>
      </div>

      {/* Shirting Material Tailor Simulation Card (if detected as shirting) */}
      {(analysis.isShirtingMaterial || analysis.category?.toLowerCase()?.includes('shirt') || userInfo.isShirtingMaterial) && (
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-950 to-indigo-950/40 border border-cyan-500/30 rounded-xl p-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-cyan-900/40">
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-cyan-200 flex items-center space-x-1.5">
                <span>👔 Shirting Material & Bespoke Tailor Simulation</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                (analysis.shirtingType === 'printed' || userInfo.shirtingType === 'printed' || analysis.pattern?.toLowerCase()?.includes('print'))
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}>
                {(analysis.shirtingType === 'printed' || userInfo.shirtingType === 'printed' || analysis.pattern?.toLowerCase()?.includes('print'))
                  ? '🎨 Printed Shirting Fabric'
                  : '✨ Plain Solid Shirting Material'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Simulating Tailor-Stitched Fit on Kerala Native Male Models
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-900/30">
              <div className="text-[11px] font-semibold text-cyan-400 mb-1">Recommended Tailor Styling</div>
              <p className="text-slate-200 font-medium">
                {(analysis.shirtingType === 'printed' || userInfo.shirtingType === 'printed' || analysis.pattern?.toLowerCase()?.includes('print'))
                  ? 'Casual Cuban / Camp Collar Shirt or Short Sleeve Resort Cut'
                  : 'Crisp Full-Sleeve Classic Collar / Mandarin Bandhgala Shirt'}
              </p>
              <div className="text-[10px] text-slate-400 mt-1">
                {(analysis.shirtingType === 'printed' || userInfo.shirtingType === 'printed' || analysis.pattern?.toLowerCase()?.includes('print'))
                  ? 'Vibrant prints tailored for casual weekend & festive gatherings'
                  : 'Sharp structure suitable for office formals & wedding functions'}
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-900/30">
              <div className="text-[11px] font-semibold text-amber-400 mb-1">Fabric Meterage & Count</div>
              <p className="text-slate-200 font-medium">
                {userInfo.cutLength || analysis.fabricSpecs?.suggestedMeters || '1.60m (Standard) / 2.25m (Full/Kurta)'}
              </p>
              <div className="text-[10px] text-slate-400 mt-1">
                {userInfo.gsmOrCount || analysis.fabricSpecs?.count || 'Pure Breathable Weave • Ideal for Kerala Weather'}
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-900/30">
              <div className="text-[11px] font-semibold text-emerald-400 mb-1">Pairing & Bottomwear</div>
              <p className="text-slate-200 font-medium">
                {analysis.fabricSpecs?.pairingSuggestion || 'Kerala Kasavu Double Mundu / Beige Chinos'}
              </p>
              <div className="text-[10px] text-slate-400 mt-1">
                Perfect fusion of traditional Kerala attire & modern tailoring
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Factual Safety Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-5 flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300">Factual Safety Guarantee:</strong> The AI Reel Script will ONLY speak the factual prices, brand name, and features verified here. It will never hallucinate fabricated discounts or specifications.
        </div>
      </div>

      {/* Detailed Form (Read-only or Edit mode) */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                id="input-product-name"
                value={tempInfo.productName}
                onChange={(e) => setTempInfo({ ...tempInfo, productName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                id="input-product-brand"
                value={tempInfo.brand}
                onChange={(e) => setTempInfo({ ...tempInfo, brand: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Offer Price (₹)</label>
              <input
                type="number"
                id="input-product-price"
                value={tempInfo.price || ''}
                placeholder="Optional (e.g. 14500)"
                onChange={(e) => setTempInfo({ ...tempInfo, price: Number(e.target.value) || undefined })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">MRP Price (₹)</label>
              <input
                type="number"
                id="input-product-mrp"
                value={tempInfo.mrp || ''}
                placeholder="Optional (e.g. 18900)"
                onChange={(e) => setTempInfo({ ...tempInfo, mrp: Number(e.target.value) || undefined })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Occasion</label>
              <select
                id="input-product-occasion"
                value={tempInfo.occasion}
                onChange={(e) => setTempInfo({ ...tempInfo, occasion: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="None">None</option>
                <option value="Onam">Onam</option>
                <option value="Vishu">Vishu</option>
                <option value="Wedding">Wedding</option>
                <option value="Festival">Festival</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Sale">Sale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Active Offer</label>
              <input
                type="text"
                id="input-product-offer"
                value={tempInfo.currentOffer || ''}
                placeholder="e.g. Onam Special — 20% off"
                onChange={(e) => setTempInfo({ ...tempInfo, currentOffer: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Description</label>
              <textarea
                rows={2}
                id="input-product-description"
                value={tempInfo.description}
                onChange={(e) => setTempInfo({ ...tempInfo, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500">Product Name:</span>
              <p className="font-semibold text-slate-200 mt-0.5">{userInfo.productName}</p>
            </div>
            <div>
              <span className="text-slate-500">Brand / Store:</span>
              <p className="font-semibold text-amber-400 mt-0.5">{userInfo.brand || 'Lakshmi Stores'}</p>
            </div>
            <div>
              <span className="text-slate-500">Price:</span>
              <p className="font-semibold text-emerald-400 mt-0.5">
                {userInfo.price ? `₹${userInfo.price.toLocaleString('en-IN')}` : 'DM / Visit for Price'}
                {userInfo.mrp && <span className="text-slate-500 line-through text-[11px] ml-1.5">₹{userInfo.mrp.toLocaleString('en-IN')}</span>}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Occasion:</span>
              <p className="font-semibold text-rose-400 mt-0.5">{userInfo.occasion}</p>
            </div>
            <div>
              <span className="text-slate-500">Current Offer:</span>
              <p className="font-semibold text-amber-400 mt-0.5">{userInfo.currentOffer || 'No Active Offer'}</p>
            </div>
            <div className="sm:col-span-3 pt-2 border-t border-slate-850">
              <span className="text-slate-500">Key Visual Signatures:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {analysis.extractedDetails?.map((detail, idx) => (
                  <span key={idx} className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md text-[11px] border border-slate-800">
                    ✨ {detail}
                  </span>
                )) || (
                  <span className="text-slate-500 italic">No specific signatures identified.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
