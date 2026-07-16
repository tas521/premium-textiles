import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, SlidersHorizontal, RotateCcw, AlertCircle, ShoppingBag } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColourName, setSelectedColourName] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Mobile Filters Drawer Open
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with search queries or category clicks from other pages
  useEffect(() => {
    const searchVal = searchParams.get('search');
    const categoryVal = searchParams.get('category');
    const brandVal = searchParams.get('brand');

    if (searchVal) setSearchQuery(searchVal);
    if (categoryVal) setSelectedCategory(categoryVal);
    if (brandVal) setSelectedBrand(brandVal);
  }, [searchParams, location.search]);

  // Unique attribute list for filter lists
  const brandsList = ['All', ...Array.from(new Set(DUMMY_PRODUCTS.map((p) => p.brand)))];
  const categoriesList = ['All', ...Array.from(new Set(DUMMY_PRODUCTS.map((p) => p.category)))];
  const subCategoriesList = ['All', ...Array.from(new Set(DUMMY_PRODUCTS.map((p) => p.subCategory)))];
  const sizesList = ['All', 'Unstitched', 'S', 'M', 'L', 'XL'];
  
  // Flatten and extract unique colors
  const coloursList = [
    'All',
    ...Array.from(
      new Set(
        DUMMY_PRODUCTS.flatMap((p) => p.colours.map((c) => c.name))
      )
    ),
  ];

  // Filtering Logic
  const filteredProducts = DUMMY_PRODUCTS.filter((prod) => {
    // 1. Search Query
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      prod.name.toLowerCase().includes(query) ||
      prod.brand.toLowerCase().includes(query) ||
      prod.category.toLowerCase().includes(query) ||
      prod.sku.toLowerCase().includes(query);

    // 2. Category
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;

    // 3. Sub-Category
    const matchesSubCategory = selectedSubCategory === 'All' || prod.subCategory === selectedSubCategory;

    // 4. Brand
    const matchesBrand = selectedBrand === 'All' || prod.brand === selectedBrand;

    // 5. Sizing (matches if product has sizes list containing size query)
    const matchesSize =
      selectedSize === 'All' ||
      prod.sizes.some((s) => s.includes(selectedSize));

    // 6. Colour Name
    const matchesColour =
      selectedColourName === 'All' ||
      prod.colours.some((c) => c.name === selectedColourName);

    // 7. Wholesale Unit Price
    const matchesPrice = prod.wholesalePrice <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubCategory &&
      matchesBrand &&
      matchesSize &&
      matchesColour &&
      matchesPrice
    );
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.wholesalePrice - b.wholesalePrice;
    }
    if (sortBy === 'price-desc') {
      return b.wholesalePrice - a.wholesalePrice;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default is popularity / latest releases
    return b.reviewsCount - a.reviewsCount;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setSelectedBrand('All');
    setSelectedSize('All');
    setSelectedColourName('All');
    setMaxPrice(1200);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 space-y-2 border-b border-neutral-100 dark:border-neutral-850 pb-6 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 font-mono font-bold">
          Wholesale Trade Portal
        </span>
        <h1 className="font-serif text-2xl md:text-4xl text-neutral-900 dark:text-white tracking-wide">
          WHOLESALE CATALOGUE SOURCING
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Search the commercial directory for premium Pakistani suits. Order in complete catalog bundles with volume-graded logistics directly from Delhi's central garment hub.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ==============================================
            A. FILTERS SIDEBAR (DESKTOP)
           ============================================== */}
        <aside className="hidden lg:block w-72 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl space-y-6 sticky top-24">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-gold-500" /> Filter Options
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-[10px] uppercase font-bold text-neutral-400 hover:text-gold-600 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset All"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* 1. Search filter input */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Keyword Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Maria.B, Velvet, Red"
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500"
            />
          </div>

          {/* 2. Fabric Category */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Fabric / Material
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {categoriesList.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat === 'All' ? 'All Materials' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Sub-Category */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Collection Range
            </label>
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {subCategoriesList.map((sc, idx) => (
                <option key={idx} value={sc}>
                  {sc === 'All' ? 'All Collections' : sc}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Brand */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Apparel Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {brandsList.map((b, idx) => (
                <option key={idx} value={b}>
                  {b === 'All' ? 'All Designers' : b}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Size Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Uniform Sizing Choice
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {sizesList.map((sz, idx) => (
                <option key={idx} value={sz}>
                  {sz === 'All' ? 'All Sizes' : sz === 'Unstitched' ? 'Fabric Only (Unstitched)' : `Packs with Size ${sz}`}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Colors Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Color Palette Filter
            </label>
            <select
              value={selectedColourName}
              onChange={(e) => setSelectedColourName(e.target.value)}
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 text-neutral-950 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {coloursList.map((clr, idx) => (
                <option key={idx} value={clr}>
                  {clr === 'All' ? 'All Colors' : clr}
                </option>
              ))}
            </select>
          </div>

          {/* 7. Price Filter Range */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-850">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
                Max Suit Price
              </label>
              <span className="font-mono text-xs font-bold text-gold-600 dark:text-gold-400">
                ₹{maxPrice.toLocaleString('en-IN')}/suit
              </span>
            </div>
            <input
              type="range"
              min={300}
              max={1200}
              step={20}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gold-500 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-neutral-400">
              Filters individual wholesaled suit rates (e.g. range ₹300 – ₹1,200).
            </p>
          </div>
        </aside>

        {/* ==============================================
            B. MAIN CATALOG VIEW GRID AREA
           ============================================== */}
        <div className="flex-1 w-full space-y-6">
          {/* Grid control bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-xl">
            <div className="text-xs text-neutral-500">
              Showing <span className="font-bold text-neutral-950 dark:text-white">{sortedProducts.length}</span> wholesale suits matching parameters
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden px-4 py-2 text-xs border border-neutral-250 rounded-lg flex items-center gap-1.5 hover:bg-neutral-50 text-neutral-700 dark:text-neutral-300 dark:border-neutral-800"
              >
                <Filter size={14} /> Filter List
              </button>

              {/* Sort selector dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 hidden sm:inline">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-lg text-neutral-950 dark:text-white cursor-pointer"
                >
                  <option value="popular">Popularity (Bestsellers)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Ratings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sourcing active filter tags row */}
          {(selectedCategory !== 'All' ||
            selectedSubCategory !== 'All' ||
            selectedBrand !== 'All' ||
            selectedSize !== 'All' ||
            selectedColourName !== 'All' ||
            searchQuery !== '') && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                Active Limits:
              </span>
              {searchQuery && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Query: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Fabric: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedSubCategory !== 'All' && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Coll: {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory('All')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedBrand !== 'All' && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('All')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedSize !== 'All' && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize('All')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedColourName !== 'All' && (
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pl-2 pr-1.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-750 flex items-center gap-1">
                  Color: {selectedColourName}
                  <button onClick={() => setSelectedColourName('All')} className="p-0.5 hover:text-rose-500">
                    <X size={10} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Empty result view placeholder */}
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-2xl max-w-xl mx-auto p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center mx-auto text-neutral-400">
                <AlertCircle size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-neutral-800 dark:text-neutral-200">No Wholesale Matches</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We currently do not have stock listing items matching these specific category ranges. Try adjusting filters or clearing limits to review general stock.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-neutral-900 text-white dark:bg-gold-500 dark:text-neutral-950 rounded-md hover:bg-neutral-800 hover:scale-[1.02] transition-all"
              >
                Clear all active filters
              </button>
            </div>
          ) : (
            /* Standard Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ==============================================
          C. MOBILE FILTERS DRAWER (COLLAPSED BY DEFAULT)
         ============================================== */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-110 flex justify-start lg:hidden">
          {/* Glass overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="relative w-full max-w-xs h-full bg-white dark:bg-neutral-900 shadow-2xl p-6 overflow-y-auto flex flex-col z-20">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-6">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                Filter Selection
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* Inner scroll filters */}
            <div className="flex-1 space-y-5">
              {/* Search */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Keyword Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Maria.B"
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-950 dark:text-white"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Fabric / Material</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-950 dark:text-white"
                >
                  {categoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat === 'All' ? 'All Fabrics' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Category */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Collection Range</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-950 dark:text-white"
                >
                  {subCategoriesList.map((sc, idx) => (
                    <option key={idx} value={sc}>
                      {sc === 'All' ? 'All Ranges' : sc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Apparel Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-950 dark:text-white"
                >
                  {brandsList.map((b, idx) => (
                    <option key={idx} value={b}>
                      {b === 'All' ? 'All Designers' : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500">Sizing Choice</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-950 dark:text-white"
                >
                  {sizesList.map((sz, idx) => (
                    <option key={idx} value={sz}>
                      {sz === 'All' ? 'All Sizes' : sz}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between">
                  <label className="text-[10px] uppercase font-bold text-neutral-500">Max Unit Price</label>
                  <span className="font-mono text-xs font-semibold text-gold-600">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={1200}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>

            {/* Bottom drawer trigger controls */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2 border border-neutral-250 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 rounded-md"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2 bg-neutral-900 text-white dark:bg-gold-500 dark:text-neutral-950 text-xs rounded-md font-semibold"
              >
                Apply Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
