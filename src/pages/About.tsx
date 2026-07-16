import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, RotateCcw, MapPin, Building, Landmark } from 'lucide-react';

export const About: React.FC = () => {
  const { setAuthModalOpen } = useApp();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 md:space-y-24 animate-fade-in">
      
      {/* 1. EDITORIAL HEADER & BRAND STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500 font-bold font-mono">
            ESTABLISHED 1998
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-neutral-900 dark:text-white tracking-wide leading-tight">
            THE CHANDNI CHOWK HERITAGE OF PREMIUM TEXTILES
          </h1>
          <div className="w-16 h-0.5 bg-gold-500" />
          
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-sans">
            Founded in 1998 from a humble central trading desk inside the historic Katra Neel, Chandni Chowk, Delhi, <span className="font-semibold text-neutral-950 dark:text-white">Premium Textiles</span> has grown into an international leader of wholesale designer salwar kameez, premium lawn collections, and heavy festive bridal fabrics.
          </p>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-sans">
            Today, our network serves over 450 luxury boutiques, e-commerce retailers, and high-fashion merchants across South Asia, the GCC (UAE, Saudi Arabia, Oman), North America (USA, Canada), and the United Kingdom. We act as a primary consolidated hub, source directly from brand manufacturers, and implement double-audit quality checking to verify every yard of fabric.
          </p>
          
          <button
            onClick={() => setAuthModalOpen(true)}
            className="inline-flex px-8 py-3.5 bg-neutral-950 text-white hover:bg-neutral-850 dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 text-xs uppercase tracking-widest font-bold rounded-sm transition-all shadow-md"
          >
            Register as Retail Partner
          </button>
        </div>

        {/* Brand Collage Photo */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-850">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent z-10" />
          <img
            src="/src/assets/images/silk_pret_peach_1783907083187.jpg"
            alt="Intricate traditional embroidery details"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <p className="text-[10px] uppercase font-mono tracking-widest text-gold-400">Artesian Detail Showcase</p>
            <h3 className="font-serif text-lg">Traditional Gold Zari Embroidery</h3>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE CORE VALUES */}
      <section className="bg-neutral-50 dark:bg-neutral-950 p-8 md:p-16 rounded-2xl border border-neutral-150 dark:border-neutral-850 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gold-50 dark:bg-gold-950/20 text-gold-500 flex items-center justify-center font-serif text-xl font-bold">
            01
          </div>
          <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-wider">
            Our Mission
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Standardizing the fragmented South Asian ethnic wear trade with direct digital access, verified fabric weight authentications, catalog compliance, and structured global logistics channels.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gold-50 dark:bg-gold-950/20 text-gold-500 flex items-center justify-center font-serif text-xl font-bold">
            02
          </div>
          <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-wider">
            Our Vision
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            To bridge traditional subcontinental weavers' masterwork with contemporary global boutiques seamlessly, bringing exquisite luxury lawn and chiffon garments to fashion stores globally.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gold-50 dark:bg-gold-950/20 text-gold-500 flex items-center justify-center font-serif text-xl font-bold">
            03
          </div>
          <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-wider">
            Authenticity Promise
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Zero counterfeit or copy-grade catalog sales. We specialize exclusively in genuine brand catalogs with certificate verification documents included in every trade consignment box.
          </p>
        </div>
      </section>

      {/* 3. WHY SOURCING FROM US (Wholesale facts) */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 font-bold font-mono">
            Commercial Standards
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-neutral-900 dark:text-white tracking-wide">
            THE WHOLESALE PROCUREMENT DIFFERENCE
          </h2>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-4 shadow-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-lg text-gold-500 w-fit">
              <Building size={20} />
            </div>
            <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white">Direct Brand Sourcing</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We source complete catalog set boxes directly from central factories of Maria.B, Sana Safinaz, Gul Ahmed, Asim Jofa and other primary designers.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-4 shadow-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-lg text-gold-500 w-fit">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white">Commercial QC Inspections</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Before sealing cargo boxes, our specialized team performs double-pass checks on panel measurements, lace counts, embroidery consistency, and prints.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-4 shadow-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-lg text-gold-500 w-fit">
              <Truck size={20} />
            </div>
            <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white">Customs-Cleared Logistics</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Air-cargo consolidations via DHL, FedEx and Bluedart. Custom clearances, invoices, certificates of origin, and trade parameters handled seamlessly.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-4 shadow-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-lg text-gold-500 w-fit">
              <RotateCcw size={20} />
            </div>
            <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white">Tailored Sizing Services</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our state-of-the-art tailoring wing offers customized unstitched to boutique fully stitched conversions based on custom sizing sheets.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CHANDNI CHOWK DEPOT CORE PARAMETERS */}
      <section className="bg-neutral-950 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">Centrally Located</span>
            <h3 className="font-serif text-2xl md:text-3xl text-gold-100">VISIT THE PREMIUM TEXTILES TRADE DEPOT</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Store operators, retail managers, and corporate bulk buyers are welcome to schedule localized private catalog visits at our primary trade depot situated inside Katra Neel, Chandni Chowk, Delhi.
            </p>
          </div>
          <div className="flex-shrink-0 bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-2 font-mono text-[11px] text-neutral-300">
            <div className="flex items-center gap-2">
              <Landmark size={14} className="text-gold-500" />
              <span>Registered Name: Premium Textiles Inc.</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-500" />
              <span>Address: Katra Neel, Chandni Chowk, Delhi, 110006</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold-500" />
              <span>Sourcing Portfolio: 2500+ Luxury Fabrics Sets</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
