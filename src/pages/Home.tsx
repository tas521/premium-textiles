import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Star,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';
import { DUMMY_PRODUCTS, DUMMY_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

import luxeChiffonEmerald from '../assets/images/luxe_chiffon_emerald_1783907027572.jpg';
import georgetteSuitBlue from '../assets/images/georgette_suit_blue_1783907105800.jpg';
import royalOrganzaIvory from '../assets/images/royal_organza_ivory_1783907042264.jpg';
import cottonNetMustard from '../assets/images/cotton_net_mustard_1783907093783.jpg';
import velvetSuitRuby from '../assets/images/velvet_suit_ruby_1783907056741.jpg';
import jamawarSuitCrimson from '../assets/images/jamawar_suit_crimson_1783907117113.jpg';
import lawnSuitMint from '../assets/images/lawn_suit_mint_1783907068145.jpg';
import silkPretPeach from '../assets/images/silk_pret_peach_1783907083187.jpg';

export const Home: React.FC = () => {
  const { setAuthModalOpen } = useApp();

  // Hero slideshow state
  const heroSlides = [
    {
      image: luxeChiffonEmerald,
      tag: "Festive Autumn Luxury '26",
      title: "ROYAL CHIFFON DIRECTORY",
      subtitle: "Unveiling complete catalog sets curated with hand-woven tilla, kiran laces, and micro-pearl adornments.",
      cta: "Browse Chiffon Catalogue",
      link: "/shop?category=Chiffon"
    },
    {
      image: royalOrganzaIvory,
      tag: "Pure Egyptian Pima Cotton",
      title: "PREMIUM DESIGNER LAWN",
      subtitle: "Ultra-fine long-staple cotton suits with digital silk dupatta combinations. High-density commercial packs.",
      cta: "Sourcing Summer Lawn",
      link: "/shop?category=Lawn"
    },
    {
      image: velvetSuitRuby,
      tag: "Winter Bridal Elite Edition",
      title: "COUTURE MICRO-VELVET",
      subtitle: "Regal jewel-toned winter sets with heavy Kashmiri resham thread cuffs and laser-cut velvet applique work.",
      cta: "Acquire Velvet Sets",
      link: "/shop?category=Velvet"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Tabs for featured products
  const [featuredTab, setFeaturedTab] = useState<'new' | 'bestseller' | 'trending'>('new');

  const getFilteredProducts = () => {
    switch (featuredTab) {
      case 'new':
        return DUMMY_PRODUCTS.filter((p) => p.isNewArrival);
      case 'bestseller':
        return DUMMY_PRODUCTS.filter((p) => p.isBestSeller);
      case 'trending':
        return DUMMY_PRODUCTS.filter((p) => p.isTrending);
      default:
        return DUMMY_PRODUCTS;
    }
  };

  // Active reviews carousel
  const [activeReview, setActiveReview] = useState(0);

  // Categories grid details
  const localCategories = [
    { name: 'Lawn Cotton', count: '14 Catalogs', image: lawnSuitMint, filter: 'Lawn' },
    { name: 'Pure Silk', count: '8 Catalogs', image: silkPretPeach, filter: 'Silk' },
    { name: 'Luxury Chiffon', count: '12 Catalogs', image: luxeChiffonEmerald, filter: 'Chiffon' },
    { name: 'Bridal Velvet', count: '6 Catalogs', image: velvetSuitRuby, filter: 'Velvet' }
  ];

  return (
    <div className="animate-fade-in">
      {/* 1. HERO SLIDESHOW SECTION */}
      <section className="relative h-[480px] md:h-[650px] bg-neutral-950 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 bg-black/55 z-10" />
            <img
              src={heroSlides[activeSlide].image}
              alt={heroSlides[activeSlide].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Slideshow copywriting */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase text-gold-500 bg-white/5 border border-gold-500/20 px-4 py-1.5 rounded-none backdrop-blur-md"
                  >
                    <Sparkles size={11} className="text-gold-500" /> {heroSlides[activeSlide].tag}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-serif text-3xl md:text-7xl font-light tracking-wide leading-tight text-white"
                  >
                    {heroSlides[activeSlide].title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs md:text-base text-neutral-300 leading-relaxed max-w-lg font-sans font-light"
                  >
                    {heroSlides[activeSlide].subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <Link
                      to={heroSlides[activeSlide].link}
                      className="px-8 py-4 bg-white text-neutral-950 text-xs uppercase tracking-[0.15em] font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 flex items-center gap-2 rounded-none cursor-pointer"
                    >
                      {heroSlides[activeSlide].cta} <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="px-8 py-4 border border-white/45 hover:border-white hover:bg-white/5 text-white text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 rounded-none cursor-pointer"
                    >
                      Open Wholesaler Account
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white transition-all cursor-pointer hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white transition-all cursor-pointer hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>

        {/* Sliders indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeSlide === idx ? 'bg-gold-500 w-8' : 'bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. CORPORATE USPs RIBBON */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-150 dark:border-neutral-850">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-150 dark:divide-neutral-800">
            <div className="flex items-start gap-4 p-2">
              <div className="text-gold-500 flex-shrink-0 pt-0.5">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[11px] font-serif font-bold text-neutral-900 dark:text-white uppercase tracking-[0.15em]">
                  100% Authentic Catalogs
                </h4>
                <p className="text-[14px] text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-normal">
                  Direct sourcing from brand headquarters including Maria B, Sana Safinaz, and Asim Jofa. Structural fabric guarantees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-2 pt-6 md:pt-2 md:pl-8">
              <div className="text-gold-500 flex-shrink-0 pt-0.5">
                <Truck size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[11px] font-serif font-bold text-neutral-900 dark:text-white uppercase tracking-[0.15em]">
                  Secure Global Freight
                </h4>
                <p className="text-[14px] text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-normal">
                  Bulk transport packing with air cargo tracking. Dispatched via DHL Express and specialized custom clearance brokers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-2 pt-6 md:pt-2 md:pl-8">
              <div className="text-gold-500 flex-shrink-0 pt-0.5">
                <RotateCcw size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[11px] font-serif font-bold text-neutral-900 dark:text-white uppercase tracking-[0.15em]">
                  Flexible Wholesale Terms
                </h4>
                <p className="text-[14px] text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-normal">
                  Extra 10% volume discounts on orders of 4+ packs. Convenient bank wire settlements and GST validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES HIGHLIGHT GRID */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-500 font-bold font-mono">
              Sourced Material Tiers
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-light tracking-[0.15em] text-neutral-900 dark:text-white uppercase">
              EXPLORE BY FABRIC CATEGORY
            </h2>
            <div className="w-12 h-[1px] bg-gold-500 mx-auto" />
            <p className="text-[14px] text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed font-normal">
              Wholesale catalog bundles organized precisely by high-end weaving material compositions and seasonal weights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localCategories.map((cat, index) => (
              <Link
                key={index}
                to={`/shop?category=${cat.filter}`}
                className="group relative h-80 rounded-none overflow-hidden transition-all duration-500 block border border-neutral-100 dark:border-neutral-850"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-transparent to-transparent z-10 transition-opacity duration-500" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 text-white space-y-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-gold-500 font-mono font-bold">
                    {cat.count}
                  </span>
                  <h3 className="font-serif text-lg tracking-wide group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-neutral-300 font-semibold group-hover:text-white group-hover:translate-x-1 transition-all">
                    Explore Catalog <ArrowRight size={13} className="text-gold-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED / NEW ARRIVALS TABS */}
      <section className="py-16 md:py-24 bg-white dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-850">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3.5">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-500 font-bold font-mono">
                The Luxury Edit
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-light tracking-[0.15em] text-neutral-900 dark:text-white uppercase">
                FEATURED COLLECTIONS '26
              </h2>
              <div className="w-12 h-[1px] bg-gold-500" />
            </div>

            {/* Tab navigation triggers */}
            <div className="flex border-b border-neutral-100 dark:border-neutral-800">
              {(['new', 'bestseller', 'trending'] as const).map((tabVal) => (
                <button
                  key={tabVal}
                  onClick={() => setFeaturedTab(tabVal)}
                  className={`pb-2.5 px-4 text-[11px] font-semibold tracking-widest uppercase transition-colors relative cursor-pointer ${
                    featuredTab === tabVal
                      ? 'text-gold-500 font-bold'
                      : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tabVal === 'new' ? 'New Arrivals' : tabVal === 'bestseller' ? 'Best Sellers' : 'Trending Now'}
                  {featuredTab === tabVal && (
                    <motion.div
                      layoutId="featured-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getFilteredProducts().slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-neutral-950 text-white hover:bg-neutral-900 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 text-xs uppercase tracking-[0.2em] font-bold rounded-none transition-all"
            >
              Access Sourcing Directory <ArrowRight size={14} className="text-gold-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE PREMIUM TEXTILES */}
      <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
        {/* Subtle grid mesh backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-500 font-bold font-mono">
                Subcontinental Heritage
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.15em] leading-tight text-white uppercase">
                WHOLESALE EXCELLENCE FROM THE HEART OF DELHI
              </h2>
              <div className="w-12 h-[1px] bg-gold-500" />
              <p className="text-[14px] md:text-[14px] text-neutral-300 leading-relaxed font-sans font-normal">
                Operating directly from Katra Neel inside Delhi's historic Chandni Chowk trade network, Premium Textiles acts as a verified primary wholesale partner to retail stores across the GCC, North America, United Kingdom, and South Asia.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="text-gold-500 flex-shrink-0 pt-0.5">
                    <Users size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-neutral-200">Boutique Ecosystems</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed font-light">Sustaining over 450+ global retail stores with recurring stock shipments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-gold-500 flex-shrink-0 pt-0.5">
                    <Briefcase size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-neutral-200">Bulk Custom Tailoring</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed font-light">Specialist state-of-the-art tailoring options for unstitched fabric packs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-gold-500 flex-shrink-0 pt-0.5">
                    <ArrowRightLeft size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-neutral-200">Air Consignments</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed font-light">Express delivery within 4-7 days globally with custom clearance handled.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-gold-500 flex-shrink-0 pt-0.5">
                    <Star size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-neutral-200">Zero-Compromise QC</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed font-light">Every catalog pack undergoes individual high-intensity thread audits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual showcase block */}
            <div className="relative aspect-4/3 rounded-none overflow-hidden border border-neutral-800">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-transparent to-transparent z-10" />
              <img
                src={jamawarSuitCrimson}
                alt="Embroidered gold fabrics closeup"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 z-20 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-mono font-bold">Trade Depot, Delhi</p>
                <h4 className="font-serif text-lg text-white font-light uppercase tracking-wider">Traditional Heritage Craftsmanship</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL B2B CLIENT TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-850">
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-500 font-bold font-mono">
            Partner Testimonials
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-light tracking-[0.15em] text-neutral-900 dark:text-white mt-3 mb-10 uppercase">
            WHAT OUR BOUTIQUE CO-OWNERS SAY
          </h2>

          <div className="relative min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 text-gold-500">
                  {Array.from({ length: DUMMY_REVIEWS[activeReview].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold-500" />
                  ))}
                </div>

                <p className="font-serif text-sm md:text-lg italic text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                  "{DUMMY_REVIEWS[activeReview].comment}"
                </p>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-900 dark:text-white font-bold font-mono">
                    {DUMMY_REVIEWS[activeReview].userName}
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Verified Wholesale Buyer • {DUMMY_REVIEWS[activeReview].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows for reviews */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveReview((prev) => (prev - 1 + DUMMY_REVIEWS.length) % DUMMY_REVIEWS.length)}
              className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveReview((prev) => (prev + 1) % DUMMY_REVIEWS.length)}
              className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM GALLERY ROW (luxury styling) */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold font-mono">Editorial Lookbook</span>
            <h3 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-white">AESTHETIC GALLERY</h3>
            <p className="text-[11px] text-neutral-500">Instagram Inspiration @PremiumTextiles_Delhi</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              luxeChiffonEmerald,
              royalOrganzaIvory,
              velvetSuitRuby,
              lawnSuitMint,
              silkPretPeach,
              cottonNetMustard
            ].map((url, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group shadow-sm border border-neutral-100 dark:border-neutral-850"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center text-white text-xs uppercase tracking-widest font-mono">
                  View Look
                </div>
                <img
                  src={url}
                  alt="Aesthetic style photo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
