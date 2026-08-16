import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Copy, 
  Check, 
  Phone, 
  MapPin, 
  Video, 
  Download, 
  QrCode, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  X,
  Share2
} from 'lucide-react';
import { ReelProject, ShowroomBranch } from '../types';
import { KERALA_SHOWROOM_BRANCHES } from '../data/presets';

interface WhatsAppConciergeModalProps {
  reel: ReelProject;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppConciergeModal: React.FC<WhatsAppConciergeModalProps> = ({
  reel,
  isOpen,
  onClose
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    reel.brand.selectedShowroomId || 'br_kochi_mg'
  );
  const [copiedText, setCopiedText] = useState(false);
  const [customCustomerName, setCustomCustomerName] = useState('');
  const [inquiryType, setInquiryType] = useState<'product_inquiry' | 'video_call' | 'branch_stock' | 'broadcast'>('product_inquiry');

  if (!isOpen) return null;

  const currentBranch: ShowroomBranch = 
    KERALA_SHOWROOM_BRANCHES.find(b => b.id === selectedBranchId) || KERALA_SHOWROOM_BRANCHES[0];

  const cleanPhone = (currentBranch.whatsapp || reel.brand.whatsapp || '+919847012345').replace(/[^0-9]/g, '');

  const isShirting = reel.productName.toLowerCase().includes('shirting') || reel.productName.toLowerCase().includes('linen') || reel.productName.toLowerCase().includes('cotton');

  // Build structured Malayalam + English inquiry message
  const generateMessage = () => {
    if (inquiryType === 'video_call') {
      return `✨ *Lakshmi Stores - Live Video Shopping Appointment Request* ✨

*Garment:* ${reel.productName}
*SKU / Ref:* ${reel.productId.substring(0, 10).toUpperCase()}
*Showroom:* ${currentBranch.name} (${currentBranch.city})

*Customer Note:*
"Namaskaram Lakshmi Stores Team, I would like to schedule a 1-on-1 WhatsApp video shopping call with your bridal/fashion stylist to inspect this ${reel.productName} in high resolution and see live matching accessories. Please let me know your available slots today."

*Catalog Link:* ${reel.brand.website || 'https://lakshmistores.in'}
*Store Contact:* ${currentBranch.phone}`;
    }

    if (inquiryType === 'broadcast') {
      return `✨ *EXCLUSIVE NEW ARRIVAL | LAKSHMI STORES* ✨
🌟 *${reel.productName}*

${reel.script.malayalamScript.substring(0, 160)}...

✅ *100% Verified Pure Handloom & Silk Mark Certified*
📍 *Available across all Lakshmi Stores showrooms in Kerala & UAE*
🛍️ *Branch:* ${currentBranch.city} (${currentBranch.phone})

👉 *Click here to order or book a video call on WhatsApp:*
https://wa.me/${cleanPhone}?text=Hello%20Lakshmi%20Stores,%20I%20want%20to%20order%20${encodeURIComponent(reel.productName)}`;
    }

    return `✨ *Product Enquiry - Lakshmi Stores Online Showcase* ✨

*Namaskaram Lakshmi Stores,*
I am interested in this showcased garment:

📌 *Product:* ${reel.productName}
🏷️ *SKU / Code:* ${reel.productId.substring(0, 10).toUpperCase()}
📍 *Preferred Showroom:* ${currentBranch.name} (${currentBranch.city})
${isShirting ? '🧵 *Fabric Type:* Unstitched Premium Shirting Material' : '🥻 *Category:* Heritage Kerala Collection'}

*Please confirm:*
1. Stock availability at ${currentBranch.city} showroom
2. Price details & available color variations
3. Home delivery across Kerala / Gulf shipping options

_Inquiry sent via Lakshmi Stores AI Showcase Assistant_`;
  };

  const messageText = generateMessage();
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl shadow-emerald-950/40 my-8 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">WhatsApp Social Commerce Suite</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Kerala & UAE Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct branch routing, customer 1-click inquiries, and broadcast cards
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

        {/* Product Snapshot & Branch Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
          {/* Garment Snapshot */}
          <div className="sm:col-span-4 bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-20 h-24 rounded-lg overflow-hidden border border-amber-500/40 bg-black mb-2 relative">
              <img
                src={reel.originalImage}
                alt={reel.productName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-amber-600/90 text-[7px] font-bold text-white py-0.5">
                SHOWCASED
              </div>
            </div>
            <div className="text-xs font-bold text-white truncate max-w-full">
              {reel.productName}
            </div>
            <div className="text-[10px] text-amber-300 font-semibold mt-0.5">
              SKU: {reel.productId.substring(0, 8).toUpperCase()}
            </div>
          </div>

          {/* Showroom Branch Selection */}
          <div className="sm:col-span-8 bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Select Nearest Lakshmi Stores Showroom</span>
              </label>
              {currentBranch.isFlagship && (
                <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  ★ Flagship Branch
                </span>
              )}
            </div>

            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              {KERALA_SHOWROOM_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.phone})
                </option>
              ))}
            </select>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span className="truncate">{currentBranch.address}</span>
              <span className="text-emerald-400 font-mono font-bold flex-shrink-0 ml-2">
                WA: {currentBranch.whatsapp}
              </span>
            </div>
          </div>
        </div>

        {/* Inquiry Type Switcher */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => setInquiryType('product_inquiry')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
              inquiryType === 'product_inquiry'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-3 h-3" />
            <span>Product Enquiry</span>
          </button>

          <button
            type="button"
            onClick={() => setInquiryType('video_call')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
              inquiryType === 'video_call'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>NRI Video Shopping</span>
          </button>

          <button
            type="button"
            onClick={() => setInquiryType('broadcast')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
              inquiryType === 'broadcast'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3 h-3" />
            <span>WhatsApp Broadcast</span>
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1.5 pb-1 border-b border-slate-800/80">
            <span>Pre-Formatted WhatsApp Message Payload</span>
            <span className="text-emerald-400 font-bold">Auto-Encoded</span>
          </div>
          <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
            {messageText}
          </pre>
        </div>

        {/* Actions & Launch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp to {currentBranch.city} Branch</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
