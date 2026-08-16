import { 
  AIImageGenerator, 
  AIModelRecommender, 
  AIProductAnalyzer, 
  AIQualityChecker, 
  AIScriptGenerator, 
  AITTSProvider, 
  AILipSyncProvider,
  AICapabilityChecker,
  AnalyzeProductInput, 
  FidelityCheckInput, 
  GenerateFashionShotsInput, 
  GenerateScriptInput, 
  GenerateSpeechInput, 
  GenerateTalkingVideoInput,
  GenerateVideoInput,
  TalkingVideoResult,
  VideoGenerationResult,
  RecommendModelInput,
  AIVideoGenerator
} from './interfaces';
import { 
  FashionShot, 
  FidelityReport, 
  ProductAnalysis, 
  ReelScript, 
  ShootEnvironment, 
  AIModelProfile,
  ScriptSegment,
  LipSyncQualityReport,
  ProviderCapabilities
} from '../../src/types';
import { AI_MODELS_PRESETS } from '../../src/data/presets';
import { GarmentDrapeCompositor } from './garmentDrapeCompositor';

const MODEL_SHOT_POOLS: Record<string, string[]> = {
  w01: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'
  ],
  w02: [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80'
  ],
  w03: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=80'
  ],
  w04: [
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80'
  ],
  w05: [
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80'
  ],
  m01: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80'
  ],
  m02: [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80'
  ],
  m03: [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=80'
  ],
  m04: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80'
  ],
  g01: [
    'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=900&auto=format&fit=crop&q=80'
  ],
  g02: [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80'
  ],
  b01: [
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=900&auto=format&fit=crop&q=80'
  ],
  b02: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80'
  ],
  p01: [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80'
  ]
};

export class MockAIProvider implements 
  AIProductAnalyzer, 
  AIModelRecommender, 
  AIImageGenerator, 
  AIQualityChecker, 
  AIScriptGenerator, 
  AITTSProvider,
  AILipSyncProvider,
  AICapabilityChecker,
  AIVideoGenerator {

  async analyzeProduct(input: AnalyzeProductInput): Promise<ProductAnalysis> {
    const hint = (input.hintText || '').toLowerCase();
    
    if (hint.includes('krishna') || hint.includes('peacock') || hint.includes('feather')) {
      return {
        category: 'Shirting Fabric',
        subcategory: 'Krishna & Peacock Feather Printed Cotton',
        targetGender: 'men',
        ageGroup: 'young_adult',
        primaryColor: 'Off-White & Indigo',
        secondaryColors: ['Turquoise Blue', 'Emerald Green', 'Gold'],
        fabricAppearance: 'Premium 60s Combed Cotton with Silk Finish',
        pattern: 'Artisanal Krishna Mural & Peacock Feather Print',
        printOrWeave: 'High-Definition Digital Textile Print',
        embroidery: 'None',
        border: 'Clean Woven Fabric Selvedge',
        motifs: ['Lord Krishna Mural', 'Peacock Feathers', 'Flute & Lotus'],
        garmentStructure: 'Tailor-fitted Full Sleeve Casual Shirt',
        style: 'festive',
        occasion: 'Onam',
        confidence: 99,
        extractedDetails: [
          'Detailed Krishna mural motifs with traditional Kerala aesthetic',
          'Vibrant peacock feather accents in turquoise and emerald tones',
          'Soft luxurious hand-feel that drapes seamlessly into a custom tailored shirt'
        ],
        isShirtingMaterial: true,
        shirtingType: 'printed',
        fabricSpecs: {
          gsm: '115 GSM',
          count: '60s x 60s Combed Pure Cotton',
          materialBlend: '100% Pure Cotton',
          suggestedMeters: '1.60m (Standard Shirt)',
          recommendedCollar: 'Classic Spread Collar',
          pairingSuggestion: 'Kasavu Double Mundu / Beige Chinos'
        }
      };
    }

    if (hint.includes('shirting') || hint.includes('fabric') || hint.includes('linen') || hint.includes('giza') || hint.includes('printed cotton') || hint.includes('bolt')) {
      const isPrinted = hint.includes('print') || hint.includes('floral') || hint.includes('geometric') || hint.includes('block');
      return {
        category: 'Shirting Fabric',
        subcategory: isPrinted ? 'Printed Cotton Shirting Material' : 'Plain Linen Shirting Material',
        targetGender: 'men',
        ageGroup: 'young_adult',
        primaryColor: isPrinted ? 'Indigo Blue & Ivory' : (hint.includes('white') ? 'Royal Crisp White' : 'Pastel Sky Blue'),
        secondaryColors: isPrinted ? ['Mustard Gold Accents', 'Natural Indigo Dye'] : ['Natural Linen Texture', 'Pearl Sheen'],
        fabricAppearance: isPrinted ? 'Superfine 60s x 60s Combed Pure Cotton' : (hint.includes('white') ? '2/100s Egyptian Giza Cotton Satin Weave' : '100% Pure European Organic Linen (60 Lea)'),
        pattern: isPrinted ? 'Artisanal Botanical Block Print' : 'Solid Plain Slub Weave',
        printOrWeave: isPrinted ? 'Fine Handblock-Inspired Discharge Print' : 'Pure Plain Linen Weave with Natural Slub Texture',
        embroidery: 'None',
        border: 'Clean Woven Fabric Selvedge with Count Stamp',
        motifs: isPrinted ? ['Botanical Flowers', 'Leaf Vines', 'Artisan Block Motifs'] : ['Solid Plain'],
        garmentStructure: isPrinted ? 'Tailor-fitted Cuban Resort Collar Shirt with Rolled Sleeves' : 'Tailor-fitted Classic Spread Collar Full-Sleeve Shirt',
        style: isPrinted ? 'casual' : 'executive',
        occasion: isPrinted ? 'Weekend Casuals, Beach Resorts, Festive Get-togethers' : 'Office Formals, Weddings & Pair with Kerala Kasavu Mundu',
        confidence: 99,
        extractedDetails: [
          isPrinted ? 'Vibrant colorfast indigo dye with intricate botanical block motifs' : '100% breathable organic linen fabric offering natural climate control',
          'Soft luxurious hand-feel that drapes seamlessly into a custom tailored shirt',
          'Compatible with Kerala traditional Kasavu double mundu and modern trousers'
        ],
        isShirtingMaterial: true,
        shirtingType: isPrinted ? 'printed' : 'plain',
        fabricSpecs: {
          gsm: isPrinted ? '110 GSM' : '135 GSM',
          count: isPrinted ? '60s x 60s Combed Pure Cotton' : '60 Lea Pure European Linen',
          materialBlend: isPrinted ? '100% Pure Cotton' : '100% Organic Linen',
          suggestedMeters: '1.60m (Standard Shirt) / 2.25m (Full/Kurta)',
          recommendedCollar: isPrinted ? 'Cuban Camp Collar / Short Sleeves' : 'Classic Spread Collar / Full Sleeves',
          pairingSuggestion: 'Kasavu Double Mundu / Sand Chinos / Dark Trousers'
        }
      };
    }

    if (hint.includes('mundu') || hint.includes('dhothi') || hint.includes('men') || hint.includes('shirt')) {
      const isShirt = hint.includes('shirt');
      return {
        category: isShirt ? 'Shirt' : 'Dhothi',
        subcategory: isShirt ? 'Linen Casual Shirt' : 'Kerala Kasavu Mundu',
        targetGender: 'men',
        ageGroup: 'young_adult',
        primaryColor: isShirt ? 'Sky Blue' : 'Off-White / Cream',
        secondaryColors: isShirt ? ['Navy Trim'] : ['Kasavu Pure Gold Zari', 'Antique Gold Line'],
        fabricAppearance: isShirt ? '100% Breathable Fine Linen' : 'Mercerized Handloom Cotton Kasavu',
        pattern: isShirt ? 'Solid' : 'Gold Zari Border & Kara Line',
        printOrWeave: 'Handwoven Kerala Traditional Kasavu',
        embroidery: 'None',
        border: isShirt ? 'Crisp French Seam Hem' : '3-inch Traditional Kasavu Gold Kara',
        motifs: isShirt ? [] : ['Kasavu Lines', 'Temple Kara Weave'],
        garmentStructure: isShirt ? 'Tailored Regular Fit Shirt' : 'Traditional Double Layered 4-Meter Kerala Mundu',
        style: 'traditional',
        occasion: 'Onam, Vishu, Temple Weddings & Festivities',
        confidence: 97,
        extractedDetails: [
          'Authentic Kerala Kasavu border with radiant metallic gold sheen',
          'Premium soft-combed cotton base offering drape firmness',
          'Traditional double mundu fold capability with zero color bleeding'
        ]
      };
    }

    if (hint.includes('kurti') || hint.includes('salwar') || hint.includes('dress') || hint.includes('top')) {
      return {
        category: 'Kurti',
        subcategory: 'Designer Anarkali Kurti',
        targetGender: 'women',
        ageGroup: 'young_adult',
        primaryColor: 'Emerald Green & Indigo',
        secondaryColors: ['Gold Thread', 'Mustard Accent'],
        fabricAppearance: 'Flowing Silk Blend Georgette',
        pattern: 'Intricate Jaal Botanical Print with Zari Yoke',
        printOrWeave: 'Handblock inspired digital ethnic print',
        embroidery: 'Zardozi and sequin work on neckline and cuff',
        border: 'Gota Patti lace border along flare hem',
        motifs: ['Floral Vines', 'Lotus Petals', 'Paisley Yoke'],
        garmentStructure: 'Flared Anarkali silhouette with 3/4 sleeves and mandarin keyhole neck',
        style: 'contemporary_chic',
        occasion: 'Festivals, Parties, Office Celebrations',
        confidence: 96,
        extractedDetails: [
          'Detailed handwork on neck yoke highlighting artisan craftsmanship',
          'Graceful flared hemline allowing dynamic spinning movement in reels',
          'Rich colorfast emerald green tone with gold shimmer accents'
        ]
      };
    }

    if (hint.includes('kid') || hint.includes('frock') || hint.includes('girl') || hint.includes('boy') || hint.includes('pavada')) {
      return {
        category: 'Kids Wear',
        subcategory: 'Pattu Pavada & Blouse Set',
        targetGender: 'girls',
        ageGroup: 'child_3_5',
        primaryColor: 'Rani Pink & Mustard Yellow',
        secondaryColors: ['Gold Temple Border', 'Emerald Green Piping'],
        fabricAppearance: 'Art Silk with 100% Breathable Cotton Inner Lining',
        pattern: 'Brocade Peacock and Floral Weave',
        printOrWeave: 'South Indian Jacquard Weaving',
        embroidery: 'Hand-pleated gold zari border',
        border: '4-inch Grand Temple Zari Border',
        motifs: ['Mayil (Peacock)', 'Rudraksha Lines', 'Mango Buttas'],
        garmentStructure: 'Traditional Pleated Flared Skirt with Fitted Sleeveless Top',
        style: 'traditional',
        occasion: 'Onam, Vishu, Family Weddings, Temple Visits',
        confidence: 98,
        extractedDetails: [
          'Age-appropriate comfortable cut with soft anti-itch cotton inner lining',
          'Vibrant dual-tone Rani Pink and Mustard Yellow palette beloved in Kerala',
          'Heavy brocade border giving full flared shape without sagging'
        ]
      };
    }

    // Default to Saree (most popular)
    return {
      category: 'Saree',
      subcategory: 'Kanchipuram Pure Silk Brocade Saree',
      targetGender: 'women',
      ageGroup: 'young_adult',
      primaryColor: 'Crimson Maroon',
      secondaryColors: ['2-Gram Pure Gold Zari', 'Antique Copper Weave'],
      fabricAppearance: 'Heavy Mulberry Silk with Rich Luster',
      pattern: 'Traditional Floral Jaal & Peacock Buttas',
      printOrWeave: 'Pure Korvai Woven Silk Brocade',
      embroidery: 'Woven Zari Work on Pallu & Border',
      border: '4.5-inch Grand Temple Gold Zari Border with Mango Motifs',
      motifs: ['Peacock (Mayil)', 'Paisley (Manga)', 'Chakra', 'Temple Spire (Gopuram)'],
      garmentStructure: '6.3-meter Heritage Saree with Rich Contrast Pallu and Matching Blouse Piece',
      style: 'traditional',
      occasion: 'Bridal, Wedding Receptions, Temple Pujas, Grand Festivals',
      confidence: 98,
      extractedDetails: [
        'Pure Korvai interlock weaving between maroon body and contrast gold border',
        'Rich heavy pallu featuring traditional Mayil (peacock) motifs woven in gold thread',
        'Lustrous sheen that reflects studio and sunlight with high visual impact'
      ]
    };
  }

  async recommendModel(input: RecommendModelInput): Promise<{
    recommendedModel: AIModelProfile;
    recommendedEnvironment: ShootEnvironment;
    confidence: number;
    reasoning: string;
    alternativeModels: AIModelProfile[];
  }> {
    const gender = input.analysis.targetGender;
    const cat = (input.analysis.category || '').toLowerCase();
    const subcat = (input.analysis.subcategory || '').toLowerCase();
    const isShirting = Boolean(
      input.analysis.isShirtingMaterial || 
      cat.includes('shirt') || 
      cat.includes('fabric') || 
      cat.includes('linen') || 
      cat.includes('cotton') || 
      cat.includes('mundu') || 
      cat.includes('dhothi') ||
      subcat.includes('shirt') ||
      subcat.includes('shirting') ||
      (input.userInfo?.productName && input.userInfo.productName.toLowerCase().includes('shirt'))
    );
    const isPrinted = input.analysis.shirtingType === 'printed' || (input.analysis.pattern && input.analysis.pattern.toLowerCase().includes('print'));
    
    let matchedModel: AIModelProfile = AI_MODELS_PRESETS[0]; // W01 default
    let env: ShootEnvironment = 'traditional_kerala';
    let reason = 'Selected 100% Kerala Native Model (Anjali Menon) for authentic Malayali bridal drape and traditional presentation.';

    if (gender === 'men' || isShirting) {
      if (isPrinted) {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'm04') || AI_MODELS_PRESETS.find(m => m.id === 'm01') || AI_MODELS_PRESETS[4];
        env = 'modern_fashion';
        reason = 'Recommended 100% Kerala Native Male Model (Gokul Das / Rahul Kurup) for trendy printed shirting tailored resort fit.';
      } else if (cat.includes('linen') || subcat.includes('linen') || input.analysis.style === 'executive') {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'm02') || AI_MODELS_PRESETS.find(m => m.id === 'm01') || AI_MODELS_PRESETS[4];
        env = 'modern_fashion';
        reason = 'Recommended 100% Kerala Native Executive Model (Arjun Varma) to showcase tailored European linen shirting & formal trousers.';
      } else {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'm01') || AI_MODELS_PRESETS[4];
        env = 'traditional_kerala';
        reason = 'Recommended 100% Kerala Native Male Model (Rahul Kurup) suited for tailored Kerala shirting paired with Kasavu Mundu.';
      }
    } else if (gender === 'girls') {
      matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'g01') || AI_MODELS_PRESETS[7];
      env = 'traditional_kerala';
      reason = 'Recommended 100% Kerala Native Child Model (Diya Mol) in traditional Pattu Pavada & jasmine hair garland.';
    } else if (gender === 'boys') {
      matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'b01') || AI_MODELS_PRESETS[9];
      env = 'festival_onam';
      reason = 'Recommended 100% Kerala Native Child Model (Kiran Unni) in festive Kasavu Mundu and festive silk shirt.';
    } else if (gender === 'product_only') {
      matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'p01') || AI_MODELS_PRESETS[10];
      env = 'premium_studio';
      reason = 'Authentic Kerala Heritage Studio setup with Nilavilakku brass lamp lighting and teakwood pillars.';
    } else {
      // Women
      if (cat.includes('kasavu') || cat.includes('set mundu') || cat.includes('kerala')) {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'w02') || AI_MODELS_PRESETS[1]; // Meera
        env = 'traditional_kerala';
        reason = 'Authentic Kerala Malayali Model (Meera Nambiar) with traditional Palakka jewelry and Nalukettu courtyard backdrop.';
      } else if (cat.includes('kurti') || cat.includes('western') || cat.includes('dress')) {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'w04') || AI_MODELS_PRESETS[3]; // Sneha
        env = 'boutique_interior';
        reason = 'Contemporary Kochi Malayali Model (Sneha Mathew) with boutique lighting for modern festive wear.';
      } else {
        matchedModel = AI_MODELS_PRESETS.find(m => m.id === 'w01') || AI_MODELS_PRESETS[0]; // Anjali
        env = 'wedding_temple';
        reason = 'Authentic Kerala Bride Model (Anjali Menon) with temple wedding backdrop and shimmering gold zari.';
      }
    }

    const effectiveGender = (gender === 'men' || isShirting) ? 'men' : gender;
    const alternatives = AI_MODELS_PRESETS.filter(m => m.id !== matchedModel.id && (m.gender === effectiveGender || m.gender === 'product_only'));

    return {
      recommendedModel: matchedModel,
      recommendedEnvironment: env,
      confidence: 98,
      reasoning: reason,
      alternativeModels: alternatives
    };
  }

  async generateFashionShots(input: GenerateFashionShotsInput): Promise<FashionShot[]> {
    const { modelProfile, analysis, environment } = input;
    const cat = analysis.category;
    const color = analysis.primaryColor;

    const isShirting = analysis.isShirtingMaterial || cat.toLowerCase().includes('shirt');
    const isPrinted = analysis.shirtingType === 'printed' || analysis.pattern.toLowerCase().includes('print');

    const shotsMeta: Array<{
      type: FashionShot['shotType'];
      title: string;
      movement: FashionShot['cameraMovement'];
      promptDesc: string;
      duration: number;
    }> = isShirting ? [
      {
        type: 'full_body',
        title: isPrinted ? 'Tailored Resort Shirt - Full Fit' : 'Tailored Classic Shirt - Full Fit',
        movement: 'slow_push',
        duration: 3,
        promptDesc: `Cinematic 9:16 vertical fashion photograph of South Indian model ${modelProfile.name} in a bespoke tailor-fitted shirt made from ${color} ${isPrinted ? 'printed botanical cotton' : 'plain premium linen'} shirting fabric, paired with traditional Kerala Kasavu Mundu. Atmospheric ${environment} setting.`
      },
      {
        type: 'three_quarter',
        title: 'Collar & Sleeve Detail Pose',
        movement: 'gentle_tracking',
        duration: 3,
        promptDesc: `High-fashion 3/4 length portrait focusing on the crisp ${isPrinted ? 'Cuban resort collar' : 'spread formal collar'} and folded cuffs of the ${color} tailored shirt. Rich weave definition and natural skin lighting.`
      },
      {
        type: 'movement',
        title: 'Natural Fit & Posture Movement',
        movement: 'natural_turn',
        duration: 3,
        promptDesc: `Natural motion turn showing the breathable silhouette, shoulder seam alignment, and wrinkle-resistant drape of the ${analysis.fabricAppearance} on ${modelProfile.name}.`
      },
      {
        type: 'close_up',
        title: isPrinted ? 'Fabric Macro - Motif & Weave Count' : 'Fabric Macro - Slub Linen Texture & Selvedge',
        movement: 'macro_pan',
        duration: 3,
        promptDesc: `Ultra-sharp 8k macro close-up of unstitched ${color} shirting fabric bolt showing fine thread count, selvedge stamp, and premium tactile luster.`
      },
      {
        type: 'final_pose',
        title: 'Signature Model Pose with Fabric Drape',
        movement: 'slow_pull',
        duration: 3,
        promptDesc: `Confident signature hero pose of ${modelProfile.name} smiling warmly, presenting the tailored shirt alongside the luxurious fabric roll.`
      }
    ] : [
      {
        type: 'full_body',
        title: 'Establishing Full-Length Fashion Shot',
        movement: 'slow_push',
        duration: 3,
        promptDesc: `Cinematic full-body 9:16 vertical fashion photograph of ${modelProfile.name} gracefully wearing ${color} ${cat}. Authentic drape, perfect garment silhouette, luxurious ${environment} backdrop, studio lighting with soft gold rim reflections.`
      },
      {
        type: 'three_quarter',
        title: '3/4 Angle Elegant Stance',
        movement: 'gentle_tracking',
        duration: 3,
        promptDesc: `High-fashion 3/4 length shot highlighting the waist drape, pleats and side profile of ${color} ${cat}. Natural skin tones, intricate zari shimmer, realistic folds.`
      },
      {
        type: 'movement',
        title: 'Natural Movement & Swirl',
        movement: 'natural_turn',
        duration: 3,
        promptDesc: `Graceful slow-motion turn capturing the fluid drape and sweep of the ${cat} fabric. Authentic movement with sharp focus on fabric texture and border details.`
      },
      {
        type: 'close_up',
        title: 'Macro Detail - Border & Fabric Weave',
        movement: 'macro_pan',
        duration: 3,
        promptDesc: `Ultra-sharp macro close-up showcasing the ${analysis.border} and ${analysis.motifs.join(', ')} motifs on ${color} silk. 8k photographic texture.`
      },
      {
        type: 'final_pose',
        title: 'Signature Hero Brand Pose',
        movement: 'slow_pull',
        duration: 3,
        promptDesc: `Expressive, smiling signature hero pose of ${modelProfile.name} holding the pallu/border edge, framing the garment with confident warmth.`
      }
    ];

    const productImgSource = input.originalImage || input.productImageBase64;

    if (productImgSource) {
      return GarmentDrapeCompositor.generateDrapedShots(
        productImgSource,
        modelProfile,
        analysis,
        environment,
        input.userInfo?.productName || analysis.category
      );
    }

    const modelKey = (modelProfile.id || 'w01').toLowerCase();
    const photoPool = MODEL_SHOT_POOLS[modelKey] || MODEL_SHOT_POOLS['w01'];

    return shotsMeta.map((s, index) => {
      const isProductOnly = modelProfile.gender === 'product_only' || modelProfile.id === 'p01';
      const isMacroShot = s.type === 'close_up';
      const shotImg = (isProductOnly || (isMacroShot && productImgSource)) 
        ? productImgSource 
        : (photoPool[index % photoPool.length] || modelProfile.avatarUrl);

      return {
        id: `shot_${Date.now()}_${index + 1}`,
        shotType: s.type,
        title: `${modelProfile.name.split(' ')[0]} - ${s.title}`,
        cameraMovement: s.movement,
        imageUrl: shotImg,
        durationSec: s.duration,
        fidelityScore: 94 + (index % 4),
        status: 'completed',
        promptUsed: s.promptDesc
      };
    });
  }

  async regenerateSingleShot(input: GenerateFashionShotsInput & { shotIndex: number; shotType: string }): Promise<FashionShot> {
    const { modelProfile, analysis, environment, shotIndex, shotType, originalImage, productImageBase64, userInfo } = input;
    const productImgSource = originalImage || productImageBase64;

    if (productImgSource) {
      const allShots = GarmentDrapeCompositor.generateDrapedShots(
        productImgSource,
        modelProfile,
        analysis,
        environment,
        userInfo?.productName || analysis.category
      );
      const targetShot = allShots[shotIndex % allShots.length] || allShots[0];
      return {
        ...targetShot,
        id: `shot_${Date.now()}_${shotIndex + 1}_regen`,
        title: `${modelProfile.name.split(' ')[0]} - Regenerated Angle ${shotIndex + 1}`
      };
    }

    const modelKey = (modelProfile.id || 'w01').toLowerCase();
    const photoPool = MODEL_SHOT_POOLS[modelKey] || MODEL_SHOT_POOLS['w01'];
    const isProductOnly = modelProfile.gender === 'product_only' || modelProfile.id === 'p01';
    const isMacroShot = shotType === 'close_up' || shotIndex === 3;
    const shotImg = (isProductOnly || (isMacroShot && productImgSource))
      ? productImgSource
      : (photoPool[shotIndex % photoPool.length] || modelProfile.avatarUrl);

    return {
      id: `shot_${Date.now()}_${shotIndex + 1}_regen`,
      shotType: shotType as FashionShot['shotType'],
      title: `${modelProfile.name.split(' ')[0]} - Regenerated Angle ${shotIndex + 1}`,
      cameraMovement: 'slow_push',
      imageUrl: shotImg,
      durationSec: 3,
      fidelityScore: 96,
      status: 'completed',
      promptUsed: `Regenerated realistic shot of ${modelProfile.name} in ${analysis.primaryColor} ${analysis.category} in ${environment}.`
    };
  }

  async checkProductFidelity(input: FidelityCheckInput): Promise<FidelityReport> {
    return {
      overallScore: 94,
      colorAccuracy: 96,
      borderPreservation: 93,
      patternFidelity: 92,
      garmentStructure: 95,
      passed: true,
      notes: [
        'Primary color match verified within 96% spectral consistency',
        'Gold zari border width and motif placement accurately preserved',
        'Fabric drape structure matches authentic South Indian draping rules',
        'No artificial warping or AI artifacts detected in garment folds'
      ]
    };
  }

  async generateBilingualScript(input: GenerateScriptInput): Promise<ReelScript> {
    const { analysis, userInfo, brandName, durationSec, modelProfile, presentationMode = 'hybrid', speakingStyle = 'festive', speakerType = 'female_model' } = input;
    const cat = userInfo.category || analysis.category;
    const color = userInfo.color || analysis.primaryColor;
    const fabric = userInfo.fabric || analysis.fabricAppearance;
    const priceText = userInfo.price ? `₹${userInfo.price.toLocaleString('en-IN')}` : 'ഓഫർ വിലയിൽ';
    const offerText = userInfo.currentOffer || '';
    const modelName = (modelProfile?.name || 'AI Model').split(' ')[0];

    const isShirting = analysis.isShirtingMaterial || cat.toLowerCase().includes('shirt');
    const isPrinted = analysis.shirtingType === 'printed' || analysis.pattern.toLowerCase().includes('print');
    const isMen = analysis.targetGender === 'men';
    const isKids = analysis.targetGender === 'girls' || analysis.targetGender === 'boys';

    let mlTitle = `${brandName} പുതിയ ${cat} കളക്ഷൻ`;
    let mlScript = `നിങ്ങളുടെ വിശേഷ ദിവസങ്ങൾക്ക് മാറ്റുകൂട്ടാൻ ${brandName} അവതരിപ്പിക്കുന്ന മനോഹരമായ ${color} ${cat}. പ്യുവർ ${fabric} ഫാബ്രിക്കിൽ തീർത്ത പാരമ്പര്യ പ്രൗഢി. ${priceText} ഇന്നുതന്നെ സ്വന്തമാക്കൂ!`;
    let mlCaption = `കണ്ണഞ്ചിപ്പിക്കുന്ന പാരമ്പര്യ ഭംഗി! ✨ ഞങ്ങളുടെ പുതിയ ${cat} കളക്ഷൻ ഇപ്പോൾ ലഭ്യമാണ്. കൂടുതൽ വിവരങ്ങൾക്കും ഓർഡറുകൾക്കും മെസ്സേജ് അയക്കൂ അല്ലെങ്കിൽ വിളിക്കൂ! 🛍️`;

    let enTitle = `${brandName} Exclusive ${cat} Collection`;
    let enScript = `Elevate your festive celebrations with ${brandName}'s breathtaking ${color} ${cat}. Crafted in pure ${fabric} with intricate artisan details. Get yours today at ${priceText}!`;
    let enCaption = `Elegance woven into perfection! ✨ Discover our all-new ${cat} range at ${brandName}. DM us or WhatsApp now to order! 🛍️`;

    // Segment definition based on product type and presentation mode
    let scriptSegments: ScriptSegment[] = [];

    if (isShirting) {
      if (isPrinted) {
        mlTitle = `${brandName} പ്രീമിയം പ്രിന്റഡ് ഷർട്ടിംഗ് ഫാബ്രിക്സ്`;
        mlScript = `ഈ ഓണത്തിന് നിങ്ങളുടെ കാഷ്വൽ സ്റ്റൈലിന് ഒരു പുതിയ ലുക്ക് നൽകാം! കൃഷ്ണന്റെയും മയിൽപ്പീലികളുടെയും മനോഹരമായ പ്രിന്റാണ് ഈ പ്യുവർ ${fabric} ഷർട്ടിംഗ് മെറ്റീരിയലിന്റെ പ്രത്യേകത. തുന്നിയാൽ പെർഫെക്റ്റ് ഫിറ്റ്! മീറ്ററിന് ${priceText} മുതൽ. ഇന്ന് തന്നെ തിരഞ്ഞെടുക്കൂ!`;
        mlCaption = `ട്രിപ്പുകൾക്കും കാഷ്വൽ ഔട്ടിംഗുകൾക്കും ട്രെൻഡി ലുക്ക്! 🌴 ഞങ്ങളുടെ പ്രിന്റഡ് കോട്ടൺ / ലിനൻ ഷർട്ടിംഗ് കളക്ഷൻ ഇപ്പോൾ ഓർഡർ ചെയ്യാം. DM us for orders! ✂️`;
        enTitle = `${brandName} Artisanal Printed Shirting Fabric`;
        enScript = `Give your festive casual style a fresh upgrade this season! Handcrafted prints on pure ${fabric} shirting material, tailor-made for sharp bespoke fits. Starting from ${priceText}. Choose your cut today!`;
        enCaption = `Expressive prints crafted for effortless flair! 🌴 Explore our printed cotton & linen shirting fabrics at ${brandName}. WhatsApp to order cuts! ✂️`;

        scriptSegments = [
          {
            segmentId: 'seg_1',
            text: 'ഈ ഓണത്തിന് നിങ്ങളുടെ കാഷ്വൽ സ്റ്റൈലിന് ഒരു പുതിയ ലുക്ക് നൽകാം!',
            textEn: 'Give your festive casual style a fresh upgrade this season!',
            language: 'ml-IN',
            duration: 3.5,
            type: presentationMode === 'voice_over' ? 'VOICE_OVER' : 'TALKING_MODEL',
            speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
            shotId: 'shot_1',
            shotIndex: 0,
            startTime: 0,
            endTime: 3.5
          },
          {
            segmentId: 'seg_2',
            text: `കൃഷ്ണന്റെയും മയിൽപ്പീലികളുടെയും മനോഹരമായ പ്രിന്റാണ് ഈ പ്യുവർ ${fabric} ഷർട്ടിംഗ് മെറ്റീരിയലിന്റെ പ്രത്യേകത.`,
            textEn: `Artisan prints on pure ${fabric} shirting material tailored for supreme comfort.`,
            language: 'ml-IN',
            duration: 4.5,
            type: presentationMode === 'talking_model' ? 'TALKING_MODEL' : 'VOICE_OVER',
            speaker: presentationMode === 'talking_model' ? `AI Model (${modelName})` : 'Narrator Voiceover',
            shotId: 'shot_2',
            shotIndex: 1,
            startTime: 3.5,
            endTime: 8.0
          },
          {
            segmentId: 'seg_3',
            text: `${offerText ? `${offerText} • ` : ''}പ്രീമിയം ബ്രീത്തബിൾ വീവ്, തുന്നിയാൽ പെർഫെക്റ്റ് ഫിറ്റ്! മീറ്ററിന് ${priceText} മുതൽ.`,
            textEn: `${offerText ? `${offerText} • ` : ''}Breathable luxury weave with bespoke tailor fit, starting from ${priceText}.`,
            language: 'ml-IN',
            duration: 3.5,
            type: 'PRODUCT_TEXT',
            speaker: 'Narrator Voiceover',
            shotId: 'shot_3',
            shotIndex: 2,
            startTime: 8.0,
            endTime: 11.5
          },
          {
            segmentId: 'seg_4',
            text: 'നിങ്ങളുടെ ഓണം ലുക്കിനായി ഇന്ന് തന്നെ തിരഞ്ഞെടുക്കൂ! WhatsApp Now.',
            textEn: 'Choose your signature Onam look today! WhatsApp Now.',
            language: 'ml-IN',
            duration: 3.5,
            type: presentationMode === 'voice_over' ? 'CTA' : 'TALKING_MODEL',
            speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
            shotId: 'shot_4',
            shotIndex: 3,
            startTime: 11.5,
            endTime: 15.0
          }
        ];
      } else {
        mlTitle = `${brandName} എക്സിക്യൂട്ടീവ് പ്ലെയിൻ ലിനൻ & കോട്ടൺ ഷർട്ടിംഗ്`;
        mlScript = `കസവു മുണ്ടിനൊപ്പവും ഓഫീസ് ഫോർമലുകൾക്കും അനുയോജ്യമായ ${brandName} ന്റെ പ്ലെയിൻ ${color} ${fabric} ഷർട്ടിംഗ്. രാജകീയ ലളിത ഭംഗി! മീറ്ററിന് ${priceText} മുതൽ. ഇന്നുതന്നെ ഓർഡർ ചെയ്യൂ!`;
        enTitle = `${brandName} Luxury Plain Linen & Cotton Shirting`;
        enScript = `Crisp, breathable, and timeless. Discover ${brandName}'s royal ${color} plain ${fabric} shirting fabric. Perfect for bespoke tailored shirts at ${priceText}!`;

        scriptSegments = [
          {
            segmentId: 'seg_1',
            text: `വിശേഷങ്ങൾക്കും ഫോർമൽ ലുക്കിനും ഏറ്റവും മികച്ച പ്ലെയിൻ ഷർട്ടിംഗ്!`,
            textEn: `Refined plain shirting crafted for weddings and executive elegance!`,
            language: 'ml-IN',
            duration: 3.5,
            type: presentationMode === 'voice_over' ? 'VOICE_OVER' : 'TALKING_MODEL',
            speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
            shotId: 'shot_1',
            shotIndex: 0,
            startTime: 0,
            endTime: 3.5
          },
          {
            segmentId: 'seg_2',
            text: `കസവു മുണ്ടിനൊപ്പം പെയർ ചെയ്യാൻ അനുയോജ്യമായ പ്യുവർ ${fabric} ഫാബ്രിക്.`,
            textEn: `Pure ${fabric} fabric designed to pair seamlessly with Kerala Kasavu Mundu.`,
            language: 'ml-IN',
            duration: 4.5,
            type: presentationMode === 'talking_model' ? 'TALKING_MODEL' : 'VOICE_OVER',
            speaker: presentationMode === 'talking_model' ? `AI Model (${modelName})` : 'Narrator Voiceover',
            shotId: 'shot_2',
            shotIndex: 1,
            startTime: 3.5,
            endTime: 8.0
          },
          {
            segmentId: 'seg_3',
            text: `${offerText ? `${offerText} • ` : ''}രാജകീയ ലളിത ഭംഗി, തുന്നിയാൽ പെർഫെക്റ്റ് ഫിറ്റ്! മീറ്ററിന് ${priceText} മുതൽ.`,
            textEn: `${offerText ? `${offerText} • ` : ''}Royal understated elegance, starting from ${priceText} per meter.`,
            language: 'ml-IN',
            duration: 3.5,
            type: 'PRODUCT_TEXT',
            speaker: 'Narrator Voiceover',
            shotId: 'shot_3',
            shotIndex: 2,
            startTime: 8.0,
            endTime: 11.5
          },
          {
            segmentId: 'seg_4',
            text: 'ഇന്നുതന്നെ ഞങ്ങളുടെ വാട്സാപ്പിൽ ഓർഡർ ചെയ്യൂ!',
            textEn: 'Order directly on WhatsApp today!',
            language: 'ml-IN',
            duration: 3.5,
            type: presentationMode === 'voice_over' ? 'CTA' : 'TALKING_MODEL',
            speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
            shotId: 'shot_4',
            shotIndex: 3,
            startTime: 11.5,
            endTime: 15.0
          }
        ];
      }
    } else {
      // Saree / Ethnic / Women's & General Wear
      scriptSegments = [
        {
          segmentId: 'seg_1',
          text: `നിങ്ങളുടെ ആഘോഷങ്ങൾക്ക് കൂടുതൽ ഭംഗി നൽകാൻ ${brandName} ന്റെ പുതിയ ${cat}!`,
          textEn: `Celebrate festive moments with ${brandName}'s all-new ${cat}!`,
          language: 'ml-IN',
          duration: 3.5,
          type: presentationMode === 'voice_over' ? 'VOICE_OVER' : 'TALKING_MODEL',
          speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
          shotId: 'shot_1',
          shotIndex: 0,
          startTime: 0,
          endTime: 3.5
        },
        {
          segmentId: 'seg_2',
          text: `ആധികാരികമായ ${fabric} നെയ്ത്തും പരമ്പരാഗത കാഞ്ചീപുരം സരി ബോർഡറും.`,
          textEn: `Authentic ${fabric} weave with handcrafted rich gold zari border.`,
          language: 'ml-IN',
          duration: 4.5,
          type: presentationMode === 'talking_model' ? 'TALKING_MODEL' : 'VOICE_OVER',
          speaker: presentationMode === 'talking_model' ? `AI Model (${modelName})` : 'Narrator Voiceover',
          shotId: 'shot_2',
          shotIndex: 1,
          startTime: 3.5,
          endTime: 8.0
        },
        {
          segmentId: 'seg_3',
          text: `${offerText ? `${offerText} • ` : ''}${priceText} പ്രത്യേക ലോഞ്ച് ഓഫർ! നൂറു ശതമാനം ക്വാളിറ്റി ഗ്യാരണ്ടി.`,
          textEn: `${offerText ? `${offerText} • ` : ''}Special Launch Offer ${priceText} with 100% Quality Guarantee.`,
          language: 'ml-IN',
          duration: 3.5,
          type: 'PRODUCT_TEXT',
          speaker: 'Narrator Voiceover',
          shotId: 'shot_3',
          shotIndex: 2,
          startTime: 8.0,
          endTime: 11.5
        },
        {
          segmentId: 'seg_4',
          text: 'ഇന്നുതന്നെ ഞങ്ങളുടെ വാട്സാപ്പിൽ ഓർഡർ ചെയ്യൂ അല്ലെങ്കിൽ സ്റ്റോർ സന്ദർശിക്കൂ!',
          textEn: 'Order on WhatsApp today or visit our store!',
          language: 'ml-IN',
          duration: 3.5,
          type: presentationMode === 'voice_over' ? 'CTA' : 'TALKING_MODEL',
          speaker: presentationMode === 'voice_over' ? 'Narrator Voiceover' : `AI Model (${modelName})`,
          shotId: 'shot_4',
          shotIndex: 3,
          startTime: 11.5,
          endTime: 15.0
        }
      ];
    }

    const subtitles = scriptSegments.map((seg, idx) => ({
      id: `sub_${idx + 1}`,
      startTime: seg.startTime,
      endTime: seg.endTime,
      textMl: seg.text,
      textEn: seg.textEn || ''
    }));

    return {
      malayalamTitle: mlTitle,
      malayalamScript: scriptSegments.map(s => s.text).join(' '),
      malayalamCaption: mlCaption,
      malayalamHashtags: ['#KeralaFashion', '#SilkSaree', '#KeralaBoutique', '#OnamShopping', '#TraditionalWear', '#MalayaliReels'],
      englishTitle: enTitle,
      englishScript: scriptSegments.map(s => s.textEn || s.text).join(' '),
      englishCaption: enCaption,
      englishHashtags: ['#IndianFashion', '#TraditionalElegance', '#SareeLove', '#EthnicWear', '#KeralaStyle', '#FashionReel'],
      durationSec: durationSec || 15,
      hookLine: scriptSegments[0]?.text || 'നിങ്ങളുടെ ആഘോഷങ്ങൾക്ക് കൂടുതൽ ഭംഗി നൽകാൻ...',
      callToAction: scriptSegments[scriptSegments.length - 1]?.text || 'ഇന്നുതന്നെ ഞങ്ങളെ വാട്സാപ്പിൽ ബന്ധപ്പെടൂ.',
      subtitles,
      presentationMode,
      speakingStyle,
      speakerType,
      scriptSegments,
      isApproved: true,
      approvedScriptVersion: 1,
      approvedAt: new Date().toISOString()
    };
  }

  async generateSpeech(input: GenerateSpeechInput): Promise<{ 
    audioBase64?: string; 
    audioUrl?: string; 
    format: string;
    durationSec?: number;
    providerName: string;
    isMock: boolean;
  }> {
    return {
      audioUrl: 'synth_voice_stream',
      format: 'audio/mp3',
      durationSec: 15,
      providerName: 'Web Speech & Web Audio Synthesizer (Kerala Acoustic)',
      isMock: true
    };
  }

  async generateTalkingShot(input: GenerateTalkingVideoInput): Promise<TalkingVideoResult> {
    const { modelProfile, scriptSegment, expression = 'welcoming_smile', cameraFraming = 'chest_up_eye_level' } = input;
    const modelName = (modelProfile?.name || 'AI Model').split(' ')[0];

    const shot: FashionShot = {
      id: `shot_talking_${Date.now()}`,
      shotType: 'portrait',
      title: `${modelName} Speaking - ${scriptSegment.type}`,
      cameraMovement: 'static_hero',
      imageUrl: modelProfile.avatarUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      videoClipUrl: 'simulated_talking_head_clip',
      durationSec: scriptSegment.duration || 3.5,
      fidelityScore: 97,
      status: 'completed',
      isTalkingShot: true,
      talkingModelData: {
        isSpeaking: true,
        speakerName: modelProfile.name || 'AI Model',
        speakerRole: 'PRIMARY_MODEL',
        lipSyncScore: 94,
        faceConsistencyScore: 97,
        speechQualityScore: 95,
        scriptSegmentId: scriptSegment.segmentId,
        expression,
        cameraFraming,
        providerType: 'SIMULATED',
        providerName: 'Kerala AI Talking Model Engine (Client-Side Synchronizer)'
      }
    };

    const lipSyncReport: LipSyncQualityReport = {
      overallScore: 95,
      lipSyncScore: 94,
      faceConsistencyScore: 97,
      speechQualityScore: 95,
      audioSyncDeltaMs: 12,
      providerMode: 'MOCK',
      providerName: 'Kerala AI Talking Model Engine',
      passed: true,
      checks: {
        mouthMovement: true,
        audioSync: true,
        identityPreserved: true,
        garmentPreserved: true,
        naturalBlinking: true,
        noTeethArtifacts: true
      },
      details: [
        'Lip closure accurately matched Malayalam bilabials (പ, മ, ബ)',
        'Zero facial warping around jawline and cheek contours',
        'Garment texture and neckline preserved with 97% fidelity',
        'Natural micro-expressions and eye blink rhythm maintained'
      ]
    };

    return {
      shot,
      lipSyncReport,
      providerName: 'Kerala AI Talking Model Engine',
      providerType: 'SIMULATED'
    };
  }

  async validateLipSyncQuality(shot: FashionShot, audioUrl?: string): Promise<LipSyncQualityReport> {
    return {
      overallScore: shot.talkingModelData?.lipSyncScore || 94,
      lipSyncScore: shot.talkingModelData?.lipSyncScore || 94,
      faceConsistencyScore: shot.talkingModelData?.faceConsistencyScore || 96,
      speechQualityScore: shot.talkingModelData?.speechQualityScore || 95,
      audioSyncDeltaMs: 14,
      providerMode: 'MOCK',
      providerName: 'LipSync Quality Assurance Inspector',
      passed: true,
      checks: {
        mouthMovement: true,
        audioSync: true,
        identityPreserved: true,
        garmentPreserved: true,
        naturalBlinking: true,
        noTeethArtifacts: true
      },
      details: [
        'Phoneme-to-viseme timing within ±20ms threshold',
        'Model facial identity verified against base profile',
        'Lighting and shadow consistency matched studio background'
      ]
    };
  }

  async generateVideo(input: GenerateVideoInput): Promise<VideoGenerationResult> {
    const { modelProfile, analysis, environment, motionType, cameraMovement, durationSec } = input;

    // Simulate high-fidelity movement based on motionType
    const movementDesc = motionType === 'walking' ? 'naturally walking towards camera'
      : motionType === 'turning' ? 'gracefully turning to show garment drape'
      : motionType === 'close_up_detail' ? 'slowly moving to highlight fabric texture'
      : 'posing professionally';

    console.info(`[Mock Video Engine] Generating ${durationSec}s ${cameraMovement} shot of ${modelProfile.name} ${movementDesc} in ${environment}.`);

    return {
      videoUrl: 'simulated_ai_video_stream',
      thumbnailUrl: modelProfile.avatarUrl,
      durationSec,
      providerName: 'Kerala AI Fashion Motion Engine (Simulated)',
      isMock: true,
      fidelityScore: 98,
      qualityReport: {
        faceConsistency: 'GOOD',
        garmentPreservation: 'GOOD',
        movementRealism: 'GOOD'
      }
    };
  }

  async getCapabilities(): Promise<ProviderCapabilities> {
    const hasLiveKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    return {
      textGeneration: true,
      imageGeneration: true,
      videoGeneration: true,
      tts: true,
      talkingVideo: true,
      lipSync: true,
      referencePreservation: true,
      languagesSupported: ['ml-IN', 'en-IN', 'ta-IN', 'hi-IN'],
      activeTtsProvider: hasLiveKey ? 'Gemini Audio Preview / Web Speech' : 'Web Speech & Web Audio Synthesizer',
      activeLipSyncProvider: 'Integrated Canvas Sync & Talking Model Engine (Simulated)',
      isRealLipSyncAvailable: false
    };
  }
}
