import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, moveWishlistItemToCart } = useApp();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left border-b border-neutral-100 dark:border-neutral-850 pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 font-mono font-bold">
          Procurement Shortlist
        </span>
        <h1 className="font-serif text-2xl md:text-4xl text-neutral-900 dark:text-white tracking-wide">
          MY SOURCING WISHLIST
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl">
          Keep track of luxury catalog sets and seasonal fabric series you plan to source. Easily transfer shortlisted sets to your active checkout order.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl max-w-lg mx-auto p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center mx-auto text-neutral-400">
            <Heart size={32} />
          </div>
          <div>
            <h2 className="font-serif text-lg text-neutral-850 dark:text-neutral-200">Wishlist is Empty</h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Explore our B2B directory and click the heart icons to bookmark high-end suit packs for upcoming purchase seasons.
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
        /* Grid with custom Move to Cart button cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => {
            const packPrice = product.wholesalePrice * product.packSize;

            return (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full"
              >
                {/* Image frame */}
                <div className="relative aspect-4/5 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Absolute Delete Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 text-neutral-400 hover:text-rose-500 rounded-full shadow-xs transition-colors cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                      <span className="uppercase font-semibold tracking-wider text-gold-600 dark:text-gold-400">
                        {product.brand}
                      </span>
                      <span>{product.category}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                      <h3 className="font-serif text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        ₹{product.wholesalePrice.toLocaleString('en-IN')}/Suit
                      </span>
                      <span className="text-[10px] text-gold-600 dark:text-gold-400 font-mono">
                        Pack Price: ₹{packPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Action triggers */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-850 flex gap-2">
                    <button
                      onClick={() =>
                        moveWishlistItemToCart(
                          product,
                          product.sizes[0] || 'Unstitched',
                          product.colours[0],
                          'Unstitched'
                        )
                      }
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-gold-500 dark:text-neutral-950 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={11} /> Move to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="p-2 border border-neutral-250 dark:border-neutral-800 rounded-sm hover:bg-neutral-50 dark:hover:bg-neutral-850 text-neutral-500 dark:text-neutral-300 transition-all"
                      title="View Details"
                    >
                      <Eye size={12} />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
