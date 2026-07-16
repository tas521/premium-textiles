import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { X, Shield, Scale, Truck, RotateCcw, Landmark } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { policyModalType, setPolicyModalType } = useApp();

  if (!policyModalType) return null;

  const getPolicyDetails = () => {
    switch (policyModalType) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Shield className="text-gold-500" size={32} />,
          lastUpdated: 'July 2026',
          content: (
            <div className="space-y-4 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 dark:text-white">1. Introduction</p>
              <p>Premium Textiles is committed to safeguarding your private corporate data and personal information. This Policy outlines how we collect, process, and protect customer data when operating on our wholesale platforms.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">2. Business Account Information Collected</p>
              <p>When registering for a wholesale merchant account, we require your commercial corporate name, business email address, corporate telephone number, billing details, and governmental registration details such as your GSTIN (for Indian retailers) or international corporate registration numbers.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">3. How We Use Your Commercial Data</p>
              <p>Your business parameters are utilized exclusively to secure wholesale logistics, compute volume-based commercial discounts, authenticate corporate trade entities, process bulk invoices, and transmit bespoke catalog updates.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">4. Absolute Data Security</p>
              <p>We do not broker, trade, or leak any corporate transactional histories or business registration parameters to third-party ad brokers. All databases use multi-tiered firewalls and standard transport-layer security encryption protocols.</p>
            </div>
          ),
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: <Scale className="text-gold-500" size={32} />,
          lastUpdated: 'July 2026',
          content: (
            <div className="space-y-4 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 dark:text-white">1. Wholesale Account Validation</p>
              <p>This is a strictly B2B (Business-to-Business) commercial wholesale directory. By ordering from Premium Textiles, you verify that you are a commercial entity, boutique operator, retail merchant, or design professional.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">2. Minimum Order Quantities (MOQ)</p>
              <p>All items are sold exclusively as catalog sets or bundled wholesale packs (typically packs of 3 to 10 garments in uniform or varying size arrangements). Individual suit retail purchases are prohibited unless specifically marked as "Ready-To-Wear Pret" singular packs.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">3. Intellectual Property Rights</p>
              <p>We supply authentic brand catalogs including Maria.B, Sana Safinaz, and original labels. Retail partners are permitted to utilize our high-fashion product photography and official promotional graphics for their physical and digital storefronts.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">4. Pricing & Bulk Quotations</p>
              <p>Wholesale prices listed on this website are confidential trade pricing. We reserve the right to revise bulk discount coefficients based on direct raw fabric market indexes without subsequent liability.</p>
            </div>
          ),
        };
      case 'shipping':
        return {
          title: 'Shipping & Logistics Policy',
          icon: <Truck className="text-gold-500" size={32} />,
          lastUpdated: 'July 2026',
          content: (
            <div className="space-y-4 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 dark:text-white">1. Dispatch Locations & Transit Nodes</p>
              <p>All bulk orders are processed and securely dispatched from our primary distribution depot at Katra Neel, Chandni Chowk, Delhi. We collaborate with tier-1 global freight carriers (DHL, FedEx, Bluedart, Delhivery) to guarantee secure delivery.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">2. Lead Times & Custom Stitching</p>
              <p>Standard raw/unstitched wholesale fabric catalog packs dispatch within 2-3 business days. Custom boutique-stitched orders require an additional 10-14 business days for artisanal tailoring at our specialized facility.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">3. International Shipping Rates & Duties</p>
              <p>We ship internationally to over 50 countries, including the USA, UK, Canada, UAE, and Saudi Arabia. Customs duties, tariffs, and localized corporate import taxes are the sole commercial liability of the importing retailer.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">4. Consolidated Freight Tracking</p>
              <p>Upon consignment handover, high-resolution tracking codes and computerized freight details are transmitted via your business account dashboard and WhatsApp notifications.</p>
            </div>
          ),
        };
      case 'return':
        return {
          title: 'Return Policy',
          icon: <RotateCcw className="text-gold-500" size={32} />,
          lastUpdated: 'July 2026',
          content: (
            <div className="space-y-4 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 dark:text-white">1. B2B Commercial Return Limits</p>
              <p>As a B2B wholesale operation, we inspect every catalog pack before dispatch. Returns are only authorized under strict criteria: structural manufacturing fabrics faults, wrong catalog assortment delivery, or transit damages.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">2. Timeline for Discrepancy Reporting</p>
              <p>Wholesale partners must inspect their shipments and report any manufacturer fault within 48 hours of receipt. Reports should be supported by clear unboxing videos and macro high-resolution photographs emailed to bulk@premiumtextiles.com.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">3. Condition of Returned Freight</p>
              <p>Approved return items must remain completely unstitched, uncut, unworn, in their original factory folding, and equipped with all brand tags, catalog books, and external polybags intact.</p>
            </div>
          ),
        };
      case 'refund':
        return {
          title: 'Refund & Settlement Policy',
          icon: <Landmark className="text-gold-500" size={32} />,
          lastUpdated: 'July 2026',
          content: (
            <div className="space-y-4 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 dark:text-white">1. Settlement Options</p>
              <p>Upon verification of genuine damaged or faulty inventory, we issue our trade partners a settlement choice: (a) immediate equivalent credit balance added to their wholesale wallet, (b) factory replacements dispatched with free express freight, or (c) direct refund to their banking/wire credentials.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">2. Settlement Timeline</p>
              <p>Direct bank transfers and international credit settlements are initiated within 5 business days from our finance desk at Chandni Chowk, subject to inter-bank clearing cycles.</p>
              <p className="font-semibold text-neutral-900 dark:text-white">3. Exclusions from Refund Guarantees</p>
              <p>Custom-stitched catalog orders are completely tailored to requested specifications and are strictly excluded from refunds, returns, or swaps unless a fundamental manufacturing fabric error is identified prior to the stitching cycle.</p>
            </div>
          ),
        };
      default:
        return {
          title: '',
          icon: null,
          lastUpdated: '',
          content: null,
        };
    }
  };

  const { title, icon, lastUpdated, content } = getPolicyDetails();

  return (
    <div id="policy-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="font-serif text-lg md:text-xl tracking-wide text-neutral-900 dark:text-white">{title}</h3>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-0.5">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPolicyModalType(null)}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            id="close-policy-modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Box */}
        <div className="p-8 max-h-[420px] overflow-y-auto custom-scrollbar-style">
          {content}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-150 dark:border-neutral-800 text-center">
          <button
            onClick={() => setPolicyModalType(null)}
            className="px-6 py-2 text-[11px] uppercase tracking-widest font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-md transition-colors"
          >
            Close Agreement
          </button>
        </div>
      </motion.div>
    </div>
  );
};
