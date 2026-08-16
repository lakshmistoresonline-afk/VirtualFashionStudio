import { AIModelProfile, BrandProfile, MusicTrack, ReelTemplate, VoiceConfig, TargetGender, ShootEnvironment } from '../types';

export const AI_MODELS_PRESETS: AIModelProfile[] = [
  // WOMEN (100% Kerala Native Models)
  {
    id: 'w01',
    code: 'W01',
    name: 'Anjali Menon (Kerala Traditional Bride • തൃശ്ശൂർ)',
    gender: 'women',
    ageGroup: 'young_adult',
    ethnicity: '100% Kerala Native / Malayali (തൃശ്ശൂർ തനിമ)',
    appearanceStyle: 'kerala_authentic',
    description: 'Authentic Malayali bride with expressive almond eyes, jasmine flowers (mullappoo) in braided hair, jimikki earrings, and warm Kerala complexion. Ideal for Kasavu Set Sarees, Kanchipuram bridal silks, and Onam collections.',
    avatarUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Kerala Saree', 'Kanchipuram Silk', 'Set Saree', 'Kasavu', 'Kurti', 'Churidar', 'Ethnic Wear'],
    recommendedGarments: ['Kerala Saree', 'Kanchipuram Silk', 'Set Saree', 'Kasavu', 'Kurti', 'Churidar', 'Ethnic Wear']
  },
  {
    id: 'w02',
    code: 'W02',
    name: 'Meera Nambiar (Heritage Tharavadu Elegance • കോഴിക്കോട്)',
    gender: 'women',
    ageGroup: 'adult',
    ethnicity: '100% Kerala Native / Malayali (മലബാർ പാരമ്പര്യം)',
    appearanceStyle: 'kerala_authentic',
    description: 'Dignified, authentic Kerala woman aesthetic with traditional Palakka Mala / Elakkathali jewelry styling, sandalwood pottu, natural warmth, and poised posture for temple wear and classic festive sarees.',
    avatarUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Kerala Saree', 'Set Mundu', 'Traditional Silk', 'Bridal Saree', 'Temple Saree'],
    recommendedGarments: ['Kerala Saree', 'Set Mundu', 'Traditional Silk', 'Bridal Saree', 'Temple Saree']
  },
  {
    id: 'w03',
    code: 'W03',
    name: 'Revathi Varma (Royal Travancore Heritage • തിരുവനന്തപുരം)',
    gender: 'women',
    ageGroup: 'mature',
    ethnicity: '100% Kerala Native / Malayali (തിരുവിതാംകൂർ രാജകീയത)',
    appearanceStyle: 'festive_royal',
    description: 'Sophisticated mature Malayali lady with royal Tharavadu elegance, perfect for Balaramapuram handloom sarees, Tussar silk, and senior family collections.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Handloom Sarees', 'Balaramapuram Cotton', 'Tussar Silk', 'Heritage Weaves', 'Matron Wear'],
    recommendedGarments: ['Handloom Sarees', 'Balaramapuram Cotton', 'Tussar Silk', 'Heritage Weaves', 'Matron Wear']
  },
  {
    id: 'w04',
    code: 'W04',
    name: 'Sneha Mathew (Contemporary Kochi Fashionista • എറണാകുളം)',
    gender: 'women',
    ageGroup: 'young_adult',
    ethnicity: '100% Kerala Native / Malayali (കൊച്ചി ഫാഷൻ)',
    appearanceStyle: 'contemporary_chic',
    description: 'Trendy, chic South Indian boutique model from Kochi with stylish hair and subtle makeup, perfect for designer kurtis, linen fusion sarees, and modern festive gowns.',
    avatarUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Designer Kurti', 'Linen Saree', 'Party Gowns', 'Fusion Wear', 'Churidar'],
    recommendedGarments: ['Designer Kurti', 'Linen Saree', 'Party Gowns', 'Fusion Wear', 'Churidar']
  },
  {
    id: 'w05',
    code: 'W05',
    name: 'Malavika Nair (Classical Mohiniyattam & Temple Grace • പാലക്കാട്)',
    gender: 'women',
    ageGroup: 'adult',
    ethnicity: '100% Kerala Native / Malayali (പാലക്കാടൻ തനിമ)',
    appearanceStyle: 'traditional_south_indian',
    description: 'Expressive classical Kerala model with traditional braided hair, gold temple ornaments (Kasu Mala, Mulla Mottu Mala), ideal for wedding trousseaus, silk drapes, and festival launches.',
    avatarUrl: 'https://images.unsplash.com/photo-1610030469668-932ec596e7b2?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Temple Silk Saree', 'Kalyana Pattu', 'Festive Pattu', 'Dhavani Set'],
    recommendedGarments: ['Temple Silk Saree', 'Kalyana Pattu', 'Festive Pattu', 'Dhavani Set']
  },

  // MEN (100% Kerala Native Models)
  {
    id: 'm01',
    code: 'M01',
    name: 'Rahul Kurup (Authentic Kerala Groom • കോട്ടയം / കൊച്ചി)',
    gender: 'men',
    ageGroup: 'young_adult',
    ethnicity: '100% Kerala Native / Malayali (കേരള വരൻ)',
    appearanceStyle: 'kerala_authentic',
    description: 'Handsome Kerala young adult with well-groomed Kerala beard & mustache, natural charisma, perfect for Kasavu Double Mundu, silk melmundu, and Onam festive shirts.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Kasavu Mundu', 'Double Mundu', 'Kerala Shirt', 'Kurta', 'Festival Wear', 'Shirting Fabric'],
    recommendedGarments: ['Kasavu Mundu', 'Double Mundu', 'Kerala Shirt', 'Kurta', 'Festival Wear', 'Shirting Fabric']
  },
  {
    id: 'm02',
    code: 'M02',
    name: 'Arjun Varma (Modern Kerala Executive • എറണാകുളം)',
    gender: 'men',
    ageGroup: 'adult',
    ethnicity: '100% Kerala Native / Malayali (മോഡേൺ മലയാളി)',
    appearanceStyle: 'contemporary_chic',
    description: 'Sharp, polished Kerala professional look for breathable European linen shirts, tailored cotton kurtas, and contemporary festive ethnic wear paired with Kasavu mundu or trousers.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Linen Shirts', 'Designer Kurta', 'Executive Wear', 'Casuals', 'Shirting Fabric'],
    recommendedGarments: ['Linen Shirts', 'Designer Kurta', 'Executive Wear', 'Casuals', 'Shirting Fabric']
  },
  {
    id: 'm03',
    code: 'M03',
    name: 'Unnikrishnan Namboothiri (Traditional Kerala Karanavar • തൃശ്ശൂർ)',
    gender: 'men',
    ageGroup: 'mature',
    ethnicity: '100% Kerala Native / Malayali (കാരണവർ തനിമ)',
    appearanceStyle: 'kerala_authentic',
    description: 'Authentic senior Kerala gentleman with traditional demeanor, double mundu with gold kara, perfect for Vishu, Onam, and traditional family collections.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Double Mundu', 'Silk Jubba', 'Pattuvetti', 'Onam Wear', 'Vishu Special'],
    recommendedGarments: ['Double Mundu', 'Silk Jubba', 'Pattuvetti', 'Onam Wear', 'Vishu Special']
  },
  {
    id: 'm04',
    code: 'M04',
    name: 'Gokul Das (Kerala Festive Youth • മലപ്പുറം / കോഴിക്കോട്)',
    gender: 'men',
    ageGroup: 'young_adult',
    ethnicity: '100% Kerala Native / Malayali (യുവ മലയാളി)',
    appearanceStyle: 'kerala_authentic',
    description: 'Energetic, approachable Malayali youth with casual charm for printed festival kurtas, trendy mundu stylings, botanical cotton shirts, and vibrant occasion wear.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Printed Kurta', 'Single Mundu', 'Casual Shirts', 'Onam Youth Wear', 'Printed Shirting'],
    recommendedGarments: ['Printed Kurta', 'Single Mundu', 'Casual Shirts', 'Onam Youth Wear', 'Printed Shirting']
  },

  // GIRLS (100% Kerala Native Models)
  {
    id: 'g01',
    code: 'G01',
    name: 'Diya Mol (Kerala Kunjumoal 4-6 yrs • കാസർഗോഡ് / കണ്ണൂർ)',
    gender: 'girls',
    ageGroup: 'child_3_5',
    ethnicity: '100% Kerala Native / Malayali Child (കുഞ്ഞുമോൾ)',
    appearanceStyle: 'traditional_south_indian',
    description: 'Adorable Kerala girl with bright expressive eyes, cute pattu pavada, kasavu skirt, and jasmine hair garland for Onam/Vishu kids collections.',
    avatarUrl: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Pattu Pavada', 'Kasavu Skirt', 'Baby Frocks', 'Vishu Pavada'],
    recommendedGarments: ['Pattu Pavada', 'Kasavu Skirt', 'Baby Frocks', 'Vishu Pavada']
  },
  {
    id: 'g02',
    code: 'G02',
    name: 'Aparna Menon (Kerala Pre-teen Dhavani Model 10-12 yrs • ആലപ്പുഴ)',
    gender: 'girls',
    ageGroup: 'preteen_10_13',
    ethnicity: '100% Kerala Native / Malayali Pre-teen (ദാവാണി കുട്ടി)',
    appearanceStyle: 'kerala_authentic',
    description: 'Natural, bright Kerala schoolgirl in traditional Kerala Pavada-Blouse, half-saree (Dhavani), and modest festival wear.',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Teen Pavada', 'Dhavani Set', 'Girls Kurti', 'Festival Wear'],
    recommendedGarments: ['Teen Pavada', 'Dhavani Set', 'Girls Kurti', 'Festival Wear']
  },

  // BOYS (100% Kerala Native Models)
  {
    id: 'b01',
    code: 'B01',
    name: 'Kiran Unni (Kerala Kutti 4-6 yrs • ഇടുക്കി / കോട്ടയം)',
    gender: 'boys',
    ageGroup: 'child_3_5',
    ethnicity: '100% Kerala Native / Malayali Child (ഉണ്ണിക്കുട്ടൻ)',
    appearanceStyle: 'traditional_south_indian',
    description: 'Bright, smiling Kerala boy in miniature Kasavu Mundu, gold border shirt, and festival accessories for Vishu and Onam.',
    avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Kids Kasavu Mundu', 'Boys Kurta Pajama', 'Kids Silk Shirt'],
    recommendedGarments: ['Kids Kasavu Mundu', 'Boys Kurta Pajama', 'Kids Silk Shirt']
  },
  {
    id: 'b02',
    code: 'B02',
    name: 'Madhav Namboodiri (Kerala Youth Pre-teen 10-12 yrs • വയനാട് / പാലക്കാട്)',
    gender: 'boys',
    ageGroup: 'preteen_10_13',
    ethnicity: '100% Kerala Native / Malayali Pre-teen (കേരള ബാലൻ)',
    appearanceStyle: 'kerala_authentic',
    description: 'Handsome Kerala young boy in traditional silk jubba and Kasavu dhothi for wedding & Onam catalogs.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['Boys Silk Jubba', 'Kasavu Dhothi', 'Festive Shirts'],
    recommendedGarments: ['Boys Silk Jubba', 'Kasavu Dhothi', 'Festive Shirts']
  },

  // PRODUCT ONLY (Authentic Kerala Heritage Setup)
  {
    id: 'p01',
    code: 'P01',
    name: 'Kerala Heritage Studio (Nilavilakku & Teakwood • Product Only)',
    gender: 'product_only',
    ageGroup: 'adult',
    ethnicity: 'Authentic Kerala Heritage Setup (കേരള തനിമ സ്റ്റുഡിയോ)',
    appearanceStyle: 'minimalist',
    description: 'No human model. Authentic Kerala heritage studio setup with Nilavilakku brass lamp lighting, teakwood pillars, pookalam flower base, and luxurious fabric lighting.',
    avatarUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
    recommendedFor: ['All Products', 'Kasavu Sarees', 'Silk Sarees', 'Mundu', 'Fabrics', 'Shirting'],
    recommendedGarments: ['All Products', 'Kasavu Sarees', 'Silk Sarees', 'Mundu', 'Fabrics', 'Shirting']
  }
];

export const REEL_TEMPLATES_PRESETS: ReelTemplate[] = [
  {
    id: 'tpl_kerala_traditional',
    name: 'Traditional Kerala Heritage',
    category: 'Traditional',
    description: 'Warm gold aesthetics, temple bells ambient tone, elegant pan transitions, perfect for Set Sarees, Kasavu Mundu & Silk.',
    previewThumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80',
    badge: 'Popular for Onam & Weddings',
    recommendedDuration: 15,
    themeColor: '#D97706',
    transitionEffect: 'crossfade',
    defaultMusicMood: 'traditional_kerala',
    ctaText: 'ഇന്നുതന്നെ ഓർഡർ ചെയ്യൂ | Order Now'
  },
  {
    id: 'tpl_premium_luxury',
    name: 'Royale Luxury Silk',
    category: 'Luxury',
    description: 'High-contrast cinematic lighting, subtle slow-motion pushes, refined typography for high-end Kanchipuram and Designer collections.',
    previewThumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80',
    badge: 'High Conversion',
    recommendedDuration: 15,
    themeColor: '#831843',
    transitionEffect: 'zoom_pan',
    defaultMusicMood: 'luxury_acoustic',
    ctaText: 'Exclusive Collection • Visit Store'
  },
  {
    id: 'tpl_modern_boutique',
    name: 'Chic Boutique & Casuals',
    category: 'Modern',
    description: 'Vibrant, fast-paced contemporary cut with clean captions for modern Kurtis, Western fusion, and everyday office wear.',
    previewThumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    badge: 'Trending Audio Sync',
    recommendedDuration: 15,
    themeColor: '#4F46E5',
    transitionEffect: 'slide_up',
    defaultMusicMood: 'festival_energetic',
    ctaText: 'Shop New Arrivals • DM to Order'
  },
  {
    id: 'tpl_festive_offer',
    name: 'Festival Special Offer',
    category: 'Promotional',
    description: 'Eye-catching discount badges, dynamic text animations, and urgent call-to-action for sale events & seasonal offers.',
    previewThumbnail: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=500&auto=format&fit=crop&q=80',
    badge: 'Sale & Discounts',
    recommendedDuration: 15,
    themeColor: '#DC2626',
    transitionEffect: 'zoom_pan',
    defaultMusicMood: 'festival_energetic',
    ctaText: 'Limited Stock • WhatsApp Us Now'
  }
];

export const TEMPLATES_PRESETS = REEL_TEMPLATES_PRESETS;

export const MUSIC_TRACKS_PRESETS: MusicTrack[] = [
  {
    id: 'track_kerala_temple',
    title: 'Sopanam Melodies (Traditional Chenda & Flute)',
    genre: 'traditional_kerala',
    mood: 'Devotional & Royal Heritage',
    durationSec: 30,
    bpm: 88,
    audioUrl: 'traditional_kerala_flute',
    license: 'Royalty-Free Commercial License'
  },
  {
    id: 'track_luxury_acoustic',
    title: 'Silk & Sitar Ambient Harmony',
    genre: 'luxury_acoustic',
    mood: 'Sophisticated & Calming Luxury',
    durationSec: 30,
    bpm: 96,
    audioUrl: 'sitar_luxury_acoustic',
    license: 'Royalty-Free Commercial License'
  },
  {
    id: 'track_festival_energetic',
    title: 'Utsavam Rhythm & Veena Beats',
    genre: 'festival_energetic',
    mood: 'Joyful, Upbeat & Viral Reels',
    durationSec: 30,
    bpm: 118,
    audioUrl: 'utsavam_veena_beat',
    license: 'Royalty-Free Commercial License'
  },
  {
    id: 'track_ambient_calm',
    title: 'Morning Raaga - Acoustic Breeze',
    genre: 'ambient_calm',
    mood: 'Gentle, Minimal & Aesthetic',
    durationSec: 30,
    bpm: 78,
    audioUrl: 'morning_raaga_calm',
    license: 'Royalty-Free Commercial License'
  }
];

export const VOICES_PRESETS: VoiceConfig[] = [
  {
    language: 'ml-IN',
    voiceId: 'kalyani_ml',
    voiceName: 'Kalyani (കല്ല്യാണി - Kerala Female Natural)',
    gender: 'female',
    speed: 1.0,
    pitch: 1.0
  },
  {
    language: 'ml-IN',
    voiceId: 'madhavan_ml',
    voiceName: 'Madhavan (മാധവൻ - Kerala Male Royal)',
    gender: 'male',
    speed: 1.0,
    pitch: 0.95
  },
  {
    language: 'en-IN',
    voiceId: 'ananya_en',
    voiceName: 'Ananya (Indian English - Elegant Female)',
    gender: 'female',
    speed: 1.05,
    pitch: 1.0
  },
  {
    language: 'en-IN',
    voiceId: 'arjun_en',
    voiceName: 'Arjun (Indian English - Confident Male)',
    gender: 'male',
    speed: 1.0,
    pitch: 0.95
  }
];

export const KERALA_SHOWROOM_BRANCHES = [
  {
    id: 'br_kochi_mg',
    city: 'Kochi (MG Road)',
    name: 'Lakshmi Stores Flagship - MG Road, Ernakulam',
    address: 'Near Shenoys Junction, MG Road, Kochi, Kerala 682035',
    phone: '+91 484 238 5200',
    whatsapp: '+91 98470 12345',
    isFlagship: true
  },
  {
    id: 'br_kochi_lulu',
    city: 'Kochi (Lulu Mall)',
    name: 'Lakshmi Stores - Ground Floor, LuLu International Mall',
    address: 'Edappally, Kochi, Kerala 682024',
    phone: '+91 484 272 8000',
    whatsapp: '+91 98470 23456'
  },
  {
    id: 'br_calicut',
    city: 'Kozhikode',
    name: 'Lakshmi Stores - Mavoor Road, Calicut',
    address: 'Opposite KSRTC Terminal, Mavoor Road, Kozhikode 673004',
    phone: '+91 495 272 4500',
    whatsapp: '+91 98470 34567',
    isFlagship: true
  },
  {
    id: 'br_tvm',
    city: 'Thiruvananthapuram',
    name: 'Lakshmi Stores - Statue, MG Road, Trivandrum',
    address: 'Opposite Secretariat, Statue Junction, Trivandrum 695001',
    phone: '+91 471 247 9000',
    whatsapp: '+91 98470 45678',
    isFlagship: true
  },
  {
    id: 'br_thrissur',
    city: 'Thrissur',
    name: 'Lakshmi Stores - Round North, Thrissur (Heritage Store)',
    address: 'Round North, Thrissur, Kerala 680001',
    phone: '+91 487 233 7000',
    whatsapp: '+91 98470 56789',
    isFlagship: true
  },
  {
    id: 'br_kottayam',
    city: 'Kottayam',
    name: 'Lakshmi Stores - TB Road, Kottayam',
    address: 'Near KSRTC Stand, TB Road, Kottayam 686001',
    phone: '+91 481 256 9000',
    whatsapp: '+91 98470 67890'
  },
  {
    id: 'br_kannur',
    city: 'Kannur',
    name: 'Lakshmi Stores - Fort Road, Kannur',
    address: 'Fort Road, Kannur, Kerala 670001',
    phone: '+91 497 271 2000',
    whatsapp: '+91 98470 78901'
  },
  {
    id: 'br_palakkad',
    city: 'Palakkad',
    name: 'Lakshmi Stores - GB Road, Palakkad',
    address: 'Near Stadium Bus Stand, GB Road, Palakkad 678001',
    phone: '+91 491 250 4000',
    whatsapp: '+91 98470 89012'
  },
  {
    id: 'br_kollam',
    city: 'Kollam',
    name: 'Lakshmi Stores - Chinnakkada, Kollam',
    address: 'Chinnakkada, Kollam, Kerala 691001',
    phone: '+91 474 276 5000',
    whatsapp: '+91 98470 90123'
  },
  {
    id: 'br_dubai',
    city: 'Dubai (UAE)',
    name: 'Lakshmi Stores - Meena Bazaar / Karama, Dubai',
    address: 'Meena Bazaar, Bur Dubai, UAE',
    phone: '+971 4 359 8888',
    whatsapp: '+971 50 123 4567',
    isFlagship: true
  }
];

export const BRAND_PRESETS: BrandProfile[] = [
  {
    id: 'lakshmi_stores_main',
    name: 'Lakshmi Stores',
    tagline: 'The Weaver\'s Pride • പരമ്പരാഗത തനിമയും വിശ്വാസ്യതയും',
    phone: '+91 484 238 5200',
    whatsapp: '+91 98470 12345',
    instagram: '@lakshmistores_official',
    website: 'www.lakshmistores.in',
    primaryColor: '#791224', // Royal Maroon
    secondaryColor: '#D4AF37', // Antique Gold
    fontFamily: 'serif',
    disclaimer: 'Official product showcase from Lakshmi Stores. AI visual drape modeled with 100% fabric & zari preservation. Visit any of our retail showrooms across Kerala & UAE.',
    showDisclaimer: true,
    brandTier: 'enterprise_retailer',
    verifiedBadgeText: 'Lakshmi Stores Official Verified Catalog',
    hasSilkMarkBadge: true,
    hasHandloomBadge: true,
    campaignMode: 'souparnika_bridal',
    showrooms: KERALA_SHOWROOM_BRANCHES,
    selectedShowroomId: 'br_kochi_mg'
  },
  {
    id: 'souparnika_bridal',
    name: 'Lakshmi Bridal Studio & Silks',
    tagline: 'Where Royal Malayali Weddings Begin • കല്യാണപ്പട്ട്',
    phone: '+91 484 238 5200',
    whatsapp: '+91 98470 12345',
    instagram: '@lakshmi_bridalsilks',
    website: 'www.lakshmistores.in/bridal',
    primaryColor: '#58111A', // Deep Wedding Crimson
    secondaryColor: '#E6CA65', // Royal Temple Gold
    fontFamily: 'serif',
    disclaimer: 'Hand-woven Muhurtha Kanchipuram & Kalyana Pattu from Lakshmi Stores. Book a private video styling appointment with our master drapers.',
    showDisclaimer: true,
    brandTier: 'enterprise_retailer',
    verifiedBadgeText: 'Pure Mulberry Silk Mark Certified',
    hasSilkMarkBadge: true,
    hasHandloomBadge: true,
    campaignMode: 'souparnika_bridal',
    showrooms: KERALA_SHOWROOM_BRANCHES,
    selectedShowroomId: 'br_kochi_mg'
  },
  {
    id: 'lakshmi_mens_studio',
    name: 'Lakshmi Stores Men\'s Lounge & Shirting',
    tagline: 'Bespoke Linen, Pure Giza & Traditional Mundu',
    phone: '+91 484 238 5200',
    whatsapp: '+91 98470 12345',
    instagram: '@lakshmistores_men',
    website: 'www.lakshmistores.in/men',
    primaryColor: '#1E293B', // Modern Slate Navy
    secondaryColor: '#EAB308', // Amber Gold
    fontFamily: 'sans',
    disclaimer: 'Premium unstitched shirting fabrics & Kasavu double mundu sets. Custom tailoring assistance available across all Lakshmi Stores branches.',
    showDisclaimer: true,
    brandTier: 'enterprise_retailer',
    verifiedBadgeText: '100% Pure European Linen & Giza Cotton Certified',
    hasSilkMarkBadge: false,
    hasHandloomBadge: true,
    campaignMode: 'mens_shirting_fest',
    showrooms: KERALA_SHOWROOM_BRANCHES,
    selectedShowroomId: 'br_kochi_mg'
  },
  {
    id: 'seematti_silks',
    name: 'Seematti - Queen of Silks',
    tagline: 'The Ultimate Expression in Silks & Fashion',
    phone: '+91 484 235 4500',
    whatsapp: '+91 98471 22334',
    instagram: '@seemattisilks',
    website: 'www.seematti.com',
    primaryColor: '#8A1C5B', // Royal Magenta
    secondaryColor: '#F59E0B', // Amber
    fontFamily: 'serif',
    disclaimer: 'Exclusive bridal silks and contemporary ethnic couture from Seematti Kochi & Kottayam.',
    showDisclaimer: true,
    brandTier: 'enterprise_retailer',
    verifiedBadgeText: 'Seematti Certified Silk Mark',
    hasSilkMarkBadge: true,
    hasHandloomBadge: true,
    campaignMode: 'standard'
  },
  {
    id: 'jayalakshmi_silks',
    name: 'Jayalakshmi Silks',
    tagline: 'Celebrating Celebrations • കൊച്ചി | കോഴിക്കോട് | തിരുവനന്തപുരം',
    phone: '+91 484 236 6600',
    whatsapp: '+91 98472 33445',
    instagram: '@jayalakshmisilks',
    website: 'www.jayalakshmisilks.com',
    primaryColor: '#991B1B', // Rich Crimson
    secondaryColor: '#CA8A04', // Zari Gold
    fontFamily: 'serif',
    disclaimer: 'Curated bridal silks, lehengas, and celebration ethnic wear.',
    showDisclaimer: true,
    brandTier: 'enterprise_retailer',
    verifiedBadgeText: 'Jayalakshmi Heritage Guaranteed',
    hasSilkMarkBadge: true,
    hasHandloomBadge: true,
    campaignMode: 'standard'
  },
  {
    id: 'custom_boutique',
    name: 'Kerala Artisan Boutique & Weaves',
    tagline: 'Handloom Traditions & Contemporary Cuts',
    phone: '+91 98470 99887',
    whatsapp: '+91 98470 99887',
    instagram: '@kerala_boutique_official',
    website: 'www.keralaboutique.in',
    primaryColor: '#0F766E', // Deep Teal
    secondaryColor: '#D97706', // Warm Gold
    fontFamily: 'sans',
    disclaimer: 'Independent Kerala boutique showcasing artisanal handlooms & bespoke fashion.',
    showDisclaimer: true,
    brandTier: 'boutique',
    verifiedBadgeText: 'Artisanal Handloom Certified',
    hasSilkMarkBadge: false,
    hasHandloomBadge: true,
    campaignMode: 'standard'
  }
];

export const DEFAULT_BRAND_PRESET: BrandProfile = BRAND_PRESETS[0];

export const KERALA_CAMPAIGN_PRESETS = [
  {
    id: 'souparnika_bridal' as const,
    title: 'Lakshmi Bridal Saree Fest & Muhurtham',
    titleMl: 'ലക്ഷ്മി വിവാഹ പട്ടുത്സവം',
    badge: 'Flagship Bridal Saree Fest',
    themeColor: '#791224',
    bgGradient: 'from-rose-950 via-amber-950/40 to-slate-950',
    icon: '💍',
    description: 'Exclusive Muhurtha Kanchipuram, Kalyana Pattu & Temple Bridal sets for Kerala brides with Nadaswaram background & royal tone.',
    defaultMusicMood: 'traditional_kerala',
    hashtags: ['#LakshmiStores', '#LakshmiSilks', '#KeralaBride', '#MalayaliWedding', '#KalyanaPattu', '#KanchipuramSilk', '#KeralaJewellery']
  },
  {
    id: 'onam_utsavam' as const,
    title: 'Ponnonam Utsavam & Kasavu Fest',
    titleMl: 'പൊന്നോണം കസവുത്സവം',
    badge: 'Kerala\'s Grandest Festival',
    themeColor: '#D97706',
    bgGradient: 'from-amber-950 via-yellow-950/40 to-slate-950',
    icon: '🌺',
    description: 'Balaramapuram & Kuthampully Kasavu Set Sarees, Double Mundu, Pattu Pavada with Chenda Melam audio & Pookalam aesthetic.',
    defaultMusicMood: 'traditional_kerala',
    hashtags: ['#LakshmiStoresOnam', '#OnamFashion', '#KasavuSaree', '#SetMundu', '#KeralaHandloom', '#OnamVibes', '#MalayaliPride']
  },
  {
    id: 'mens_shirting_fest' as const,
    title: 'Men\'s Shirting & Suiting Lounge',
    titleMl: 'ഷർട്ടിംഗ് & സ്യൂട്ടിംഗ് ഫെസ്റ്റിവൽ',
    badge: 'Plain Linen & Printed Cottons',
    themeColor: '#2563EB',
    bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
    icon: '👔',
    description: '100% Pure European Linen solids, Egyptian Giza cottons, artisanal printed fabrics with tailor-fit collar/cuff visualization.',
    defaultMusicMood: 'luxury_acoustic',
    hashtags: ['#LakshmiStoresMen', '#LinenShirting', '#GizaCotton', '#KeralaMenStyle', '#PrintedShirts', '#KasavuMundu', '#GentlemensClub']
  },
  {
    id: 'vishu_kaineettam' as const,
    title: 'Vishu Kaineettam Special',
    titleMl: 'വിഷുക്കൈനീട്ടം സ്പെഷ്യൽ',
    badge: 'Auspicious Golden Prosperity',
    themeColor: '#CA8A04',
    bgGradient: 'from-yellow-950 via-amber-950/40 to-slate-950',
    icon: '🦚',
    description: 'Kanikkonna yellow accents, Kasavu gold tissue, Vishu Pavada, and golden prosperity collections with devotional raagas.',
    defaultMusicMood: 'ambient_calm',
    hashtags: ['#VishuKaineettam', '#LakshmiStoresVishu', '#KasavuGold', '#KeralaFestival', '#VishuCollection']
  },
  {
    id: 'ramzan_eid' as const,
    title: 'Eid & Ramzan Glamour',
    titleMl: 'റംസാൻ ഈദ് കളക്ഷൻ',
    badge: 'Celebration Ethnic Glamour',
    themeColor: '#059669',
    bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    icon: '🌙',
    description: 'Rich Georgette Anarkalis, Peshwai Brocades, Designer Kurtis, and Silk Kurta Pajamas for Eid festivities.',
    defaultMusicMood: 'festival_energetic',
    hashtags: ['#EidFashion', '#LakshmiStoresEid', '#RamzanSpecial', '#PartyWearKurti', '#MalabarFashion']
  },
  {
    id: 'christmas_newyear' as const,
    title: 'Christmas & New Year Gala',
    titleMl: 'ക്രിസ്മസ് ന്യൂഇയർ ഗാല',
    badge: 'Winter Festive & Western Fusion',
    themeColor: '#DC2626',
    bgGradient: 'from-red-950 via-rose-950/40 to-slate-950',
    icon: '🎄',
    description: 'Velvets, evening gowns, party wear fusion, and contemporary designer silks for Christmas weddings and New Year galas.',
    defaultMusicMood: 'festival_energetic',
    hashtags: ['#ChristmasFashion', '#KeralaChristmas', '#NewYearGala', '#DesignerGowns', '#LakshmiStoresParty']
  }
];

export const SAMPLE_PRODUCTS = [
  {
    id: 'sample_lakshmi_bridal_pattu',
    name: 'Lakshmi Stores Heritage Bridal Kanchipuram Silk Saree (Flat-Lay on Showroom Counter)',
    category: 'Saree',
    subcategory: 'Souparnika Pure Kanchipuram Bridal Silk',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Royal Crimson Maroon',
    secondaryColors: ['Pure Gold Zari Mayil Motifs', 'Temple Border'],
    fabric: 'Pure Mulberry Silk with 2gm Pure Gold Zari Weave',
    price: 18500,
    mrp: 24000,
    gender: 'women' as const,
    ageGroup: 'young_adult' as const,
    confidence: 99,
    captureContext: 'Lakshmi Stores Showroom Display Counter',
    description: 'Signature bridal Kanchipuram silk saree with rich woven gold zari pallu and traditional peacocks, captured on Lakshmi Stores display counter.',
    sku: 'LS-SOUP-8921',
    inStock: true
  },
  {
    id: 'sample_lakshmi_linen',
    name: 'Lakshmi Stores Pure European Linen Plain Shirting Fabric (Roll on Counter)',
    category: 'Shirting Fabric',
    subcategory: 'Plain Linen Shirting Material',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Pastel Sky Blue',
    secondaryColors: ['Natural Slub Weave', 'Matte Finish'],
    fabric: '100% Pure European Organic Linen (60 Lea)',
    price: 1350,
    mrp: 1800,
    gender: 'men' as const,
    ageGroup: 'young_adult' as const,
    confidence: 99,
    captureContext: 'Tabletop Fabric Bolt',
    description: 'Unstitched solid plain linen shirting material roll on Lakshmi Stores Men\'s Lounge counter. AI visualizes it as a bespoke tailor-fitted shirt paired with Kasavu Mundu.',
    isShirtingMaterial: true,
    shirtingType: 'plain' as const,
    cutLength: '1.60 Metres (Full Sleeve Cut)',
    gsmOrCount: '60 Lea Pure European Linen',
    sku: 'LS-LIN-402',
    inStock: true
  },
  {
    id: 'sample_lakshmi_printed_cotton',
    name: 'Lakshmi Stores Botanical Printed Cotton Shirting Fabric (Countertop Swatch)',
    category: 'Shirting Fabric',
    subcategory: 'Printed Cotton Shirting Material',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Indigo Blue & Ivory',
    secondaryColors: ['Mustard Gold Florals', 'Organic Dye'],
    fabric: 'Superfine 60s x 60s Combed Pure Cotton',
    price: 750,
    mrp: 1100,
    gender: 'men' as const,
    ageGroup: 'young_adult' as const,
    confidence: 98,
    captureContext: 'Countertop Display',
    description: 'Artisanal indigo botanical block-printed pure cotton shirting material swatch photographed on shop display. AI renders a modern Cuban collar shirt on Malayali model.',
    isShirtingMaterial: true,
    shirtingType: 'printed' as const,
    cutLength: '1.60 Metres (Regular Fit Cut)',
    gsmOrCount: '60s Combed Pure Cotton (110 GSM)',
    sku: 'LS-PRT-719',
    inStock: true
  },
  {
    id: 'sample_lakshmi_kasavu',
    name: 'Balaramapuram Pure Kasavu Double Mundu & Melmundu with 3-inch Gold Kara',
    category: 'Dhothi',
    subcategory: 'Mundu',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Natural Off-White / Cream',
    secondaryColors: ['Pure Gold Zari Kara (3-inch)', 'Temple Border'],
    fabric: '100% Handloom Mercerized Cotton with Gold Kasavu',
    price: 2450,
    mrp: 3200,
    gender: 'men' as const,
    ageGroup: 'young_adult' as const,
    confidence: 99,
    captureContext: 'Tabletop Display',
    description: 'Traditional Kerala pure kasavu double mundu with 3-inch pure gold zari border, folded neatly on display counter.',
    sku: 'LS-KAS-108',
    inStock: true
  },
  {
    id: 'sample_lakshmi_setmundu',
    name: 'Kerala Kasavu Handloom Set Mundu (Table Display)',
    category: 'Set Mundu',
    subcategory: 'Set Mundu',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Off-White / Cream',
    secondaryColors: ['Kasavu Gold', 'Emerald Green Piping'],
    fabric: '100% Handloom Cotton Tissue Kasavu',
    price: 3450,
    mrp: 4600,
    gender: 'women' as const,
    ageGroup: 'adult' as const,
    confidence: 98,
    captureContext: 'Countertop Table',
    description: 'Traditional Kerala cream cotton handloom Set Mundu featuring 3-inch pure kasavu gold border captured on retail display table.',
    sku: 'LS-SET-204',
    inStock: true
  },
  {
    id: 'sample_lakshmi_kurti',
    name: 'Lakshmi Stores Designer Embroidered Georgette Kurti',
    category: 'Kurti',
    subcategory: 'Designer Kurti',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Emerald Green & Gold',
    secondaryColors: ['Mustard Yellow', 'Zari Thread'],
    fabric: 'Chanderi Silk with Thread Work & Gotta Patti',
    price: 2699,
    mrp: 3799,
    gender: 'women' as const,
    ageGroup: 'young_adult' as const,
    confidence: 97,
    captureContext: 'Tabletop Flat-Lay',
    description: 'Festive emerald green embroidered kurti with intricate neckline and sleeve borders photographed flat on a wooden counter.',
    sku: 'LS-KRT-512',
    inStock: true
  },
  {
    id: 'sample_lakshmi_pattu_pavada',
    name: 'Little Royals - Traditional Girls Pattu Pavada Set (Flat-Lay)',
    category: 'Kids Wear',
    subcategory: 'Frock',
    imageUrl: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=800&auto=format&fit=crop&q=80',
    primaryColor: 'Rani Pink & Mustard Yellow',
    secondaryColors: ['Gold Border', 'Green Piping'],
    fabric: 'Art Silk with Cotton Inner Lining',
    price: 1950,
    mrp: 2600,
    gender: 'girls' as const,
    ageGroup: 'child_3_5' as const,
    confidence: 99,
    captureContext: 'Tabletop Flat-Lay',
    description: 'Vibrant South Indian traditional Pattu Pavada for girls with intricate gold brocade border photographed flat on a wooden table.',
    sku: 'LS-KID-303',
    inStock: true
  }
];

export function getSuggestedModelForGarment(
  productNameOrCategory: string,
  hintMeta?: { category?: string; gender?: string; isShirtingMaterial?: boolean; shirtingType?: string }
): {
  model: AIModelProfile;
  gender: TargetGender;
  environment: ShootEnvironment;
  reason: string;
} {
  const query = `${productNameOrCategory || ''} ${hintMeta?.category || ''}`.toLowerCase();
  const isShirting = Boolean(
    hintMeta?.isShirtingMaterial ||
    query.includes('shirting') ||
    query.includes('linen') ||
    query.includes('fabric') ||
    query.includes('cotton') ||
    query.includes('shirt') ||
    query.includes('bolt')
  );
  const isPrinted = hintMeta?.shirtingType === 'printed' || query.includes('print') || query.includes('floral');
  const isKids = query.includes('kid') || query.includes('pavada') || query.includes('frock') || query.includes('child') || query.includes('girl') || query.includes('boy');
  const isMen = isShirting || query.includes('dhothi') || query.includes('mundu') || query.includes('men') || query.includes('jubba');

  if (isKids) {
    const isBoy = query.includes('boy') || query.includes('unni');
    const childModel = isBoy 
      ? (AI_MODELS_PRESETS.find(m => m.id === 'b01') || AI_MODELS_PRESETS[9])
      : (AI_MODELS_PRESETS.find(m => m.id === 'g01') || AI_MODELS_PRESETS[7]);
    return {
      model: childModel,
      gender: isBoy ? 'boys' : 'girls',
      environment: isBoy ? 'festival_onam' : 'traditional_kerala',
      reason: `Auto-selected 100% Kerala Native Child Model (${childModel.name.split(' ')[0]}) for traditional kids festive wear.`
    };
  }

  if (isMen) {
    if (isPrinted) {
      const model = AI_MODELS_PRESETS.find(m => m.id === 'm04') || AI_MODELS_PRESETS[4];
      return {
        model,
        gender: 'men',
        environment: 'modern_fashion',
        reason: 'Selected Kerala Youth Model (Gokul Das) for trendy botanical printed shirting tailored resort look.'
      };
    }
    if (query.includes('linen') || query.includes('executive') || query.includes('formal')) {
      const model = AI_MODELS_PRESETS.find(m => m.id === 'm02') || AI_MODELS_PRESETS[4];
      return {
        model,
        gender: 'men',
        environment: 'modern_fashion',
        reason: 'Selected Kerala Executive Model (Arjun Varma) to showcase tailored European linen shirting.'
      };
    }
    const model = AI_MODELS_PRESETS.find(m => m.id === 'm01') || AI_MODELS_PRESETS[4];
    return {
      model,
      gender: 'men',
      environment: 'traditional_kerala',
      reason: 'Selected Kerala Native Model (Rahul Kurup) suited for tailored shirting paired with Kasavu Mundu.'
    };
  }

  // Women
  if (query.includes('kasavu') || query.includes('set mundu') || query.includes('kerala saree')) {
    const model = AI_MODELS_PRESETS.find(m => m.id === 'w02') || AI_MODELS_PRESETS[1];
    return {
      model,
      gender: 'women',
      environment: 'traditional_kerala',
      reason: 'Selected Kerala Malayali Model (Meera Nambiar) for authentic Set Mundu and Palakka jewelry.'
    };
  }

  if (query.includes('kurti') || query.includes('anarkali') || query.includes('western') || query.includes('dress')) {
    const model = AI_MODELS_PRESETS.find(m => m.id === 'w04') || AI_MODELS_PRESETS[3];
    return {
      model,
      gender: 'women',
      environment: 'boutique_interior',
      reason: 'Selected Contemporary Kochi Model (Sneha Mathew) for designer kurti styling.'
    };
  }

  // Default Traditional Saree
  const defaultModel = AI_MODELS_PRESETS.find(m => m.id === 'w01') || AI_MODELS_PRESETS[0];
  return {
    model: defaultModel,
    gender: 'women',
    environment: 'wedding_temple',
    reason: 'Selected Kerala Traditional Bridal Model (Anjali Menon) for rich Kanchipuram silk saree.'
  };
}

