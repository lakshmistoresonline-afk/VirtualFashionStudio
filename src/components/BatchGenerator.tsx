import React, { useState } from 'react';
import { 
  Layers3, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Plus, 
  Check, 
  AlertCircle,
  Film
} from 'lucide-react';
import { ProductItem } from '../types';
import { SAMPLE_PRODUCTS } from '../data/presets';

interface BatchGeneratorProps {
  products: ProductItem[];
  onStartBatch: (selectedProductIds: string[]) => void;
  isProcessingBatch: boolean;
  batchProgress: number;
}

export const BatchGenerator: React.FC<BatchGeneratorProps> = ({
  products,
  onStartBatch,
  isProcessingBatch,
  batchProgress
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(products.map((p) => p.id));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    setSelectedIds(products.map((p) => p.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Layers3 className="w-5 h-5 text-amber-400" />
            <span>Retail Bulk Batch Generator (100+ Catalog Automation)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Produce a queue of ready-to-post Malayalam & English Reels for entire collections in one click.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-batch-select-all"
            onClick={selectAll}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800"
          >
            Select All
          </button>
          <button
            id="btn-batch-deselect-all"
            onClick={deselectAll}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800"
          >
            Deselect
          </button>

          <button
            id="btn-start-batch"
            onClick={() => onStartBatch(selectedIds)}
            disabled={selectedIds.length === 0 || isProcessingBatch}
            className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center space-x-1.5 transition-all disabled:opacity-50"
          >
            {isProcessingBatch ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Batch ({batchProgress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate {selectedIds.length} Reels</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Status Progress Bar */}
      {isProcessingBatch && (
        <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-amber-500/30">
          <div className="flex justify-between text-xs font-semibold text-white mb-2">
            <span>Processing Queue: Generating Realistic Models & Malayalam Scripts...</span>
            <span className="text-amber-400 font-bold">{batchProgress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${batchProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Products Selection List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((prod) => {
          const isSelected = selectedIds.includes(prod.id);
          return (
            <div
              key={prod.id}
              id={`batch-card-${prod.id}`}
              onClick={() => toggleSelect(prod.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 text-left ${
                isSelected
                  ? 'border-rose-500 bg-rose-950/20 shadow-md shadow-rose-950/20'
                  : 'border-slate-800 bg-slate-950/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                <img
                  src={prod.originalImage}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-rose-600/40 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                <div className="text-[10px] text-amber-400 truncate">{prod.analysis.category} • {prod.analysis.primaryColor}</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                  ₹{prod.userInfo.price ? prod.userInfo.price.toLocaleString('en-IN') : '2,999'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
