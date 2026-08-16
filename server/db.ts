import { 
  AdminSettings, 
  BrandProfile, 
  GenerationJob, 
  ProductItem, 
  ReelProject 
} from '../src/types';
import { 
  AI_MODELS_PRESETS, 
  DEFAULT_BRAND_PRESET, 
  MUSIC_TRACKS_PRESETS, 
  REEL_TEMPLATES_PRESETS, 
  SAMPLE_PRODUCTS 
} from '../src/data/presets';

class DatabaseStore {
  public products: Map<string, ProductItem> = new Map();
  public reels: Map<string, ReelProject> = new Map();
  public jobs: Map<string, GenerationJob> = new Map();
  public brand: BrandProfile = { ...DEFAULT_BRAND_PRESET };
  public settings: AdminSettings = {
    aiMode: 'live',
    textProvider: 'gemini',
    imageProvider: 'gemini',
    videoProvider: 'veo',
    ttsProvider: 'gemini',
    fidelityThreshold: 85,
    defaultLanguage: 'ml-IN',
    defaultDuration: 15,
    maxUploadSizeMb: 25,
    autoQualityCheck: true
  };

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    SAMPLE_PRODUCTS.forEach((sample, i) => {
      const pId = `prod_${i + 1}`;
      const productItem: ProductItem = {
        id: pId,
        name: sample.name,
        originalImage: sample.imageUrl,
        analysis: {
          category: sample.category,
          subcategory: sample.subcategory,
          targetGender: sample.gender,
          ageGroup: sample.ageGroup,
          primaryColor: sample.primaryColor,
          secondaryColors: sample.secondaryColors,
          fabricAppearance: sample.fabric,
          pattern: 'Brocade & Zari Motif Weave',
          printOrWeave: 'South Indian Handloom',
          embroidery: 'Zari Border',
          border: 'Gold Zari Border',
          motifs: ['Peacock', 'Paisley'],
          garmentStructure: 'Traditional drape',
          style: 'traditional',
          occasion: 'Festivals & Weddings',
          confidence: sample.confidence,
          extractedDetails: [sample.description]
        },
        userInfo: {
          productName: sample.name,
          category: sample.category,
          subcategory: sample.subcategory,
          gender: sample.gender,
          ageGroup: sample.ageGroup,
          color: sample.primaryColor,
          fabric: sample.fabric,
          brand: DEFAULT_BRAND_PRESET.name,
          price: sample.price,
          mrp: sample.mrp,
          sizes: ['Free Size', 'Unstitched'],
          description: sample.description,
          specialFeatures: ['100% Color Fast', 'Authentic Handloom', 'Includes Blouse Piece'],
          occasion: 'Festive, Wedding, Onam',
          sku: `LAK-${sample.category.substring(0, 3).toUpperCase()}-00${i + 1}`,
          inStock: true
        },
        createdAt: new Date(Date.now() - (i * 3600000)).toISOString(),
        reelsCount: 1,
        status: 'completed'
      };
      this.products.set(pId, productItem);

      // Seed a completed Reel project for immediate preview
      if (i === 0) {
        const reelId = `reel_001`;
        const reel: ReelProject = {
          id: reelId,
          productId: pId,
          productName: sample.name,
          version: 1,
          originalImage: sample.imageUrl,
          modelProfile: AI_MODELS_PRESETS[0],
          environment: 'wedding_temple',
          shots: [
            {
              id: 'shot_1',
              shotType: 'full_body',
              title: 'Establishing Full-Length Fashion Shot',
              cameraMovement: 'slow_push',
              imageUrl: sample.imageUrl,
              durationSec: 3,
              fidelityScore: 95,
              status: 'completed'
            },
            {
              id: 'shot_2',
              shotType: 'three_quarter',
              title: '3/4 Angle Elegant Stance',
              cameraMovement: 'gentle_tracking',
              imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
              durationSec: 3,
              fidelityScore: 94,
              status: 'completed'
            },
            {
              id: 'shot_3',
              shotType: 'movement',
              title: 'Natural Movement & Swirl',
              cameraMovement: 'natural_turn',
              imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
              durationSec: 3,
              fidelityScore: 96,
              status: 'completed'
            },
            {
              id: 'shot_4',
              shotType: 'close_up',
              title: 'Macro Detail - Border & Fabric Weave',
              cameraMovement: 'macro_pan',
              imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
              durationSec: 3,
              fidelityScore: 97,
              status: 'completed'
            },
            {
              id: 'shot_5',
              shotType: 'final_pose',
              title: 'Signature Hero Brand Pose',
              cameraMovement: 'slow_pull',
              imageUrl: sample.imageUrl,
              durationSec: 3,
              fidelityScore: 95,
              status: 'completed'
            }
          ],
          fidelity: {
            overallScore: 95,
            colorAccuracy: 97,
            borderPreservation: 94,
            patternFidelity: 93,
            garmentStructure: 96,
            passed: true,
            notes: [
              'Crimson Maroon tone accurately retained',
              'Gold Zari temple border aligned perfectly',
              'Pleat structure matches authentic Kanchipuram drape'
            ]
          },
          script: {
            malayalamTitle: 'ലക്ഷ്മി സിൽക്സ് കാഞ്ചീപുരം സാരി കളക്ഷൻ',
            malayalamScript: 'നിങ്ങളുടെ വിശേഷ ദിവസങ്ങൾക്ക് കൂടുതൽ മാറ്റുകൂട്ടാൻ ലക്ഷ്മി സിൽക്സ് അവതരിപ്പിക്കുന്ന മനോഹരമായ മെറൂൺ കാഞ്ചീപുരം സിൽക്ക് സാരി. പ്യുവർ മൾബറി സിൽക്കിൽ തീർത്ത പാരമ്പര്യ പ്രൗഢി. ₹14,500 ൽ ഇന്നുതന്നെ സ്വന്തമാക്കൂ!',
            malayalamCaption: 'കണ്ണഞ്ചിപ്പിക്കുന്ന പാരമ്പര്യ ഭംഗി! ✨ ഞങ്ങളുടെ പുതിയ കാഞ്ചീപുരം സിൽക്ക് സാരി കളക്ഷൻ ഇപ്പോൾ ലഭ്യമാണ്. കൂടുതൽ വിവരങ്ങൾക്കും ഓർഡറുകൾക്കും WhatsApp ചെയ്യൂ: 9847012345 🛍️',
            malayalamHashtags: ['#KeralaFashion', '#SilkSaree', '#KanchipuramSilk', '#OnamShopping', '#MalayaliReels', '#LakshmiSilks'],
            englishTitle: 'Royal Kanchipuram Silk Saree by Lakshmi Silks',
            englishScript: 'Elevate your festive elegance with Lakshmi Silks breathtaking crimson Kanchipuram pure silk saree. Woven with pure gold zari peacock motifs. Special launch price ₹14,500!',
            englishCaption: 'Elegance woven into perfection! ✨ Discover our all-new Kanchipuram Silk range. DM or WhatsApp now to order: +91 9847012345 🛍️',
            englishHashtags: ['#IndianFashion', '#TraditionalElegance', '#SareeLove', '#EthnicWear', '#KeralaStyle', '#FashionReel'],
            durationSec: 15,
            hookLine: 'നിങ്ങളുടെ ആഘോഷങ്ങൾക്ക് കൂടുതൽ ഭംഗി നൽകാൻ...',
            callToAction: 'ഇന്നുതന്നെ ഞങ്ങളെ വാട്സാപ്പിൽ ബന്ധപ്പെടൂ അല്ലെങ്കിൽ സ്റ്റോർ സന്ദർശിക്കൂ.',
            subtitles: [
              { id: 'sub_1', startTime: 0, endTime: 3, textMl: 'നിങ്ങളുടെ ആഘോഷങ്ങൾക്ക് കൂടുതൽ ഭംഗി നൽകാൻ... ✨', textEn: 'Make your celebrations even more special... ✨' },
              { id: 'sub_2', startTime: 3, endTime: 6, textMl: 'ലക്ഷ്മി സിൽക്സ് പുതിയ മെറൂൺ കാഞ്ചീപുരം സാരി!', textEn: 'Lakshmi Silks New Crimson Kanchipuram Silk!' },
              { id: 'sub_3', startTime: 6, endTime: 9, textMl: 'പ്യുവർ സിൽക്കിലെ അതിമനോഹരമായ സ്വർണ്ണ സരി വീവിംഗ് 🌟', textEn: 'Exquisite Pure Gold Zari Weave & Peacock Motifs 🌟' },
              { id: 'sub_4', startTime: 9, endTime: 12, textMl: 'സ്പെഷ്യൽ പ്രൈസ്: ₹14,500 | പ്യുവർ ക്വാളിറ്റി ഗ്യാരണ്ടി!', textEn: 'Special Price: ₹14,500 • Certified Silk Mark' },
              { id: 'sub_5', startTime: 12, endTime: 15, textMl: 'ഇന്നുതന്നെ ഓർഡർ ചെയ്യൂ | WhatsApp: 9847012345 📲', textEn: 'Order Today • WhatsApp: +91 9847012345 📲' }
            ]
          },
          voice: {
            language: 'ml-IN',
            voiceId: 'kalyani_ml',
            voiceName: 'Kalyani (കല്ല്യാണി - Kerala Female Natural)',
            gender: 'female',
            speed: 1.0,
            pitch: 1.0
          },
          template: REEL_TEMPLATES_PRESETS[0],
          brand: { ...DEFAULT_BRAND_PRESET },
          music: MUSIC_TRACKS_PRESETS[0],
          musicVolume: 0.25,
          voiceVolume: 0.9,
          subtitleMode: 'bilingual',
          durationSec: 15,
          status: 'ready',
          thumbnailUrl: sample.imageUrl,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.reels.set(reelId, reel);
      }
    });
  }
}

export const db = new DatabaseStore();
