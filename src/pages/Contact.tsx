import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Landmark, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  // Feedback form state
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    subject: 'Wholesale Catalog Sourcing Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API posting
    setSubmitted(true);
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      subject: 'Wholesale Catalog Sourcing Inquiry',
      message: '',
    });
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center space-y-2 border-b border-neutral-100 dark:border-neutral-850 pb-6">
        <span className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 font-bold font-mono">
          Global Partner Desk
        </span>
        <h1 className="font-serif text-2xl md:text-4xl text-neutral-900 dark:text-white tracking-wide">
          CONTACT WHOLESALE RELATIONS
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Need custom volume quotes, stitching sheet templates, or shipping manifests? Get in touch with our Delhi central trade coordinators directly.
        </p>
      </div>

      {/* 2. DUAL COLUMN WORKFLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* L.H.S Contact Details & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
              Primary Trade Office
            </h3>
            
            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-300 font-sans">
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-lg text-gold-500 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">Depot Headquarters</p>
                  <p className="mt-1 leading-relaxed">
                    Premium Textiles Inc., Katra Neel,<br />
                    Chandni Chowk, Delhi, 110006, India
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="p-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-lg text-gold-500 flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">Business Relations Desk</p>
                  <p className="mt-1">+91 98110 XXXXX (Landline)</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="p-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-lg text-gold-500 flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">Official Correspondence Email</p>
                  <p className="mt-1">bulk@premiumtextiles.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl space-y-3.5">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-emerald-600 text-white rounded-lg flex-shrink-0">
                <MessageSquare size={18} />
              </div>
              <div className="text-xs">
                <p className="font-bold text-emerald-800 dark:text-emerald-400">WhatsApp Trade Hotline</p>
                <p className="text-emerald-700/80 dark:text-emerald-400/70 mt-0.5">Chat directly with senior coordinators for catalog selections & pricing.</p>
              </div>
            </div>
            <a
              href="https://wa.me/9198110XXXXX?text=Hello%20Premium%20Textiles%2C%20I%20am%20a%20retail%20boutique%20owner%20interested%20in%20sourcing..."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest text-center rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Initiate WhatsApp Sourcing
            </a>
          </div>

          {/* Embedded Google Map Custom Styled Placeholder */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
              Interactive Depot Locator
            </h4>
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-neutral-150 dark:border-neutral-800 bg-[#E5E3DF] dark:bg-neutral-950 flex flex-col justify-between p-4 shadow-sm">
              {/* Fake Google Maps Controls */}
              <div className="absolute inset-0 bg-[radial-gradient(#9c7130_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
              
              <div className="z-10 flex justify-between items-start">
                <div className="bg-white/95 dark:bg-neutral-900/95 p-3 rounded-xl border border-neutral-150 dark:border-neutral-800 shadow-lg text-[11px] font-sans">
                  <p className="font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                    <Landmark size={12} className="text-gold-500" /> Premium Textiles
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[10px] mt-0.5">Katra Neel, Chandni Chowk, Delhi</p>
                </div>
                
                <span className="bg-[#4285F4] text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-sm shadow-xs select-none pointer-events-none">
                  Google Map
                </span>
              </div>

              {/* Pin design element in the absolute center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/30 animate-ping" />
                  <div className="w-5 h-5 bg-gold-500 border-2 border-white dark:border-neutral-900 rounded-full shadow-lg z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />
                  </div>
                </div>
              </div>

              <div className="z-10 flex justify-between items-end">
                <span className="text-[9px] font-mono text-neutral-400">Map Scale: 1:500m</span>
                <div className="flex flex-col gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 p-1.5 rounded-lg shadow-md text-neutral-700 dark:text-neutral-300">
                  <button className="w-6 h-6 rounded-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 flex items-center justify-center font-bold text-xs cursor-pointer">+</button>
                  <button className="w-6 h-6 rounded-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 flex items-center justify-center font-bold text-xs cursor-pointer">-</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* R.H.S Sourcing Form */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-8 rounded-2xl shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                Submit Wholesale Sourcing Inquiry
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Your parameters are redirected immediately to a specialized coordinator matching your region.
              </p>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg flex items-center gap-2">
                <CheckCircle2 size={16} /> Thank you! Sourcing inquiry logged successfully. A trade manager will respond within 2-4 business hours.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Business / Boutique Name *</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Zari Fabrics Ltd"
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Inquirer Full Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Zainab Siddiqui"
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Business Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="zainab@zarifabrics.com"
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Telephone / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 XXXXXXX"
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500">Inquiry Subject *</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
              >
                <option value="Wholesale Catalog Sourcing Inquiry">Wholesale Catalog Sourcing Inquiry</option>
                <option value="Custom Sizing / Stitching Surcharges">Custom Sizing / Stitching Surcharges</option>
                <option value="International Air Freight Quotation">International Air Freight Quotation</option>
                <option value="Bulk Order Wire Settlement Info">Bulk Order Wire Settlement Info</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500">Inquiry Message / Sourcing Specifications *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                placeholder="Please outline the catalogs you wish to buy, required stitching option counts, and targeted country of importation..."
                className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs font-semibold uppercase tracking-widest text-center bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              id="contact-submit-btn"
            >
              Transmit Inquiry to Trade Desk <Send size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
