import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Building,
  MapPin,
  Landmark,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight
} from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    user,
    loginUser,
  } = useApp();

  const navigate = useNavigate();

  // Checkout workflow states
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Checkout form values (initialized with user parameters if logged in)
  const [companyName, setCompanyName] = useState(user.companyName || '');
  const [gstNumber, setGstNumber] = useState(user.gstNumber || '');
  const [buyerName, setBuyerName] = useState(user.name || '');
  const [buyerEmail, setBuyerEmail] = useState(user.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('India');
  const [paymentMethod, setPaymentMethod] = useState<'wire' | 'upi'>('wire');

  // Form error messages
  const [errorMsg, setErrorMsg] = useState('');

  // Settle calculations
  const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSuits = cart.reduce((sum, item) => sum + item.product.packSize * item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.product.wholesalePrice * item.product.packSize * item.quantity;
  }, 0);

  const bulkDiscountThreshold = 4;
  const hasBulkDiscount = totalPacks >= bulkDiscountThreshold;
  const discountAmount = hasBulkDiscount ? subtotal * 0.1 : 0;
  
  const shipping = totalPacks > 0 ? totalPacks * 15 : 0;
  const finalTotal = subtotal - discountAmount + shipping;

  // Order settlement submit simulation
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !buyerName || !buyerEmail || !phone || !address || !city) {
      setErrorMsg('Please fill in all required fields (*).');
      return;
    }
    setErrorMsg('');
    setSubmittingOrder(true);

    // If buyer was not logged in, auto log them in now!
    if (!user.isLoggedIn) {
      loginUser(buyerName, buyerEmail, companyName, gstNumber);
    }

    // Simulate connection to payment settlement gateway / processing ledger
    setTimeout(() => {
      setSubmittingOrder(false);
      setCheckoutStep('success');
      clearCart();
    }, 2500);
  };

  // Generate a random high-end trade reference number
  const generatedInvoiceNo = 'PT-B2B-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* 1. PROGRESS TIMELINE HEADER */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-neutral-400">
          <span className={checkoutStep === 'cart' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-neutral-500'}>
            1. Review Cart
          </span>
          <ChevronRight size={14} />
          <span className={checkoutStep === 'details' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-neutral-500'}>
            2. Corporate Details
          </span>
          <ChevronRight size={14} />
          <span className={checkoutStep === 'success' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-neutral-500'}>
            3. Order Sourced
          </span>
        </div>
        <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gold-500 transition-all duration-500"
            style={{ width: checkoutStep === 'cart' ? '33.3%' : checkoutStep === 'details' ? '66.6%' : '100%' }}
          />
        </div>
      </div>

      {/* 2. FLOW ROUTING */}
      {checkoutStep === 'cart' && (
        <div className="space-y-8">
          {cart.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl max-w-lg mx-auto p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center mx-auto text-neutral-400 animate-bounce">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h2 className="font-serif text-lg text-neutral-850 dark:text-neutral-200">Your Trade Cart is Empty</h2>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  You haven't added any premium wholesale catalog packs to your active procurement order yet.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 text-xs uppercase tracking-widest font-bold bg-neutral-900 text-white dark:bg-gold-500 dark:text-neutral-950 rounded-sm hover:scale-[1.02] transition-all"
              >
                Access Sourcing Directory
              </Link>
            </div>
          ) : (
            /* Main Cart Layout split screen */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Table items list L.H.S */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-5 border-b border-neutral-100 dark:border-neutral-850 hidden md:grid grid-cols-12 text-[10px] uppercase tracking-widest font-bold text-neutral-400 font-mono">
                    <span className="col-span-6">Sourced Catalog Suite</span>
                    <span className="col-span-2 text-center">Unit Price</span>
                    <span className="col-span-2 text-center">Quantity (Pks)</span>
                    <span className="col-span-2 text-right">Subtotal</span>
                  </div>

                  <div className="divide-y divide-neutral-100 dark:divide-neutral-850">
                    {cart.map((item) => (
                      <div key={item.id} className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Thumbnail details combo */}
                        <div className="col-span-12 md:col-span-6 flex gap-4">
                          <div className="w-16 h-20 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-gold-600 dark:text-gold-400">
                              {item.product.brand}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-neutral-900 dark:text-white truncate">
                              {item.product.name}
                            </h4>
                            <div className="flex flex-wrap gap-1 text-[9px] text-neutral-400">
                              <span className="bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-150 dark:border-neutral-800">Size: {item.selectedSize}</span>
                              <span className="bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-150 dark:border-neutral-800">Color: {item.selectedColour.name}</span>
                              <span className="bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-150 dark:border-neutral-800 text-gold-500">Tailoring: {item.stitchingOption}</span>
                            </div>
                          </div>
                        </div>

                        {/* Unit price */}
                        <div className="col-span-4 md:col-span-2 md:text-center text-xs">
                          <span className="md:hidden text-neutral-400 mr-2 uppercase tracking-wider font-semibold text-[10px]">Price:</span>
                          <span className="font-semibold text-neutral-900 dark:text-white">₹{item.product.wholesalePrice.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-neutral-400">/suit</span>
                        </div>

                        {/* Quantity picker */}
                        <div className="col-span-4 md:col-span-2 flex justify-start md:justify-center">
                          <div className="flex items-center border border-neutral-250 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1 px-2 text-neutral-500 hover:text-neutral-900"
                            >
                              -
                            </button>
                            <span className="px-3 font-bold text-xs text-neutral-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1 px-2 text-neutral-500 hover:text-neutral-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total price & delete */}
                        <div className="col-span-4 md:col-span-2 text-right flex items-center justify-end gap-3 text-xs font-semibold text-neutral-900 dark:text-white">
                          <div>
                            <p>₹{(item.product.wholesalePrice * item.product.packSize * item.quantity).toLocaleString('en-IN')}</p>
                            <p className="text-[9px] text-neutral-400 font-normal">Pack of {item.product.packSize}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-500 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-850"
                            title="Delete pack"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    to="/shop"
                    className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-neutral-950 flex items-center gap-1.5 transition-colors"
                  >
                    ← Back to Catalog Sourcing
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase tracking-widest font-semibold text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    Clear Active Procurement List
                  </button>
                </div>
              </div>

              {/* Calculations Box R.H.S */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl p-6 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    Order Pricing Invoice
                  </h3>

                  {/* Rewards panel */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 rounded-xl space-y-2">
                    {hasBulkDiscount ? (
                      <div className="flex gap-2 items-start text-emerald-600 dark:text-emerald-400 text-xs">
                        <ShieldCheck size={16} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">10% Extra Volume Discount Applied</p>
                          <p className="text-[10px] text-emerald-600/70 mt-0.5">Your procurement volume fulfills commercial bulk tier limits!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                          <span>Wholesale Bulk Discount Level</span>
                          <span className="text-gold-500">{totalPacks}/{bulkDiscountThreshold} Packs</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-150 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold-500 transition-all duration-300"
                            style={{ width: `${Math.min(100, (totalPacks / bulkDiscountThreshold) * 100)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-normal">
                          Order <span className="font-semibold text-neutral-700 dark:text-neutral-300">{bulkDiscountThreshold - totalPacks} more packs</span> to achieve an extra 10% wholesale cost reductions.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Total Sourced Packs</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{totalPacks} Packs</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Total Volume Suits</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{totalSuits} Suits</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-850">
                      <span>Wholesale Subtotal</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {hasBulkDiscount && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                        <span>10% Bulk Discount Settlement</span>
                        <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Freight Weight Surcharge</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">₹{shipping.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                      <span className="text-sm font-serif font-bold text-neutral-900 dark:text-white">Provisional Total</span>
                      <span className="text-lg font-serif font-bold text-gold-600 dark:text-gold-400">₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full py-4 text-xs font-semibold uppercase tracking-widest text-center bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    id="cart-checkout-continue-btn"
                  >
                    Provide Wholesale Details <ArrowRight size={14} />
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 leading-normal">
                    GSTIN or business tax registration requested in subsequent step to secure trade invoices.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* STEP 2. COMMERCIAL trade billing & tax information */}
      {checkoutStep === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Details form L.H.S */}
          <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-8 rounded-2xl space-y-6">
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                Wholesale Corporate Credentials
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Please provide commercial credentials. Verified trade details are hard-coded into legal bills of lading.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg flex items-center gap-2">
                <AlertCircle size={15} /> {errorMsg}
              </div>
            )}

            <div className="space-y-5">
              {/* Row 1: Company Name & GSTIN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    Boutique / Company Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Building size={15} />
                    </span>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Alina Haute Couture"
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    GSTIN / Commercial Trade Tax ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Landmark size={15} />
                    </span>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="e.g. 07AAAAA1111A1Z1"
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Contact name & email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    Sourcing Manager Name *
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Alina Malik"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="sourcing@alinaboutique.com"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    Business Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98110 XXXXX"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Shipping location address details */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                  Consignment Shipping Address *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <MapPin size={15} />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Suite 4B, MG Road, DLF Phase 1"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">City / District *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Gurugram"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">State / Province</label>
                  <input
                    type="text"
                    value={stateRegion}
                    onChange={(e) => setStateRegion(e.target.value)}
                    placeholder="Haryana"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Zip / Postal Code</label>
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="122002"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Importing Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="India"
                    className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Settlement banking mode */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-850">
                <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                  Select B2B Settlement Mechanism:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-gold-500 bg-gold-50/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Commercial Bank Wire (RTGS / SWIFT)</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Invoice sent instantly. Clear cargo upon wire verification.</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-gold-500 bg-gold-50/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Business UPI / Corporate NetBanking</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Instant ledger clearing. Preferred for domestic Indian shipments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculations checkout block R.H.S */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 pb-3">
              Purchase Order Review
            </h3>

            <div className="space-y-3 text-xs border-b border-neutral-100 pb-4">
              <div className="flex justify-between text-neutral-600">
                <span>Total Sourced Volume</span>
                <span className="font-bold text-neutral-900 dark:text-white">{totalSuits} Suits ({totalPacks} Packs)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Wholesale Subtotal</span>
                <span className="font-semibold text-neutral-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {hasBulkDiscount && (
                <div className="flex justify-between text-emerald-600">
                  <span>10% Volume Settle Discount</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Freight Logistics Shipping</span>
                <span className="font-semibold text-neutral-900 dark:text-white">₹{shipping.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-serif font-bold text-neutral-900 dark:text-white">Final Settle Sum</span>
              <span className="text-lg font-serif font-bold text-gold-600 dark:text-gold-400">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="submit"
              disabled={submittingOrder}
              className="w-full py-4 text-xs font-semibold uppercase tracking-widest text-center bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              id="details-submit-btn"
            >
              {submittingOrder ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-neutral-950 inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Trade Ledger...
                </>
              ) : (
                <>
                  Transmit Procurement Order <ArrowRight size={14} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCheckoutStep('cart')}
              className="w-full py-3 text-xs uppercase tracking-widest text-center border border-neutral-250 hover:bg-neutral-50 text-neutral-600 dark:text-neutral-300 rounded-lg transition-colors cursor-pointer"
            >
              Back to Review Items
            </button>
          </div>

        </form>
      )}

      {/* STEP 3. ORDER PLACEMENT SUCCESS WINDOW */}
      {checkoutStep === 'success' && (
        <div className="py-16 text-center max-w-2xl mx-auto space-y-8 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl p-8 shadow-xl">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 size={44} />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-emerald-600">
              Trade Purchase Request Sourced
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 dark:text-white">
              ORDER TRANSACTION SUCCEEDED
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            <p className="text-xs text-neutral-500 leading-relaxed max-w-md mx-auto font-sans">
              Thank you for choosing Premium Textiles. Your bulk procurement manifest has been successfully submitted to our finance desk at Katra Neel, Chandni Chowk, Delhi.
            </p>
          </div>

          {/* Settle Details invoice card */}
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-xl p-6 text-left max-w-md mx-auto space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400">Trade Receipt Ref:</span>
              <span className="font-bold text-neutral-900 dark:text-white">{generatedInvoiceNo}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400">Merchant Entity:</span>
              <span className="font-bold text-neutral-900 dark:text-white">{companyName || 'Verified Partner'}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400">Tax Registration ID:</span>
              <span className="font-bold text-neutral-900 dark:text-white">{gstNumber || 'Trade Verified'}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400">Consignment Value:</span>
              <span className="font-bold text-gold-600 dark:text-gold-400 font-serif">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Call for custom settlement finalized */}
          <div className="space-y-4 max-w-sm mx-auto">
            <a
              href="https://wa.me/9198110XXXXX?text=Hello%20Premium%20Textiles%2C%20I%20have%20submitted%20wholesale%20order%20reference%20"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <PhoneCall size={14} /> Finalize Settlement on WhatsApp
            </a>

            <Link
              to="/shop"
              className="block text-xs uppercase tracking-widest font-semibold text-neutral-500 hover:text-neutral-900 hover:underline transition-colors"
            >
              ← Procurement directory home
            </Link>
          </div>

          <div className="pt-6 border-t border-neutral-100 text-center text-[10px] text-neutral-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Truck size={12} className="text-gold-500" /> Dispatching within 2 business days via air cargo DHL.
          </div>
        </div>
      )}
    </div>
  );
};
