import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, X, CheckCircle2, ArrowRight, Globe, Layers, Check, Users, UserCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_PRODUCTS, AI_MODELS_PRESETS } from '../data/presets';
import { AIModelProfile } from '../types';

interface ProductUploaderProps {
  onImageSelected: (imageBase64: string, sampleInfo?: any) => void;
  selectedImage: string | null;
  onClear: () => void;
  onProceedToAnalyze: () => void;
  onOneClickGenerate?: () => void;
  isAnalyzing: boolean;
  selectedModel?: AIModelProfile;
  onSelectModel?: (model: AIModelProfile) => void;
  onGoToModelSelector?: () => void;
}

export const ProductUploader: React.FC<ProductUploaderProps> = ({
  onImageSelected,
  selectedImage,
  onClear,
  onProceedToAnalyze,
  onOneClickGenerate,
  isAnalyzing,
  selectedModel,
  onSelectModel,
  onGoToModelSelector
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPresetName, setSelectedPresetName] = useState<string | null>(null);
  const [selectedPresetMeta, setSelectedPresetMeta] = useState<any | null>(null);
  const [webUrlInput, setWebUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'shirting' | 'table' | 'saree' | 'men_kids'>('all');
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);

  const [modelCategoryFilter, setModelCategoryFilter] = useState<'all' | 'men' | 'women' | 'kids' | 'studio'>('all');

  const activeModel = selectedModel || AI_MODELS_PRESETS[0];

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }

    // Basic quality check: size
    if (file.size < 50000) {
      setQualityWarning('Image file size is very small. This might result in a blurry or low-quality Reel.');
    } else {
      setQualityWarning(null);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64 = e.target.result as string;

        // Resolution check
        const img = new Image();
        img.onload = () => {
          if (img.width < 800 || img.height < 800) {
            setQualityWarning('Low resolution detected. For professional Reels, use images above 1080px.');
          }
        };
        img.src = base64;

        setSelectedPresetName(file.name);
        setSelectedPresetMeta(null);
        
        // Check if filename indicates category
        const fn = file.name.toLowerCase();
        const isShirting = fn.includes('shirt') || fn.includes('fabric') || fn.includes('linen') || fn.includes('cotton') || fn.includes('bolt');
        const isMen = isShirting || fn.includes('mundu') || fn.includes('dhothi') || fn.includes('men');
        const isKids = fn.includes('kid') || fn.includes('child') || fn.includes('pavada') || fn.includes('frock');

        let autoSampleInfo: any = undefined;
        if (isShirting) {
          autoSampleInfo = {
            name: file.name.replace(/\.[^/.]+$/, ''),
            category: 'Shirting Fabric',
            isShirtingMaterial: true,
            price: 1250,
            description: 'Bespoke unstitched shirting fabric to be tailored into a custom shirt.'
          };
        } else if (isMen) {
          autoSampleInfo = {
            name: file.name.replace(/\.[^/.]+$/, ''),
            category: 'Men Ethnic Wear',
            price: 2400,
            description: 'Traditional Kerala men collection.'
          };
        } else if (isKids) {
          autoSampleInfo = {
            name: file.name.replace(/\.[^/.]+$/, ''),
            category: 'Kids Wear',
            price: 1800,
            description: 'Kerala traditional kids wear.'
          };
        }

        onImageSelected(e.target.result as string, autoSampleInfo);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadWebUrl = (urlToLoad?: string, customMeta?: any) => {
    const targetUrl = urlToLoad || webUrlInput.trim();
    if (!targetUrl) {
      setUrlError('Please enter a valid image URL');
      return;
    }

    setUrlError(null);
    setUrlLoading(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setUrlLoading(false);
      setSelectedPresetName(customMeta?.name || 'Web Garment (Table Photo)');
      setSelectedPresetMeta(customMeta || { captureContext: 'Web Table Photo' });
      onImageSelected(targetUrl, customMeta);
    };
    img.onerror = () => {
      // Fallback: still pass the URL as standard image source
      setUrlLoading(false);
      setSelectedPresetName(customMeta?.name || 'Web Garment (Table Photo)');
      setSelectedPresetMeta(customMeta || { captureContext: 'Web Table Photo' });
      onImageSelected(targetUrl, customMeta);
    };
    img.src = targetUrl;
  };

  const filteredSamples = SAMPLE_PRODUCTS.filter((s) => {
    if (activeCategoryFilter === 'shirting') return s.category === 'Shirting Fabric' || (s as any).isShirtingMaterial;
    if (activeCategoryFilter === 'table') return s.captureContext?.includes('Table') || s.captureContext?.includes('Counter');
    if (activeCategoryFilter === 'saree') return s.category === 'Saree' || s.category === 'Set Mundu';
    if (activeCategoryFilter === 'men_kids') return s.category === 'Dhothi' || s.category === 'Kids Wear';
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>1. Upload or Select Garment / Shirting Fabric Photo</span>
            <span className="text-xs bg-rose-500/20 text-rose-300 font-medium px-2 py-0.5 rounded-full border border-rose-500/30">
              Plain & Printed Shirting Supported
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mobile-phone photos of unstitched shirting fabrics (plain linen/cotton or printed florals/geometrics) and tabletop flat-lays are automatically extracted and visualized as bespoke tailored shirts on South Indian AI models.
          </p>
        </div>
      </div>

      {/* Web Image URL & Table-Captured Sample Presets */}
      <div className="mb-5 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select a Product or Shirting Material Preset (or Paste URL):</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 text-[11px]">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-2 py-1 rounded-md transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveCategoryFilter('shirting')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 ${
                activeCategoryFilter === 'shirting'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/50 font-bold shadow-sm'
                  : 'text-cyan-400/90 hover:text-cyan-200 hover:bg-cyan-950/40'
              }`}
            >
              <span>👔 Shirting (Plain & Printed)</span>
            </button>
            <button
              onClick={() => setActiveCategoryFilter('table')}
              className={`px-2 py-1 rounded-md transition-colors ${
                activeCategoryFilter === 'table'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              🪵 Table Flat-Lays
            </button>
            <button
              onClick={() => setActiveCategoryFilter('saree')}
              className={`px-2 py-1 rounded-md transition-colors ${
                activeCategoryFilter === 'saree'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Sarees & Kasavu
            </button>
          </div>
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {filteredSamples.map((sample: any) => {
            const isSelected = selectedImage === sample.imageUrl;
            const isShirting = sample.category === 'Shirting Fabric' || sample.isShirtingMaterial;
            return (
              <button
                key={sample.id}
                id={`preset-${sample.id}`}
                onClick={() => {
                  setSelectedPresetName(sample.name);
                  setSelectedPresetMeta(sample);
                  handleLoadWebUrl(sample.imageUrl, sample);
                }}
                className={`flex items-center space-x-2.5 p-2.5 rounded-xl border transition-all text-left group relative ${
                  isSelected
                    ? 'bg-amber-950/30 border-amber-500 shadow-md'
                    : isShirting
                    ? 'bg-slate-900/95 border-cyan-900/50 hover:border-cyan-500/60 hover:bg-slate-850'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isShirting ? (
                    <span className={`absolute bottom-0 inset-x-0 text-[8px] font-bold font-mono text-center truncate px-0.5 ${
                      sample.shirtingType === 'printed' ? 'bg-indigo-950/90 text-indigo-300' : 'bg-cyan-950/90 text-cyan-300'
                    }`}>
                      {sample.shirtingType === 'printed' ? 'Printed Fabric' : 'Plain Fabric'}
                    </span>
                  ) : sample.captureContext ? (
                    <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-amber-300 font-mono text-center truncate px-0.5">
                      Table
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-amber-200">
                    {sample.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                    <span className="text-amber-400 font-medium">₹{sample.price}{isShirting ? '/m' : ''}</span>
                    <span>•</span>
                    <span className="truncate">{sample.subcategory || sample.category}</span>
                  </div>
                  <div className="text-[9px] font-mono mt-0.5 flex items-center space-x-1">
                    {isShirting ? (
                      <span className={`${sample.shirtingType === 'printed' ? 'text-indigo-400' : 'text-cyan-400'} flex items-center space-x-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${sample.shirtingType === 'printed' ? 'bg-indigo-400' : 'bg-cyan-400'}`} />
                        <span>{sample.shirtingType === 'printed' ? 'Printed Shirting' : 'Plain Shirting'} • Tailored Simulation</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        <span>Table Photo • Ready to Test</span>
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="p-1 bg-amber-500 text-slate-950 rounded-full flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Web URL input bar */}
        <div className="pt-2 border-t border-slate-850">
          <div className="text-[11px] text-slate-400 mb-1.5 flex items-center space-x-1">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Or paste any garment web image link from online stores or catalog tables:</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="url"
              placeholder="https://example.com/saree-photo-on-table.jpg"
              value={webUrlInput}
              onChange={(e) => setWebUrlInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              id="btn-load-web-url"
              onClick={() => handleLoadWebUrl()}
              disabled={urlLoading || !webUrlInput.trim()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              {urlLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>Load from Web</span>
            </button>
          </div>
          {urlError && <div className="text-[11px] text-red-400 mt-1">{urlError}</div>}
        </div>
      </div>

      {/* Quality Warning */}
      {qualityWarning && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-2 text-amber-300">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="text-[11px]">
            <span className="font-bold">Image Quality Warning: </span>
            {qualityWarning}
          </div>
        </div>
      )}

      {/* Upload Box / Image Preview */}
      {!selectedImage ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-rose-500 bg-rose-950/20'
              : 'border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/70'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <div className="w-14 h-14 rounded-2xl bg-rose-600/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-7 h-7" />
          </div>

          <div className="text-sm font-semibold text-white mb-1">
            Drag & drop table or counter photo here, or browse files
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Supports JPG, PNG, WEBP • Automatic orientation & table background isolation
          </p>

          <div className="flex items-center justify-center space-x-3">
            <button
              type="button"
              id="btn-choose-file"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-slate-400" />
              <span>Choose from Device</span>
            </button>

            <button
              type="button"
              id="btn-take-photo"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-xs font-semibold text-rose-300 border border-rose-500/30 flex items-center space-x-1.5 transition-colors"
            >
              <Camera className="w-4 h-4 text-rose-400" />
              <span>Take Photo with Camera</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group flex-shrink-0">
            <img
              src={selectedImage}
              alt="Uploaded Product"
              referrerPolicy="no-referrer"
              className="w-32 h-44 object-cover rounded-lg border border-slate-700 shadow-md"
            />
            <button
              id="btn-remove-selected-image"
              onClick={onClear}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-md transition-all"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Product Selected & Table Background Pre-Isolated</span>
            </div>
            <h3 className="text-sm font-bold text-white truncate mb-1">
              {selectedPresetName || 'Clothing Product Reference'}
            </h3>
            <div className="flex items-center space-x-2 text-[11px] text-amber-400/90 mb-2">
              <span className="bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                📸 {selectedPresetMeta?.captureContext || 'Tabletop Flat-Lay'}
              </span>
              <span>•</span>
              <span className="text-slate-400">Ready for AI Model Draping & 9:16 Video Synthesis</span>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 mb-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-200">
                  <Users className="w-3.5 h-3.5 text-rose-400" />
                  <span>Choose AI Model to Wear Garment:</span>
                  {activeModel.gender === 'men' && (
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.2 rounded-full border border-cyan-500/30">
                      👔 Menswear / Shirting Matched
                    </span>
                  )}
                </div>
                
                {/* Category toggle pills */}
                <div className="flex items-center space-x-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setModelCategoryFilter('all')}
                    className={`px-2 py-0.5 rounded transition-colors ${modelCategoryFilter === 'all' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Matched ({activeModel.name.split(' ')[0]})
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelCategoryFilter('men')}
                    className={`px-2 py-0.5 rounded transition-colors ${modelCategoryFilter === 'men' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    👨 Men
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelCategoryFilter('women')}
                    className={`px-2 py-0.5 rounded transition-colors ${modelCategoryFilter === 'women' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    👩 Women
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelCategoryFilter('kids')}
                    className={`px-2 py-0.5 rounded transition-colors ${modelCategoryFilter === 'kids' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    👧 Kids
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelCategoryFilter('studio')}
                    className={`px-2 py-0.5 rounded transition-colors ${modelCategoryFilter === 'studio' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    ✨ Studio
                  </button>
                </div>
              </div>

              {/* Dynamic Model Avatars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AI_MODELS_PRESETS.filter((m) => {
                  if (modelCategoryFilter === 'men') return m.gender === 'men';
                  if (modelCategoryFilter === 'women') return m.gender === 'women';
                  if (modelCategoryFilter === 'kids') return m.gender === 'girls' || m.gender === 'boys';
                  if (modelCategoryFilter === 'studio') return m.gender === 'product_only' || m.id === 'p01';
                  // 'all' / Matched: prioritize matching the active model's gender
                  return m.gender === activeModel.gender || (activeModel.gender === 'men' && m.id === 'p01');
                }).slice(0, 4).map((m) => {
                  const isSelected = activeModel.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSelectModel && onSelectModel(m)}
                      className={`flex items-center space-x-2 p-1.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50 ring-1 ring-rose-400'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={m.avatarUrl}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate flex items-center space-x-1">
                          <span>{m.name.split(' ')[0]}</span>
                          {isSelected && <Check className="w-3 h-3 text-rose-400" />}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate">{m.ethnicity.split('/')[0]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onOneClickGenerate && (
                <button
                  id="btn-one-click-generate"
                  onClick={onOneClickGenerate}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-950/40 flex items-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing & Generating 9:16 Reel...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>⚡ 1-Click Auto-Generate 9:16 Reel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}

              <button
                id="btn-analyze-product"
                onClick={onProceedToAnalyze}
                disabled={isAnalyzing}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all disabled:opacity-50"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Custom Studio: Pick Model & Script</span>
              </button>

              <button
                id="btn-replace-photo"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Choose Another Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

