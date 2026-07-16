import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Lock,
  Truck,
  RotateCcw
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPolicyModalType } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-850">
      {/* Upper Footer section with editorial brand pitch */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-neutral-900">
        {/* Brand segment */}
        <div className="space-y-4">
          <Link to="/" className="inline-block group">
            <span className="font-serif text-xl font-bold tracking-widest text-white group-hover:text-gold-400 transition-colors">
              PREMIUM TEXTILES
            </span>
            <p className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold mt-1 font-mono">
              Chandni Chowk Delhi Heritage
            </p>
          </Link>
          <p className="text-xs leading-relaxed text-neutral-500 font-sans">
            Serving national and global designer apparel boutiques since 1998. We manufacture and supply premium, authentic unstitched catalog collections and bespoke semi-stitched bridal salwar suits from South Asia's leading creative designers.
          </p>
          <div className="flex space-x-3.5 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900/60 border border-neutral-800 hover:border-gold-500 hover:bg-gold-500 hover:text-neutral-950 rounded-none transition-all duration-300">
              <Instagram size={14} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900/60 border border-neutral-800 hover:border-gold-500 hover:bg-gold-500 hover:text-neutral-950 rounded-none transition-all duration-300">
              <Facebook size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900/60 border border-neutral-800 hover:border-gold-500 hover:bg-gold-500 hover:text-neutral-950 rounded-none transition-all duration-300">
              <Twitter size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links segment */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-bold font-mono">
            Commercial Directory
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/" className="hover:text-gold-400 transition-colors">
                Home Showcase
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold-400 transition-colors">
                Wholesale Catalog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold-400 transition-colors">
                About Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-400 transition-colors">
                Contact & Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Corporate Address Node */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-bold font-mono">
            HQ Depot & Hours
          </h4>
          <ul className="space-y-3 text-xs text-neutral-500">
            <li className="flex gap-2.5 items-start">
              <MapPin size={15} className="text-gold-500 mt-0.5 flex-shrink-0" />
              <span>
                Katra Neel, Chandni Chowk,<br />
                Delhi, 110006, India
              </span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone size={15} className="text-gold-500 flex-shrink-0" />
              <span>+91 98110 XXXXX</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail size={15} className="text-gold-500 flex-shrink-0" />
              <span>bulk@premiumtextiles.com</span>
            </li>
            <li className="pt-1.5 text-[11px] font-mono border-t border-neutral-900">
              Mon – Sat: 11:00 AM – 8:00 PM<br />
              Sunday: Rest Day / Closed
            </li>
          </ul>
        </div>

        {/* Custom B2B Newsletter Section */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-bold font-mono">
            Direct Trade Alerts
          </h4>
          <p className="text-xs leading-relaxed text-neutral-500">
            Subscribe to receive real-time notifications about seasonal luxury catalogs (Lawn, Velvet, Festive collections) and volume-based container pricing.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business Email Address"
                className="w-full bg-neutral-900/60 border border-neutral-800 focus:outline-hidden focus:border-gold-500 rounded-none py-2.5 pl-4 pr-12 text-xs text-white"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3.5 bg-neutral-800 hover:bg-gold-500 text-neutral-400 hover:text-neutral-950 rounded-none border-l border-neutral-800 transition-all cursor-pointer"
              >
                <Send size={12} />
              </button>
            </div>
            {subscribed && (
              <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-semibold tracking-wider uppercase">
                <CheckCircle2 size={12} /> Registered! Trade alert list updated.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Middle Footer with Policies - Strictly accessible only from footer */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-900 text-xs text-neutral-500">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <button
            onClick={() => setPolicyModalType('privacy')}
            className="hover:text-gold-400 hover:underline transition-all cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
            id="privacy-policy-link"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setPolicyModalType('terms')}
            className="hover:text-gold-400 hover:underline transition-all cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
            id="terms-conditions-link"
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setPolicyModalType('shipping')}
            className="hover:text-gold-400 hover:underline transition-all cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
            id="shipping-policy-link"
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setPolicyModalType('return')}
            className="hover:text-gold-400 hover:underline transition-all cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
            id="return-policy-link"
          >
            Return Policy
          </button>
          <button
            onClick={() => setPolicyModalType('refund')}
            className="hover:text-gold-400 hover:underline transition-all cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
            id="refund-policy-link"
          >
            Refund Policy
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-4 sm:gap-6 text-[10px] uppercase font-mono tracking-wider sm:tracking-widest">
          <span className="flex items-center gap-1">
            <Lock size={11} className="text-gold-500" /> B2B SSL Protected
          </span>
          <span className="flex items-center gap-1">
            <Truck size={11} className="text-gold-500" /> Insured Freight
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw size={11} className="text-gold-500" /> Bulk Settlements
          </span>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 font-mono tracking-wider sm:tracking-widest text-center md:text-left">
        <span>© 2026 PREMIUM TEXTILES. ALL RIGHTS RESERVED.</span>
        <span>CRAFTED FOR INTERNATIONAL LUXURY BOUTIQUES</span>
      </div>
    </footer>
  );
};
