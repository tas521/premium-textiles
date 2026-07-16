import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Building,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    cart,
    wishlist,
    user,
    logoutUser,
    setAuthModalOpen,
    setCartDrawerOpen,
  } = useApp();

  const navigate = useNavigate();

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof DUMMY_PRODUCTS>([]);
  // Profile dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Totals
  const totalCartPacks = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Search filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const results = DUMMY_PRODUCTS.filter(
        (prod) =>
          prod.name.toLowerCase().includes(query.toLowerCase()) ||
          prod.brand.toLowerCase().includes(query.toLowerCase()) ||
          prod.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results.slice(0, 5)); // Limit to top 5 quick results
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const selectSearchResult = (productId: string) => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {/* Top Banner / Announcement Bar (wholesale context) */}
      <div className="w-full bg-neutral-950 dark:bg-neutral-900 border-b border-neutral-800 text-neutral-200 text-[9px] sm:text-xs font-medium uppercase tracking-wider sm:tracking-widest py-2 px-4 flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 z-50 relative">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>OFFICIAL WHOLESALE SUPPLIER DIRECTORY</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden lg:inline-flex items-center gap-1">
            <MapPin size={10} className="text-gold-400" /> Delhi, Chandni Chowk
          </span>
          <span className="hidden lg:inline-flex items-center gap-1">
            <PhoneCall size={10} className="text-gold-400" /> WhatsApp Direct Desk: +91 98110XXXXX
          </span>
          <span className="text-gold-400 font-bold">MINIMUM ORDER: ONLY 2 PACKS / SETS</span>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0E1117]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-neutral-800/80 shadow-[0_4px_25px_rgba(139,115,85,0.04)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-600 rounded-lg transition-colors"
              id="mobile-menu-toggle"
            >
              <Menu size={20} />
            </button>

            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex flex-col items-center lg:items-start group">
                <span className="font-serif text-sm sm:text-lg md:text-2xl font-light tracking-[0.15em] sm:tracking-[0.25em] uppercase text-neutral-900 dark:text-white transition-all duration-300 group-hover:text-gold-500">
                  PREMIUM <span className="font-semibold">TEXTILES</span>
                </span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold-500 font-semibold mt-0.5 sm:mt-1 font-mono">
                  Luxury Pakistani Wholesalers
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? 'text-gold-500' : 'text-neutral-600 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-500'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? 'text-gold-500' : 'text-neutral-600 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-500'
                  }`
                }
              >
                Shop Catalog
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? 'text-gold-500' : 'text-neutral-600 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-500'
                  }`
                }
              >
                About Story
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? 'text-gold-500' : 'text-neutral-600 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-500'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Interactive Actions Panel */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-500 rounded-full transition-colors relative cursor-pointer"
                id="search-toggle-btn"
                title="Search Products"
              >
                <Search size={17} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-500 rounded-full transition-colors relative cursor-pointer"
                id="theme-toggle-btn"
                title={theme === 'dark' ? 'Activate Light Theme' : 'Activate Dark Theme'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-500 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart size={17} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white font-semibold rounded-full w-4 h-4 text-[9px] flex items-center justify-center shadow-xs animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Trigger */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-500 rounded-full transition-colors relative cursor-pointer"
                id="cart-trigger-btn"
                title="Shopping Cart"
              >
                <ShoppingBag size={17} />
                {totalCartPacks > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white font-bold rounded-full w-3.5 h-3.5 text-[8px] flex items-center justify-center shadow-xs">
                    {totalCartPacks}
                  </span>
                )}
              </button>

              {/* B2B Partner Account Dropdown */}
              <div className="relative hidden sm:block">
                {user.isLoggedIn ? (
                  <div>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-1 p-1.5 md:px-3 md:py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-lg transition-all cursor-pointer"
                      id="account-menu-btn"
                    >
                      <UserIcon size={14} className="text-gold-500" />
                      <span className="hidden md:inline max-w-[80px] truncate">{user.name}</span>
                      <ChevronDown size={12} className="text-neutral-400" />
                    </button>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <>
                          {/* Close backdrop */}
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setProfileDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2.5 w-60 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-xl shadow-2xl z-40 p-4"
                          >
                            <div className="pb-3 mb-2 border-b border-neutral-100 dark:border-neutral-850">
                              <span className="text-[9px] uppercase tracking-widest text-gold-600 dark:text-gold-500 font-bold font-mono">
                                Registered Partner
                              </span>
                              <p className="font-serif text-sm font-semibold text-neutral-900 dark:text-white truncate">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                                {user.email}
                              </p>
                            </div>

                            <div className="space-y-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                              {user.companyName && (
                                <div className="flex items-center gap-2">
                                  <Building size={12} className="text-neutral-400" />
                                  <span className="font-medium line-clamp-1">Co: {user.companyName}</span>
                                </div>
                              )}
                              {user.gstNumber && (
                                <div className="flex items-center gap-2">
                                  <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-semibold">
                                    Tax ID
                                  </span>
                                  <span className="font-mono text-[10px]">{user.gstNumber}</span>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => {
                                logoutUser();
                                setProfileDropdownOpen(false);
                              }}
                              className="w-full mt-4 py-2 text-center text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <LogOut size={12} /> Log Out Portal
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-gold-600 rounded-full transition-colors cursor-pointer"
                    id="login-trigger-btn"
                    title="B2B Login"
                  >
                    <UserIcon size={17} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Search Bar Container */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-150 dark:border-neutral-800 overflow-hidden"
            >
              <div className="w-full max-w-3xl mx-auto px-4 py-5">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by collection, brand (e.g. Maria B, Sana Safinaz) or fabric category..."
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>

                {/* Instant Quick Results */}
                {searchResults.length > 0 && (
                  <div className="mt-3 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-850">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => selectSearchResult(prod.id)}
                        className="p-3 flex items-center gap-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-950 cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-12 object-cover rounded-md bg-neutral-100 dark:bg-neutral-800"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-serif font-bold text-neutral-900 dark:text-white truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-gold-600 dark:text-gold-500 mt-0.5">
                            {prod.brand} • {prod.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                            ₹{prod.wholesalePrice.toLocaleString('en-IN')}/suit
                          </span>
                          <p className="text-[9px] text-neutral-400 font-mono">Pack of {prod.packSize}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Slide Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Mobile panel menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xs h-full bg-white dark:bg-neutral-900 p-6 flex flex-col z-20 border-r border-neutral-150 dark:border-neutral-800"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <span className="font-serif text-base font-bold tracking-widest text-neutral-900 dark:text-white">
                  PREMIUM TEXTILES
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full bg-neutral-100 dark:bg-neutral-850"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links list */}
              <div className="flex-1 flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200 hover:text-gold-600 dark:hover:text-gold-400 py-2 border-b border-neutral-50 dark:border-neutral-850"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200 hover:text-gold-600 dark:hover:text-gold-400 py-2 border-b border-neutral-50 dark:border-neutral-850"
                >
                  Shop Catalog
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200 hover:text-gold-600 dark:hover:text-gold-400 py-2 border-b border-neutral-50 dark:border-neutral-850"
                >
                  About Story
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200 hover:text-gold-600 dark:hover:text-gold-400 py-2 border-b border-neutral-50 dark:border-neutral-850"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Footer Area */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-850">
                {user.isLoggedIn ? (
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      Logged in as <span className="font-semibold text-neutral-950 dark:text-white">{user.name}</span>
                      {user.companyName && (
                        <span className="block text-[10px] text-neutral-400 mt-1">
                          Co: {user.companyName}
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 text-center text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut size={12} /> Log Out Portal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3 text-center text-xs uppercase tracking-widest font-semibold bg-neutral-900 text-white dark:bg-gold-500 dark:text-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    B2B Wholesaler Login
                  </button>
                )}
                <p className="text-[9px] text-neutral-400 mt-4 text-center">
                  Premium Textiles Wholesale Directory v1.0
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
