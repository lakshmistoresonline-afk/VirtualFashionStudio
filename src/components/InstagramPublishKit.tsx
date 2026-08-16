import React, { useState } from 'react';
import { 
  Instagram, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Square, 
  Maximize2, 
  Tag, 
  Hash, 
  Share2, 
  X,
  Play,
  Volume2,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { ReelProject } from '../types';

interface InstagramPublishKitProps {
  reel: ReelProject;
  isOpen: boolean;
  onClose: () => void;
}

export const InstagramPublishKit: React.FC<InstagramPublishKitProps> = ({
  reel,
  isOpen,
  onClose
}) => {
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '4:5'>('9:16');
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [activeStorySticker, setActiveStorySticker] = useState<'price' | 'poll' | 'link' | 'music'>('price');

  if (!isOpen) return null;

  const currentShot = reel.shots[0] || { imageUrl: reel.originalImage, title: 'Hero Drape' };

  // Generate Kerala-tailored viral caption
  const generateCaption = () => {
    return `✨ ${reel.script.malayalamTitle || reel.productName} ✨

${reel.script.malayalamCaption || reel.script.englishCaption}

👗 *Collection:* ${reel.brand.name}
📍 *Available across all 28 showrooms in Kerala & UAE*
🛍️ *Showrooms:* Kochi | Calicut | Trivandrum | Thrissur | Kottayam | Kannur | Palakkad | Kollam | Dubai
💬 *How to Order:* Comment "PRICE" or click the link in bio to chat directly with our showroom stylist on WhatsApp!
📦 *Free Home Delivery across Kerala | Worldwide Shipping*

${(reel.script.malayalamHashtags || []).concat(reel.script.englishHashtags || []).join(' ')}`;
  };

  const captionText = generateCaption();
  const hashtagString = (reel.script.malayalamHashtags || [])
    .concat(reel.script.englishHashtags || [])
    .concat(['#LakshmiStores', '#LakshmiSilks', '#KeralaFashion', '#MalayaliBride', '#KeralaSaree', '#Kasavu', '#KochiFashion', '#Thrissur', '#KeralaWeddings'])
    .join(' ');

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(hashtagString);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-pink-500/50 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl shadow-pink-950/40 my-8 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">Instagram Social Showcase Kit</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Reels • Stories • Feed
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Multi-aspect previews, viral Kerala captions, hashtags, and story stickers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Aspect Ratio Interactive Preview Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Aspect Ratio Switcher */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-3 w-full max-w-[280px]">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                  aspectRatio === '9:16'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>9:16 Reel</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                  aspectRatio === '1:1'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Square className="w-3 h-3" />
                <span>1:1 Feed</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:5')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                  aspectRatio === '4:5'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>4:5 Portrait</span>
              </button>
            </div>

            {/* Instagram Mockup Canvas */}
            <div 
              className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 shadow-2xl transition-all duration-300 w-full max-w-[280px] ${
                aspectRatio === '9:16' ? 'aspect-[9/16]' : aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={currentShot.imageUrl}
                alt={reel.productName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Instagram Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Top User Badge */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-rose-600 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[9px] font-bold text-white">
                      LS
                    </div>
                  </div>
                  <span className="text-[11px] font-bold drop-shadow">{reel.brand.instagram || '@lakshmistores'}</span>
                </div>
              </div>

              {/* Story Stickers Simulation */}
              {activeStorySticker === 'price' && (
                <div className="absolute top-20 right-3 z-20 bg-white/95 text-slate-950 px-2.5 py-1 rounded-lg font-bold text-xs shadow-lg border border-slate-200 flex items-center space-x-1 animate-bounce">
                  <Tag className="w-3 h-3 text-rose-600" />
                  <span>Verified Weave</span>
                </div>
              )}

              {activeStorySticker === 'poll' && (
                <div className="absolute top-24 inset-x-4 z-20 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-pink-500/40 text-center shadow-lg">
                  <div className="text-[10px] font-bold text-white mb-1.5">Love this Lakshmi Stores Drape? 😍</div>
                  <div className="grid grid-cols-2 gap-1 text-[9px] font-bold">
                    <div className="bg-emerald-600 text-white py-1 rounded">Yes, Stunning! ✨</div>
                    <div className="bg-rose-600 text-white py-1 rounded">Need Video Call 📲</div>
                  </div>
                </div>
              )}

              {activeStorySticker === 'link' && (
                <div className="absolute bottom-20 left-4 z-20 bg-blue-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>lakshmistores.in/reel</span>
                </div>
              )}

              {/* Bottom Right Instagram Action Icons */}
              <div className="absolute bottom-4 right-2 z-10 flex flex-col items-center space-y-2.5 text-white">
                <div className="flex flex-col items-center">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 drop-shadow" />
                  <span className="text-[8px] font-bold">2.4k</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-4 h-4 drop-shadow" />
                  <span className="text-[8px] font-bold">142</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bookmark className="w-4 h-4 drop-shadow" />
                </div>
              </div>

              {/* Bottom Subtitle / Product info */}
              <div className="absolute bottom-3 left-3 right-10 z-10 text-white">
                <div className="text-[11px] font-bold truncate drop-shadow">{reel.productName}</div>
                <div className="text-[9px] text-amber-300 font-medium truncate drop-shadow">
                  {reel.script.malayalamTitle}
                </div>
              </div>
            </div>

            {/* Sticker Preview Selector */}
            <div className="mt-3 flex items-center space-x-1">
              <span className="text-[10px] text-slate-400 font-semibold mr-1">Story Sticker:</span>
              <button
                type="button"
                onClick={() => setActiveStorySticker('price')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeStorySticker === 'price' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Price Tag
              </button>
              <button
                type="button"
                onClick={() => setActiveStorySticker('poll')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeStorySticker === 'poll' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Audience Poll
              </button>
              <button
                type="button"
                onClick={() => setActiveStorySticker('link')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeStorySticker === 'link' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Bio Link
              </button>
            </div>
          </div>

          {/* Right: Caption, Hashtags & Publishing Actions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viral Reel Caption Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>AI Generated Kerala Viral Reel Caption</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center space-x-1"
                >
                  {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={captionText}
                rows={6}
                className="w-full bg-transparent text-xs text-slate-200 font-sans leading-relaxed resize-none focus:outline-none"
              />
            </div>

            {/* High-Ranking Kerala Hashtags */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trending Kerala Fashion & Wedding Hashtags</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyTags}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                >
                  {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTags ? 'Copied!' : 'Copy Tags'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {hashtagString.split(' ').map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-pink-300 hover:bg-slate-800 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Publishing Guidance for Showroom Social Media Managers */}
            <div className="bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-950 p-3.5 rounded-xl border border-pink-500/30 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instagram Best Practices for Lakshmi Stores:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300 pl-1">
                <li>Post vertical 9:16 reels between <strong>5:30 PM and 8:30 PM IST</strong> (peak Kerala active hours).</li>
                <li>Pin top comment with direct WhatsApp concierge link for fast conversions.</li>
                <li>Add the Sopanam Melodies or Utsavam audio track as original audio for viral regional reach.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
