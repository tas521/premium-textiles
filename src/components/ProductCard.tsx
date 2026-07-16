import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Eye, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const [hovered, setHovered] = useState(false);

  const isLiked = isInWishlist(product.id);

  // Wholesale pricing formulas
  const suitWholesalePrice = product.wholesalePrice;
  const packPrice = product.wholesalePrice * product.packSize;
  const retailEquivalentPrice = product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Default values for quick add
    addToCart(
      product,
      1,
      product.sizes[0] || 'Unstitched',
      product.colours[0] || { name: 'Default', hex: '#ccc' },
      'Unstitched'
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-[#FDFDFD] dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-none overflow-hidden transition-all duration-500 hover:border-gold-500 dark:hover:border-gold-500 flex flex-col h-full"
    >
      {/* Badges / Discount */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discount > 0 && (
          <div className="bg-gold-500 text-white font-bold px-2.5 py-1 rounded-none text-[8px] uppercase tracking-widest shadow-xs">
            {product.discount}% Off
          </div>
        )}
        {product.isNewArrival && (
          <div className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold px-2.5 py-1 rounded-none text-[8px] uppercase tracking-widest shadow-xs">
            New Arrival
          </div>
        )}
        {product.isBestSeller && (
          <div className="bg-black text-white px-2.5 py-1 rounded-none text-[8px] font-bold uppercase tracking-widest shadow-xs">
            Best Seller
          </div>
        )}
      </div>

      {/* Wishlist triggers */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-none backdrop-blur-md transition-all duration-300 ${
          isLiked
            ? 'bg-rose-500 text-white'
            : 'bg-white/90 dark:bg-black/80 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black'
        }`}
        title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart size={13} className={isLiked ? 'fill-white' : ''} />
      </button>

      {/* Product Image Frame */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        />
        {/* Secondary image for luxury hover switch */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Quick action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-white/90 dark:bg-neutral-950/90 border-t border-neutral-100 dark:border-neutral-850 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-3 px-3 text-[9px] font-bold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-gold-500 hover:text-white dark:hover:bg-gold-500 transition-all rounded-none cursor-pointer"
          >
            Quick Add Pack
          </button>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-gold-500 hover:text-white transition-all rounded-none flex items-center justify-center cursor-pointer">
            <Eye size={12} />
          </div>
        </div>
      </Link>

      {/* Item metadata description */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-900">
        <div>
          {/* Brand and category */}
          <div className="flex items-center justify-between text-[9px] text-neutral-400 dark:text-neutral-500 font-mono tracking-widest mb-1.5">
            <span className="uppercase font-semibold tracking-widest text-gold-500">
              {product.brand}
            </span>
            <span>{product.category}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-gold-500 transition-colors">
            <h3 className="font-serif text-sm md:text-base text-neutral-900 dark:text-white font-medium tracking-wide line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-850">
          <div className="flex justify-between items-end">
            <div>
              {/* Unit Wholesale Price */}
              <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-widest">Wholesale Price</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">
                ₹{suitWholesalePrice.toLocaleString('en-IN')}
                <span className="text-[10px] font-normal text-neutral-500 dark:text-neutral-400 font-sans ml-1">
                  / Suit
                </span>
              </p>
            </div>
            
            <div className="text-right">
              {/* Entire Pack Price */}
              <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-widest">Pack Price ({product.packSize} suits)</p>
              <p className="text-sm font-semibold text-gold-500 font-serif tracking-wider">
                ₹{packPrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Savings indicator */}
          <div className="mt-3 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 px-2.5 py-2 rounded-none border border-neutral-100 dark:border-neutral-850 text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">
            <span>Retail equivalent: <span className="line-through text-neutral-400">₹{retailEquivalentPrice.toLocaleString('en-IN')}</span></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              Save ₹{(retailEquivalentPrice - suitWholesalePrice).toLocaleString('en-IN')} per suit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
