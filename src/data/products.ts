import { Product, Review } from '../types';

import luxeChiffonEmerald from '../assets/images/luxe_chiffon_emerald_1783907027572.jpg';
import georgetteSuitBlue from '../assets/images/georgette_suit_blue_1783907105800.jpg';
import royalOrganzaIvory from '../assets/images/royal_organza_ivory_1783907042264.jpg';
import cottonNetMustard from '../assets/images/cotton_net_mustard_1783907093783.jpg';
import velvetSuitRuby from '../assets/images/velvet_suit_ruby_1783907056741.jpg';
import jamawarSuitCrimson from '../assets/images/jamawar_suit_crimson_1783907117113.jpg';
import lawnSuitMint from '../assets/images/lawn_suit_mint_1783907068145.jpg';
import silkPretPeach from '../assets/images/silk_pret_peach_1783907083187.jpg';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Abeer Luxury Chiffon Festive Edition",
    brand: "Maria.B. Luxe",
    category: "Chiffon",
    subCategory: "Festive Luxury",
    price: 950, // Retail value of set
    wholesalePrice: 590, // Wholesale pack price (Pack of 4)
    packSize: 4,
    discount: 10,
    sku: "PT-AB-2026-CH01",
    material: "Pure Chinese Crinkle Chiffon with Heavy Organza Borders",
    description: "An absolute masterpiece of handcraft. This luxury chiffon suit is adorned with gold tilla embroidery, intricate hand-threaded sequins, and a delicate pearl-studded neckline. The set features a custom raw silk trouser with cutwork laces and a heavily embroidered chiffon dupatta with four-sided scallop borders.",
    specifications: {
      shirt: "Pure Chinese Chinkle Chiffon Front & Back fully embroidered with handwork neckline patch.",
      dupatta: "Embroidered Chiffon Dupatta with delicate pearls and embroidered pallu patches.",
      trouser: "Premium Dull Raw Silk Trouser with heavy handwork lace trim.",
      embroideryDetails: "Tilla, zari, mirror-work accents, and signature 3D floral thread-work.",
      careInstructions: "Dry clean only. Store in a soft cotton bag away from direct sunlight."
    },
    images: [
      luxeChiffonEmerald,
      georgetteSuitBlue
    ],
    sizes: ["Unstitched", "M (Pack of 4)", "L (Pack of 4)", "XL (Pack of 4)"],
    colours: [
      { name: "Royal Emerald", hex: "#046307" },
      { name: "Crimson Red", hex: "#8b0000" },
      { name: "Midnight Onyx", hex: "#111111" },
      { name: "Blush Pink", hex: "#e0b0ff" }
    ],
    rating: 4.9,
    reviewsCount: 38,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true
  },
  {
    id: "prod-02",
    name: "Gul-e-Rana Royal Organza Collection",
    brand: "Sana Safinaz Heritage",
    category: "Organza",
    subCategory: "Festive Luxury",
    price: 1100,
    wholesalePrice: 720, // Pack of 5
    packSize: 5,
    discount: 15,
    sku: "PT-GR-2026-OR02",
    material: "Premium Korean Organza with Velvet Applique",
    description: "Elevate your wholesale boutique with this royal heritage piece. Features ultra-fine sheer Korean organza styled with heavy velvet patch applique work on the front border and sleeves. A matching net dupatta with foil-printed floral patterns and high-density banarasi jamawar trousers complete the premium look.",
    specifications: {
      shirt: "Premium sheer Korean Organza with hand-woven zari details and velvet border patching.",
      dupatta: "Soft Premium Net with gold foil-printed ethnic patterns and tassels.",
      trouser: "Banarasi Jamawar Trouser with custom golden motifs.",
      embroideryDetails: "Resham threads, matte gold wire-work (Kora/Dabka), and micro-beads.",
      careInstructions: "Professional dry clean only. Steam iron inside-out."
    },
    images: [
      royalOrganzaIvory,
      cottonNetMustard
    ],
    sizes: ["Unstitched", "S (Pack of 5)", "M (Pack of 5)", "L (Pack of 5)"],
    colours: [
      { name: "Ivory Cream", hex: "#fffdd0" },
      { name: "Mustard Gold", hex: "#e1ad01" },
      { name: "Plum Maroon", hex: "#5d192c" }
    ],
    rating: 4.8,
    reviewsCount: 24,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true
  },
  {
    id: "prod-03",
    name: "Meeras Velvet Cutwork Masterpiece",
    brand: "Gul Ahmed Bridal",
    category: "Velvet",
    subCategory: "Festive Luxury",
    price: 1450,
    wholesalePrice: 980, // Pack of 3
    packSize: 3,
    discount: 5,
    sku: "PT-ME-2026-VL03",
    material: "9000 Micro-Velvet with Pure Silk Lining",
    description: "Designed for the elite winter wedding season, this heavy micro-velvet set features deep regal jewel tones, custom laser-cut velvet borders, and intricate Kashmiri hand embroidery on the sleeves. Complete with a soft tissue silk dupatta featuring golden kiran laces and premium raw silk pants.",
    specifications: {
      shirt: "Ultra-plush 9000 Micro-Velvet with premium silk lining and heavy gold floral cuffs.",
      dupatta: "Pure Tissue Silk with banarasi borders and kiran gold lace trim.",
      trouser: "Rich Dull Raw Silk with embroidered hem patch.",
      embroideryDetails: "Traditional Kashmiri tilla work, badla wire embroidery, and bead loops.",
      careInstructions: "Never hand-wash or press directly with a standard iron. Dry clean only."
    },
    images: [
      velvetSuitRuby,
      jamawarSuitCrimson
    ],
    sizes: ["Unstitched", "M (Pack of 3)", "L (Pack of 3)", "XL (Pack of 3)"],
    colours: [
      { name: "Deep Ruby", hex: "#4a0404" },
      { name: "Ocean Teal", hex: "#004753" },
      { name: "Royal Purple", hex: "#300e3a" }
    ],
    rating: 4.9,
    reviewsCount: 18,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true
  },
  {
    id: "prod-04",
    name: "Zariyah Luxury Lawn Designer Series",
    brand: "Zaha Luxury Lawn",
    category: "Lawn",
    subCategory: "Unstitched",
    price: 680,
    wholesalePrice: 420, // Pack of 6
    packSize: 6,
    discount: 12,
    sku: "PT-ZA-2026-LW04",
    material: "90/70 Super-Fine Egyptian Pima Lawn",
    description: "The ultimate premium summer lawn collection. Crafted from long-staple Egyptian pima cotton, this fabric is incredibly soft, breathable, and holds a rich sheen. Features intricate Kashmiri thread-work borders and comes with a 100% pure silk digital printed dupatta that is light as a feather.",
    specifications: {
      shirt: "Super-fine 90/70 Egyptian Pima Lawn front with embroidered gala and sleeves.",
      dupatta: "100% Pure Silk digital-printed luxury dupatta.",
      trouser: "Dyed Pima Cotton trouser with self-embossed floral patterns.",
      embroideryDetails: "Delicate pastel resham thread-work with tiny hand-placed clear sequins.",
      careInstructions: "Wash with mild detergent. Do not bleach. Dry in shade."
    },
    images: [
      lawnSuitMint,
      silkPretPeach
    ],
    sizes: ["Unstitched", "M (Pack of 6)"],
    colours: [
      { name: "Mint Green", hex: "#98ff98" },
      { name: "Peach Blossom", hex: "#ffcba4" },
      { name: "Lavender Dust", hex: "#e6e6fa" },
      { name: "Sky Azure", hex: "#f0f8ff" }
    ],
    rating: 4.7,
    reviewsCount: 52,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false
  },
  {
    id: "prod-05",
    name: "Mahnoor Digital Silk Pret Set",
    brand: "Agha Noor Pret",
    category: "Silk",
    subCategory: "Ready-to-Wear",
    price: 880,
    wholesalePrice: 560, // Pack of 4
    packSize: 4,
    discount: 8,
    sku: "PT-MN-2026-SL05",
    material: "Pure Raw Silk 80g weight with Satin Finish",
    description: "For boutiques looking for ready-to-wear luxury. This semi-formal pret collection is made from premium heavy raw silk with a stunning satin finish. Features vintage Mughal miniature art-inspired digital prints, combined with hand-stitched crystal beads and a matching pure organza block-printed dupatta.",
    specifications: {
      shirt: "Ready-to-Wear Pure Raw Silk shirt with full inner lining and hand-crafted crystal beads.",
      dupatta: "Pure sheer Organza with traditional gold block-printed borders.",
      trouser: "Straight-cut Raw Silk trousers with gold tilla cuffs.",
      embroideryDetails: "Mughal miniature prints, kora/dabka on collar, and delicate hand-stitched beads.",
      careInstructions: "Dry clean only. Hang on wooden hangers to maintain structural shape."
    },
    images: [
      silkPretPeach,
      lawnSuitMint
    ],
    sizes: ["S (Pack of 4)", "M (Pack of 4)", "L (Pack of 4)", "XL (Pack of 4)"],
    colours: [
      { name: "Muted Sage", hex: "#bcbe97" },
      { name: "Dusky Teal", hex: "#5f7f8a" },
      { name: "Soft Lilac", hex: "#c8b2c9" }
    ],
    rating: 4.9,
    reviewsCount: 19,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true
  },
  {
    id: "prod-06",
    name: "Dilara Hand-Woven Cotton Net Elite",
    brand: "Khaadi Khas Signature",
    category: "Cotton",
    subCategory: "Semi-Stitched",
    price: 790,
    wholesalePrice: 480, // Pack of 4
    packSize: 4,
    discount: 10,
    sku: "PT-DL-2026-CT06",
    material: "Hand-Spun Cotton Net with Jacquard Weaving",
    description: "An elegant, understated, yet luxurious collection of semi-stitched suits. Made of hand-spun breathable cotton net fabric with self-weaving gold zari jacquard. The shirt features beautiful pastel thread hand-embroidery along the panels, coupled with a pure chiffon block-print tie-dye dupatta.",
    specifications: {
      shirt: "Semi-Stitched premium Cotton Net with gold jacquard self-weaver panels.",
      dupatta: "Pure Crinkle Chiffon dupatta with beautiful handcrafted tie-dye and gold lace.",
      trouser: "Premium Cambric Cotton trouser with delicate pin-tuck details.",
      embroideryDetails: "Hand-embroidered resham panels, crochet lace inserts, and small wooden buttons.",
      careInstructions: "Hand-wash gently with liquid detergent. Do not wring. Cool iron."
    },
    images: [
      cottonNetMustard,
      royalOrganzaIvory
    ],
    sizes: ["Unstitched", "M (Pack of 4)", "L (Pack of 4)"],
    colours: [
      { name: "Teal Green", hex: "#008080" },
      { name: "Rustic Coral", hex: "#cd5c5c" },
      { name: "Warm Ochre", hex: "#ccaa00" }
    ],
    rating: 4.6,
    reviewsCount: 31,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false
  },
  {
    id: "prod-07",
    name: "Soraya Heavy Embroidered Georgette",
    brand: "Elan Bridal Couture",
    category: "Georgette",
    subCategory: "Festive Luxury",
    price: 1300,
    wholesalePrice: 850, // Pack of 4
    packSize: 4,
    discount: 15,
    sku: "PT-SO-2026-GG07",
    material: "Premium Viscose Georgette with Silk Inner",
    description: "Make a powerful statement with this ultra-luxe georgette set. Boasting high-density, rich gold tilla embroidery on viscose georgette base with heavy hand-cut borders. It comes with a pure chiffon dupatta embellished with premium cutwork borders and luxury tassels.",
    specifications: {
      shirt: "Heavy Embroidered Viscose Georgette shirt with gold zari and sequins.",
      dupatta: "Pure Chiffon Dupatta with heavy four-side laser cutwork scallop embroidery.",
      trouser: "Premium Dull Raw Silk Trouser with heavy embroidery bottom patch.",
      embroideryDetails: "3D sequins, gold tilla, badla loops, and micro-pearl additions.",
      careInstructions: "Dry clean only. Direct sunlight exposure should be avoided."
    },
    images: [
      georgetteSuitBlue,
      luxeChiffonEmerald
    ],
    sizes: ["Unstitched", "S (Pack of 4)", "M (Pack of 4)", "L (Pack of 4)"],
    colours: [
      { name: "Vintage Champagne", hex: "#f3e5ab" },
      { name: "Sapphire Blue", hex: "#0f52ba" },
      { name: "Maroon Rust", hex: "#800000" }
    ],
    rating: 4.9,
    reviewsCount: 14,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true
  },
  {
    id: "prod-08",
    name: "Shehnai Royal Jamawar Festive Pack",
    brand: "Asim Jofa Signature",
    category: "Silk",
    subCategory: "Festive Luxury",
    price: 1500,
    wholesalePrice: 1050, // Pack of 3
    packSize: 3,
    discount: 10,
    sku: "PT-SH-2026-JM08",
    material: "Hand-Woven Royal Jamawar Silk",
    description: "A luxury tribute to subcontinental royal attire. Crafted from premium jamawar silk fabric woven with pure silver and gold zari threads. Includes a luxurious hand-crafted velvet shawl adorned with gold kiran borders, and straight silk pants, designed for major weddings.",
    specifications: {
      shirt: "Hand-Woven Royal Jamawar Silk shirt with embroidered neckline and sleeve cuffs.",
      dupatta: "Plush Velvet Shawl with traditional kiran lace borders and heavy gold corner motifs.",
      trouser: "Pure Raw Silk straight trousers.",
      embroideryDetails: "Authentic banarasi weaving, tilla wire embroidery, and premium gold beadwork.",
      careInstructions: "Dry clean only. Professional steam pressing to prevent thread damage."
    },
    images: [
      jamawarSuitCrimson,
      velvetSuitRuby
    ],
    sizes: ["Unstitched", "M (Pack of 3)", "L (Pack of 3)", "XL (Pack of 3)"],
    colours: [
      { name: "Royal Gold Crimson", hex: "#9b111e" },
      { name: "Teal Zari", hex: "#005f73" },
      { name: "Olive Antique", hex: "#556b2f" }
    ],
    rating: 5.0,
    reviewsCount: 9,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true
  }
];

export const DUMMY_REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Zaara Khan (Boutique Owner)",
    rating: 5,
    comment: "Excellent wholesale quality! The Maria.B Chiffon sets arrived perfectly packed in custom catalog boxes. The embroidery density is exactly like the premium pictures. Will order the winter velvet sets next week.",
    date: "2026-06-28",
    verified: true
  },
  {
    id: "rev-2",
    userName: "Sonia Mirza",
    rating: 5,
    comment: "Premium Textiles is our go-to wholesale distributor. High-quality long staple Egyptian lawn cotton. Our boutique clients absolutely love the digital silk printed shawls that come with it.",
    date: "2026-07-01",
    verified: true
  },
  {
    id: "rev-3",
    userName: "Rahul Sharma (Delhi Textiles)",
    rating: 4,
    comment: "Prompt delivery to Chandni Chowk store. Packaging is secure. Stitching finish on the ready-to-wear pret suits is very clean, and raw silk weight is authentic. A highly reliable business partner.",
    date: "2026-07-08",
    verified: true
  }
];
