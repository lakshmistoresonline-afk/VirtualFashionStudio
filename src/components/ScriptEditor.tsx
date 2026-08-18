import React, { useState } from 'react';
import { 
  FileText, 
  Languages, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Hash, 
  RefreshCw, 
  Edit3, 
  CheckCircle2,
  ShieldCheck,
  Video,
  Mic,
  Tag,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';
import { ReelScript, ScriptSegment, SubtitleSegment } from '../types';

interface ScriptEditorProps {
  script: ReelScript;
  onUpdateScript: (updated: ReelScript) => void;
  onRegenerateScript: () => void;
  isRegenerating: boolean;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({
  script,
  onUpdateScript,
  onRegenerateScript,
  isRegenerating
}) => {
  const [activeLang, setActiveLang] = useState<'ml' | 'en'>('ml');
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const segments: ScriptSegment[] = script.scriptSegments && script.scriptSegments.length > 0 
    ? script.scriptSegments 
    : [
        {
          segmentId: 'seg_1',
          text: script.hookLine || script.subtitles?.[0]?.textMl || 'നിങ്ങളുടെ ആഘോഷങ്ങൾക്ക് കൂടുതൽ ഭംഗി നൽകാൻ...',
          textEn: script.subtitles?.[0]?.textEn || 'Make your celebrations more special...',
          language: 'ml-IN',
          duration: 3.5,
          type: (script.presentationMode === 'voice_over' ? 'VOICE_OVER' : 'TALKING_MODEL') as any,
          speaker: script.presentationMode === 'voice_over' ? 'Narrator Voiceover' : 'AI Model',
          shotId: 'shot_1',
          shotIndex: 0,
          startTime: 0,
          endTime: 3.5
        },
        {
          segmentId: 'seg_2',
          text: script.subtitles?.[1]?.textMl || 'ആധികാരികമായ നെയ്ത്തും പരമ്പരാഗത കാഞ്ചീപുരം സരി ബോർഡറും.',
          textEn: script.subtitles?.[1]?.textEn || 'Authentic weave with handcrafted gold zari border.',
          language: 'ml-IN',
          duration: 4.5,
          type: (script.presentationMode === 'talking_model' ? 'TALKING_MODEL' : 'VOICE_OVER') as any,
          speaker: script.presentationMode === 'talking_model' ? 'AI Model' : 'Narrator Voiceover',
          shotId: 'shot_2',
          shotIndex: 1,
          startTime: 3.5,
          endTime: 8.0
        },
        {
          segmentId: 'seg_3',
          text: script.subtitles?.[2]?.textMl || 'പ്രത്യേക ഓഫർ വിലയിൽ! നൂറു ശതമാനം ക്വാളിറ്റി ഗ്യാരണ്ടി.',
          textEn: script.subtitles?.[2]?.textEn || 'Special offer price with pure quality guarantee.',
          language: 'ml-IN',
          duration: 3.5,
          type: 'PRODUCT_TEXT' as const,
          speaker: 'Narrator Voiceover',
          shotId: 'shot_3',
          shotIndex: 2,
          startTime: 8.0,
          endTime: 11.5
        },
        {
          segmentId: 'seg_4',
          text: script.callToAction || script.subtitles?.[3]?.textMl || 'ഇന്നുതന്നെ ഓർഡർ ചെയ്യൂ | WhatsApp Now.',
          textEn: script.subtitles?.[3]?.textEn || 'Order Today • WhatsApp Now.',
          language: 'ml-IN',
          duration: 3.5,
          type: (script.presentationMode === 'voice_over' ? 'CTA' : 'TALKING_MODEL') as any,
          speaker: script.presentationMode === 'voice_over' ? 'Narrator Voiceover' : 'AI Model',
          shotId: 'shot_4',
          shotIndex: 3,
          startTime: 11.5,
          endTime: 15.0
        }
      ];

  const handleSegmentTextChange = (index: number, newText: string, lang: 'ml' | 'en') => {
    const updatedSegments = [...segments];
    if (lang === 'ml') {
      updatedSegments[index] = { ...updatedSegments[index], text: newText };
    } else {
      updatedSegments[index] = { ...updatedSegments[index], textEn: newText };
    }

    const updatedSubtitles = updatedSegments.map((seg, idx) => ({
      id: `sub_${idx + 1}`,
      startTime: seg.startTime,
      endTime: seg.endTime,
      textMl: seg.text,
      textEn: seg.textEn || ''
    }));

    onUpdateScript({
      ...script,
      scriptSegments: updatedSegments,
      subtitles: updatedSubtitles,
      malayalamScript: updatedSegments.map(s => s.text).join(' '),
      englishScript: updatedSegments.map(s => s.textEn || s.text).join(' ')
    });
  };

  const handleSegmentTypeToggle = (index: number, newType: 'TALKING_MODEL' | 'VOICE_OVER' | 'PRODUCT_TEXT' | 'CTA') => {
    const updatedSegments = [...segments];
    updatedSegments[index] = {
      ...updatedSegments[index],
      type: newType,
      speaker: newType === 'TALKING_MODEL' ? 'AI Model' : 'Narrator Voiceover'
    };

    onUpdateScript({
      ...script,
      scriptSegments: updatedSegments
    });
  };

  const handleApproveScript = () => {
    setIsApproving(true);
    // For static free tier, we lock the script locally without a roundtrip
    setTimeout(() => {
      onUpdateScript({
        ...script,
        isApproved: true,
        approvedScriptVersion: (script.approvedScriptVersion || 1) + 1,
        approvedAt: new Date().toISOString()
      });
      setIsApproving(false);
    }, 500);
  };

  const copyToClipboard = (text: string, type: 'caption' | 'hashtags') => {
    navigator.clipboard.writeText(text);
    if (type === 'caption') {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } else {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>5. Segmented Malayalam & English Script Studio</span>
            <span className="text-xs bg-rose-500/20 text-rose-300 font-medium px-2 py-0.5 rounded-full border border-rose-500/30">
              Kerala Retail Copywriting
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Segment-synchronized Malayalam (മലയാളം) promotional speech with talking model dialogue & voiceover cues.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              id="btn-script-lang-ml"
              onClick={() => setActiveLang('ml')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeLang === 'ml'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              മലയാളം (Malayalam)
            </button>
            <button
              id="btn-script-lang-en"
              onClick={() => setActiveLang('en')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeLang === 'en'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <button
            id="btn-regenerate-script"
            onClick={onRegenerateScript}
            disabled={isRegenerating}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-50"
            title="Regenerate script"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Script Approval Quality Gate Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${script.isApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
            {script.isApproved ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center space-x-2">
              <span>Quality Gate: {script.isApproved ? 'Script Approved & Locked' : 'Pending Script Verification'}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.2 rounded-full">v{script.approvedScriptVersion || 1}.0</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {script.isApproved ? 'Speech synthesis locked to verified Malayalam grammar & timing.' : 'Review dialogue segments before finalizing audio & lip-sync rendering.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          id="btn-approve-script"
          onClick={handleApproveScript}
          disabled={isApproving}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            script.isApproved
              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/40'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-md'
          }`}
        >
          {script.isApproved ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>{script.isApproved ? '✓ Re-Lock Script' : 'Approve & Lock Script'}</span>
        </button>
      </div>

      {/* Structured Script Segments List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-white flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Synchronized Script Segments & Presentation Roles:</span>
          </label>
          <span className="text-[11px] text-slate-400 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Total Reel Duration: {script.durationSec}s</span>
          </span>
        </div>

        <div className="space-y-3">
          {segments.map((seg, idx) => {
            const isTalking = seg.type === 'TALKING_MODEL';
            return (
              <div
                key={seg.segmentId || idx}
                id={`script-segment-${idx}`}
                className={`p-3.5 rounded-xl border transition-all ${
                  isTalking
                    ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/20'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                {/* Segment Meta Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400 text-[11px] font-mono font-bold">
                      {seg.startTime}s - {seg.endTime}s
                    </span>

                    <span className="text-xs font-bold text-slate-200">
                      Shot #{idx + 1}
                    </span>

                    {/* Segment Type Selector */}
                    <div className="flex space-x-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleSegmentTypeToggle(idx, 'TALKING_MODEL')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 transition-all ${
                          seg.type === 'TALKING_MODEL'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Video className="w-3 h-3" />
                        <span>Talking Model</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSegmentTypeToggle(idx, 'VOICE_OVER')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 transition-all ${
                          seg.type === 'VOICE_OVER'
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Mic className="w-3 h-3" />
                        <span>Voice-over</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSegmentTypeToggle(idx, 'PRODUCT_TEXT')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 transition-all ${
                          seg.type === 'PRODUCT_TEXT'
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        <span>Product</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <span className="font-semibold text-slate-300">Speaker:</span>
                    <span className={isTalking ? 'text-emerald-400 font-bold' : 'text-sky-400'}>
                      {seg.speaker || (isTalking ? 'AI Model' : 'Narrator')}
                    </span>
                  </div>
                </div>

                {/* Text Editing Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-medium">
                      മലയാളം ഡയലോഗ് / വോയ്സ് (Malayalam):
                    </label>
                    <textarea
                      rows={2}
                      value={seg.text}
                      onChange={(e) => handleSegmentTextChange(idx, e.target.value, 'ml')}
                      className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-medium">
                      English Translation / Subtitle:
                    </label>
                    <textarea
                      rows={2}
                      value={seg.textEn || ''}
                      onChange={(e) => handleSegmentTextChange(idx, e.target.value, 'en')}
                      className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Instagram Caption & Hashtags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Caption */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Instagram Reel Caption</span>
            </span>
            <button
              id="btn-copy-caption"
              onClick={() =>
                copyToClipboard(
                  activeLang === 'ml' ? script.malayalamCaption : script.englishCaption,
                  'caption'
                )
              }
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold flex items-center space-x-1"
            >
              {copiedCaption ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
            {activeLang === 'ml' ? script.malayalamCaption : script.englishCaption}
          </p>
        </div>

        {/* Hashtags */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Hash className="w-3.5 h-3.5 text-amber-400" />
              <span>Viral Hashtags</span>
            </span>
            <button
              id="btn-copy-hashtags"
              onClick={() =>
                copyToClipboard(
                  (activeLang === 'ml' ? script.malayalamHashtags : script.englishHashtags).join(
                    ' '
                  ),
                  'hashtags'
                )
              }
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              {copiedHashtags ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedHashtags ? 'Copied!' : 'Copy Tags'}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(activeLang === 'ml' ? script.malayalamHashtags : script.englishHashtags).map(
              (tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

