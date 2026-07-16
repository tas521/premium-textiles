import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DUMMY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  // Find the exact product
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  // If product not found, fallback safely
  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, id, navigate]);

  if (!product) return null;

  // Image display states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [zoomActive, setZoomActive] = useState(false);

  // Configuration options selection
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Unstitched');
  const [selectedColour, setSelectedColour] = useState(product.colours[0] || { name: 'Default', hex: '#ccc' });
  const [stitchingOption, setStitchingOption] = useState<'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched'>('Unstitched');
  const [quantity, setQuantity] = useState(1); // quantity in wholesale packs

  // Specifications Accordions Toggle
  const [activeAccordion, setActiveAccordion] = useState<'spec' | 'ship' | 'return'>('spec');

  // Related products (filtered by same brand or category, except current product)
  const relatedProducts = DUMMY_PRODUCTS.filter(
    (p) => (p.category === product.category || p.brand === product.brand) && p.id !== product.id
  ).slice(0, 4);

  // Image mouse move coordinate calculations for elegant focal zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseEnter = () => {
    setZoomActive(true);
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
    setZoomStyle({});
  };

  // Calculations
  const suitWholesalePrice = product.wholesalePrice;
  const singlePackPrice = product.wholesalePrice * product.packSize;
  
  // Custom stitching extra cost (B2B Boutique level stitching is usually ₹2,000 per suit in a pack)
  const stitchingSurchargePerSuit =
    stitchingOption === 'Custom Boutique Stitched' ? 2000 : stitchingOption === 'Semi-Stitched' ? 800 : 0;
  
  const finalUnitPrice = suitWholesalePrice + stitchingSurchargePerSuit;
  const packPriceTotal = finalUnitPrice * product.packSize * quantity;
  const originalRetailEquivalent = product.price * product.packSize * quantity;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColour, stitchingOption);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColour, stitchingOption);
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* 1. BREADCRUMBS ROW */}
      <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-8">
        <Link to="/" className="hover:text-neutral-900 transition-colors">
          Home
        </Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-neutral-900 transition-colors">
          Wholesale Directory
        </Link>
        <ChevronRight size={10} />
        <span className="text-neutral-500 font-mono select-none">{product.brand}</span>
        <ChevronRight size={10} />
        <span className="text-neutral-900 dark:text-white line-clamp-1 truncate font-serif font-bold">
          {product.name}
        </span>
      </div>

      {/* 2. DUAL COLUMN DETAILS SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* ==============================================
            A. GALLERIES FRAME (L.H.S)
           ============================================== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Display Focal frame */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="aspect-4/5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 overflow-hidden relative cursor-zoom-in shadow-xs"
            id="product-zoom-container"
          >
            {/* Absolute Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className="bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest">
                {product.brand}
              </span>
              <span className="bg-gold-500 text-neutral-950 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                Pack size: {product.packSize} Suits
              </span>
            </div>

            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
              style={zoomStyle}
            />
            
            {/* Visual zoom active label */}
            {!zoomActive && (
              <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-mono font-bold px-3 py-1.5 rounded-sm flex items-center gap-1">
                <Sparkles size={11} /> Hover to zoom details
              </span>
            )}
          </div>

          {/* Thumbnails Row selector */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIdx(index)}
                className={`aspect-square rounded-xl overflow-hidden border bg-neutral-50 dark:bg-neutral-950 relative transition-all cursor-pointer ${
                  activeImageIdx === index
                    ? 'border-gold-500 ring-1 ring-gold-500/30 scale-95'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ==============================================
            B. SPECIFICATIONS INFO FRAME (R.H.S)
           ============================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Editorial Title Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-gold-600 dark:text-gold-500">
              <span>{product.brand}</span>
              <span>SKU: {product.sku}</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl tracking-wide text-neutral-900 dark:text-white font-medium leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 rounded-xl space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono font-bold">
                  Unit Wholesale Rate
                </span>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ₹{finalUnitPrice.toLocaleString('en-IN')}
                  <span className="text-xs text-neutral-500 font-sans font-normal ml-1">/ Suit</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono font-bold">
                  Pack Total ({product.packSize} suits bundle)
                </span>
                <p className="text-lg font-bold text-gold-600 dark:text-gold-400 font-serif">
                  ₹{(finalUnitPrice * product.packSize * quantity).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Savings & retail comparison */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-850 flex items-center justify-between text-xs">
              <span className="text-neutral-500">
                Market retail reference value: <span className="line-through">₹{originalRetailEquivalent.toLocaleString('en-IN')}</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase tracking-widest text-[10px]">
                Save ₹{(originalRetailEquivalent - packPriceTotal).toLocaleString('en-IN')} total!
              </span>
            </div>
          </div>

          {/* Sizing & Custom Stitching Config */}
          <div className="space-y-4">
            {/* Sizing select */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                1. Select Size Format:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-950/25 text-gold-600 dark:text-gold-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour variation picker */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                2. Select Wholesale Catalog Print/Colorway:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colours.map((clr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColour(clr)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                      selectedColour.name === clr.name
                        ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: clr.hex }}
                    />
                    {clr.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stitching customization */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center justify-between">
                <span>3. Stitching & Tailoring Customization:</span>
                <span className="text-[9px] text-neutral-400 flex items-center gap-1">
                  <HelpCircle size={10} /> Wholesale premium tailoring
                </span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setStitchingOption('Unstitched')}
                  className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                    stitchingOption === 'Unstitched'
                      ? 'border-gold-500 bg-gold-50/10 dark:bg-gold-950/10'
                      : 'border-neutral-200 dark:border-neutral-850 hover:border-neutral-400'
                  }`}
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Unstitched</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Original raw fabric panels</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1 font-mono">+₹0</p>
                </button>

                <button
                  onClick={() => setStitchingOption('Semi-Stitched')}
                  className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                    stitchingOption === 'Semi-Stitched'
                      ? 'border-gold-500 bg-gold-50/10 dark:bg-gold-950/10'
                      : 'border-neutral-200 dark:border-neutral-850 hover:border-neutral-400'
                  }`}
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Semi-Stitched</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Partially open seams/lining</p>
                  <p className="text-[10px] text-gold-500 font-bold mt-1 font-mono">+₹800 / Suit</p>
                </button>

                <button
                  onClick={() => setStitchingOption('Custom Boutique Stitched')}
                  className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                    stitchingOption === 'Custom Boutique Stitched'
                      ? 'border-gold-500 bg-gold-50/10 dark:bg-gold-950/10'
                      : 'border-neutral-200 dark:border-neutral-850 hover:border-neutral-400'
                  }`}
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Fully Tailored</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Complete custom designer stitch</p>
                  <p className="text-[10px] text-gold-500 font-bold mt-1 font-mono">+₹2,000 / Suit</p>
                </button>
              </div>
            </div>

            {/* Quantity Selector pack increments */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                4. Quantity (Complete Catalog Packs of {product.packSize} suits):
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-250 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 font-bold text-sm text-neutral-900 dark:text-white">
                    {quantity} <span className="text-xs font-normal text-neutral-400">Packs</span>
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-neutral-400">
                  Total order volume: <span className="font-bold text-neutral-900 dark:text-white">{product.packSize * quantity} suits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons triggers */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-850">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 text-xs font-semibold uppercase tracking-widest text-center bg-white text-neutral-950 hover:bg-neutral-50 border border-neutral-300 dark:border-neutral-850 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-850 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              id="add-to-cart-btn"
            >
              <ShoppingBag size={14} /> Add Wholesale Pack
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 text-xs font-semibold uppercase tracking-widest text-center bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              id="buy-now-btn"
            >
              Secure Order Checkout
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 border border-neutral-200 dark:border-neutral-850 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-all cursor-pointer ${
                isLiked ? 'text-rose-500 border-rose-200' : 'text-neutral-400 hover:text-rose-500'
              }`}
              title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={16} className={isLiked ? 'fill-rose-500' : ''} />
            </button>
          </div>

          {/* Timeline and return indicators */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50/50 dark:bg-neutral-950/20 p-4 border border-neutral-100 dark:border-neutral-850 rounded-xl">
            <div className="flex gap-2 items-start">
              <Calendar size={16} className="text-gold-500 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">Estimated Dispatch</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  {stitchingOption === 'Unstitched' ? '2-3 Business Days' : '10-14 Business Days'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <RotateCcw size={16} className="text-gold-500 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">Wholesale Returns</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  48-Hour faulty replacement guarantee. Tags intact.
                </p>
              </div>
            </div>
          </div>

          {/* Specifications Accordion blocks */}
          <div className="border border-neutral-150 dark:border-neutral-850 rounded-xl overflow-hidden divide-y divide-neutral-150 dark:divide-neutral-850">
            {/* 1. Fabric panel details */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'spec' ? '' as any : 'spec')}
                className="w-full p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/45 cursor-pointer"
              >
                <span>Fabric Panel Dimensions & Craft</span>
                <ChevronDown size={14} className={`text-neutral-400 transition-transform ${activeAccordion === 'spec' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'spec' && (
                <div className="p-4 bg-neutral-50/40 dark:bg-neutral-950/10 text-xs text-neutral-600 dark:text-neutral-300 space-y-3 font-sans leading-relaxed border-t border-neutral-100 dark:border-neutral-850 animate-fade-in">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-neutral-950 dark:text-white">Kameez / Shirt:</span>
                    <span className="col-span-2">{product.specifications.shirt}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-neutral-950 dark:text-white">Dupatta / Shawl:</span>
                    <span className="col-span-2">{product.specifications.dupatta}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-neutral-950 dark:text-white">Salwar / Pants:</span>
                    <span className="col-span-2">{product.specifications.trouser}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-neutral-950 dark:text-white">Embroidery Details:</span>
                    <span className="col-span-2">{product.specifications.embroideryDetails}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-neutral-950 dark:text-white">Care Instructions:</span>
                    <span className="col-span-2">{product.specifications.careInstructions}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Logistics panel */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'ship' ? '' as any : 'ship')}
                className="w-full p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/45 cursor-pointer"
              >
                <span>Freight Logistics & Consolidation</span>
                <ChevronDown size={14} className={`text-neutral-400 transition-transform ${activeAccordion === 'ship' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'ship' && (
                <div className="p-4 bg-neutral-50/40 dark:bg-neutral-950/10 text-xs text-neutral-600 dark:text-neutral-300 font-sans space-y-2 leading-relaxed border-t border-neutral-100 dark:border-neutral-850 animate-fade-in">
                  <p>All items dispatch directly from our central trade depot located at Chandni Chowk, Delhi. We utilize heavy-density water-resistant packaging to prevent moisture damage during transcontinental air transport.</p>
                  <p>Tracking numbers and cargo manifests are issued instantly upon courier pick-up. International customs clearing handles automatically through pre-vetted custom house agents.</p>
                </div>
              )}
            </div>

            {/* 3. Replacement guarantee terms */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'return' ? '' as any : 'return')}
                className="w-full p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/45 cursor-pointer"
              >
                <span>Manufacturer Fault Replacement Policy</span>
                <ChevronDown size={14} className={`text-neutral-400 transition-transform ${activeAccordion === 'return' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'return' && (
                <div className="p-4 bg-neutral-50/40 dark:bg-neutral-950/10 text-xs text-neutral-600 dark:text-neutral-300 font-sans space-y-2 leading-relaxed border-t border-neutral-100 dark:border-neutral-850 animate-fade-in">
                  <p>We perform double inspect cycles on every wholesale box. In the rare scenario that a fabric manufacturing error, design weaving flaw, or short-shipment occurs, you must register a claim with us within 48 hours of shipment arrival.</p>
                  <p>Replacement suites are dispatched instantly free of charge. Returned faulty fabrics must remain completely uncut, unstitched, and equipped with original booklet catalogs intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================
          3. RELATED PRODUCTS RECOMMENDATIONS LIST
         ============================================== */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-neutral-150 dark:border-neutral-850 space-y-8">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold font-mono">Curated Selection</span>
            <h3 className="font-serif text-xl md:text-2xl text-neutral-900 dark:text-white font-medium">RELATED CATALOGS YOU MAY SOURCE</h3>
            <div className="w-12 h-0.5 bg-gold-500 mt-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProd) => (
              <ProductCard key={relatedProd.id} product={relatedProd} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
