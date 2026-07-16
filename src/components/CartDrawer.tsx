import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useApp();

  if (!cartDrawerOpen) return null;

  // Calculations
  const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSuits = cart.reduce((sum, item) => sum + item.product.packSize * item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.product.wholesalePrice * item.product.packSize * item.quantity;
    return sum + itemTotal;
  }, 0);

  // Wholesale bulk tier discount
  // If user orders 4 or more packs, they get 10% off the wholesale price!
  const bulkDiscountThreshold = 4;
  const hasBulkDiscount = totalPacks >= bulkDiscountThreshold;
  const discountAmount = hasBulkDiscount ? subtotal * 0.1 : 0;
  
  // Shipping (wholesale shipping is weight/volume based, let's say $15 per pack)
  const shipping = totalPacks > 0 ? totalPacks * 15 : 0;
  const finalTotal = subtotal - discountAmount + shipping;

  return (
    <div className="fixed inset-0 z-110 flex justify-end overflow-hidden">
      {/* Overlay back glass */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide out panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md h-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 shadow-2xl flex flex-col z-20"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white">
            <ShoppingBag size={20} className="text-gold-500" />
            <div>
              <h3 className="font-serif text-lg tracking-wide">Wholesale Cart</h3>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-0.5">
                {totalPacks} Packs ({totalSuits} Suits total)
              </p>
            </div>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            id="close-cart-drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar-style">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-neutral-400">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h4 className="font-serif text-base text-neutral-800 dark:text-neutral-200">Your cart is empty</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
                  Browse our catalog and add full wholesale packs to initiate your commercial purchase order.
                </p>
              </div>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 transition-colors rounded-sm"
              >
                Continue Sourcing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-100 dark:border-neutral-800 rounded-xl"
              >
                {/* Thumb image */}
                <div className="w-20 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-serif text-xs md:text-sm text-neutral-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-rose-500 p-0.5 transition-colors"
                        title="Remove Pack"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-mono mt-0.5">
                      {item.product.brand}
                    </p>

                    {/* Metadata attributes */}
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                      <span className="bg-white dark:bg-neutral-900 px-1.5 py-0.5 rounded-sm border border-neutral-150 dark:border-neutral-800">
                        Size: {item.selectedSize}
                      </span>
                      <span className="bg-white dark:bg-neutral-900 px-1.5 py-0.5 rounded-sm border border-neutral-150 dark:border-neutral-800 flex items-center gap-1">
                        Color:
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ backgroundColor: item.selectedColour.hex }}
                        />
                        {item.selectedColour.name}
                      </span>
                      <span className="bg-white dark:bg-neutral-900 px-1.5 py-0.5 rounded-sm border border-neutral-150 dark:border-neutral-800 text-gold-600 dark:text-gold-400">
                        Stitching: {item.stitchingOption}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Actions & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100 dark:border-neutral-850">
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-sm bg-white dark:bg-neutral-900">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-neutral-900 dark:text-white">
                        {item.quantity} <span className="text-[9px] font-normal text-neutral-400">Pks</span>
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        ${(item.product.wholesalePrice * item.product.packSize * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
                        ${item.product.wholesalePrice}/Suit ({item.product.packSize} suits pack)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Calculations */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-150 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
            {/* Wholesale rewards meter */}
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-150 dark:border-neutral-800">
              {hasBulkDiscount ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  <ShieldCheck size={16} />
                  <span>Congrats! 10% Extra Bulk Wholesaler discount applied.</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                    <span>Bulk Wholesale Discount Tier (4+ Packs)</span>
                    <span className="text-gold-600 dark:text-gold-400 font-semibold">
                      {totalPacks}/{bulkDiscountThreshold} Packs
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-850 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalPacks / bulkDiscountThreshold) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-normal">
                    Add <span className="text-gold-600 dark:text-gold-400 font-semibold">{bulkDiscountThreshold - totalPacks} more packs</span> to unlock 10% off the total wholesale volume!
                  </p>
                </div>
              )}
            </div>

            {/* Calculations and sums */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Wholesale Subtotal</span>
                <span className="font-semibold text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              {hasBulkDiscount && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>10% B2B Tier Discount</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Consolidated Freight Shipping</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2.5 border-t border-neutral-150 dark:border-neutral-800 flex justify-between items-center">
                <span className="text-sm font-serif font-semibold text-neutral-900 dark:text-white">Total Order Value</span>
                <span className="text-base font-serif font-bold text-gold-600 dark:text-gold-400">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={clearCart}
                className="p-3 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all"
                title="Clear Whole Cart"
              >
                <RefreshCw size={14} />
              </button>
              <Link
                to="/cart"
                onClick={() => setCartDrawerOpen(false)}
                className="flex-1 py-3 text-xs font-semibold uppercase tracking-widest text-center bg-neutral-900 text-white hover:bg-neutral-850 dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                id="cart-drawer-checkout-btn"
              >
                Review Purchase Order <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-500">
              Tax ID & Trade details collected securely prior to bank wire settlement.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
