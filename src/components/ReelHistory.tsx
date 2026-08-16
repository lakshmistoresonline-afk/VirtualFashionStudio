import React, { useState } from 'react';
import { 
  Film, 
  FolderPlus, 
  Play, 
  Copy, 
  Trash2, 
  Sparkles, 
  Search, 
  Filter, 
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ProductItem, ReelProject } from '../types';

interface ReelHistoryProps {
  products: ProductItem[];
  reels: ReelProject[];
  onSelectReel: (reel: ReelProject) => void;
  onDeleteReel: (reelId: string) => void;
  onDuplicateReel: (reelId: string) => void;
  onSelectProductToCreate: (product: ProductItem) => void;
  onDeleteProduct: (productId: string) => void;
  activeView: 'products' | 'reels';
}

export const ReelHistory: React.FC<ReelHistoryProps> = ({
  products,
  reels,
  onSelectReel,
  onDeleteReel,
  onDuplicateReel,
  onSelectProductToCreate,
  onDeleteProduct,
  activeView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.analysis.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.analysis.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredReels = reels.filter((r) => {
    const matchesSearch = r.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categories = Array.from(new Set(products.map((p) => p.analysis.category)));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            {activeView === 'reels' ? (
              <>
                <Film className="w-5 h-5 text-rose-500" />
                <span>Generated Fashion Reels Gallery</span>
              </>
            ) : (
              <>
                <FolderPlus className="w-5 h-5 text-amber-500" />
                <span>Clothing Product Library</span>
              </>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {activeView === 'reels'
              ? 'Browse, preview, duplicate variations, and download your 9:16 vertical fashion reels.'
              : 'Stored clothing products with structured AI reference profiles and fidelity audits.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="input-history-search"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-52 sm:w-64"
            />
          </div>

          {activeView === 'products' && (
            <select
              id="select-history-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Grid Content */}
      {activeView === 'reels' ? (
        filteredReels.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/50 rounded-xl border border-slate-800/80">
            <Film className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">No Reels Generated Yet</div>
            <p className="text-xs text-slate-400 mt-1">
              Upload a clothing product or pick a preset to create your first fashion Reel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                id={`card-reel-${reel.id}`}
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group hover:border-rose-500/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[9/14] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectReel(reel)}>
                  <img
                    src={reel.thumbnailUrl || reel.originalImage}
                    alt={reel.productName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center pl-0.5 shadow-lg shadow-rose-950/60">
                      <Play className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white">
                    V{reel.version} • {reel.durationSec}s
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-bold text-white flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{reel.fidelity.overallScore}%</span>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="text-xs font-bold text-white truncate">{reel.productName}</h4>
                  <div className="text-[11px] text-amber-400 mt-0.5">{reel.modelProfile.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{reel.voice.language === 'ml-IN' ? 'Malayalam' : 'English'}</span>
                    <span>{new Date(reel.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-slate-850">
                    <button
                      id={`btn-open-reel-${reel.id}`}
                      onClick={() => onSelectReel(reel)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold py-1.5 rounded-lg border border-slate-700 transition-colors"
                    >
                      Open Reel
                    </button>
                    <button
                      id={`btn-dup-reel-${reel.id}`}
                      onClick={() => onDuplicateReel(reel.id)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 rounded-lg border border-slate-700 transition-colors"
                      title="Duplicate variation"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`btn-del-reel-${reel.id}`}
                      onClick={() => onDeleteReel(reel.id)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-700 transition-colors"
                      title="Delete Reel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Products List */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              id={`card-product-${prod.id}`}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all"
            >
              <div className="relative aspect-[9/12] bg-slate-900 overflow-hidden">
                <img
                  src={prod.originalImage}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-amber-400">
                  {prod.analysis.category}
                </div>
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-black/80 backdrop-blur-sm text-[10px] text-slate-300 truncate">
                  {prod.analysis.primaryColor} • {prod.analysis.fabricAppearance}
                </div>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                  {prod.userInfo.price ? `₹${prod.userInfo.price.toLocaleString('en-IN')}` : 'Custom Price'}
                </div>

                <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-slate-850">
                  <button
                    id={`btn-create-from-prod-${prod.id}`}
                    onClick={() => onSelectProductToCreate(prod)}
                    className="flex-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Create Reel</span>
                  </button>
                  <button
                    id={`btn-del-prod-${prod.id}`}
                    onClick={() => onDeleteProduct(prod.id)}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-700 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
