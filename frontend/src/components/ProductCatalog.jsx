import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, Star, ShieldCheck, Check, Info, X, Zap } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Isolates',
  'Whey Protein',
  'Creatine & Pre-Workout',
  'Mass Gainers',
  'Vitamins & Health',
];

export default function ProductCatalog({
  products = [],
  onAddToCart,
  onQuickWhatsAppOrder,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  
  // Local state for flavor & size selection per card
  const [productSelections, setProductSelections] = useState({});

  const getSelection = (product) => {
    return (
      productSelections[product._id] || {
        flavor: product.flavors?.[0]?.name || 'Standard',
        size: product.sizes?.[0] || 'Standard',
      }
    );
  };

  const updateSelection = (productId, key, value) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value,
      },
    }));
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.batchCode?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-emerald-400 text-xs font-mono mb-4">
              <Zap className="w-3.5 h-3.5" />
              AUTHENTIC SURAT INVENTORY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white">
              VERIFIED <span className="text-gradient-volt">SUPPLEMENTS</span> CATALOG
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              100% genuine sports nutrition products in stock at our Velanja Rd showroom. Ready for same-day delivery across Surat or 15-minute counter pickup.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protein, brand, batch..."
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs sm:text-sm font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-volt-glow'
                  : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selection = getSelection(product);

            return (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl relative"
              >
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-white/5">
                    {product.brand}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.discount}
                  </span>
                </div>

                {/* Product Image & Quick View trigger */}
                <div
                  className="relative h-48 rounded-2xl overflow-hidden bg-zinc-950 mb-4 cursor-pointer"
                  onClick={() => setSelectedProductForModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                  {/* Batch Code Tag */}
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {product.batchCode}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProductForModal(product);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition"
                    title="Quick Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-xs text-amber-400 mb-1.5 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewCount})</span>
                  </div>

                  <h3
                    onClick={() => setSelectedProductForModal(product)}
                    className="text-base font-bold text-white line-clamp-2 hover:text-emerald-400 transition cursor-pointer font-heading"
                  >
                    {product.name}
                  </h3>

                  {/* Macro Highlights */}
                  <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-zinc-400">
                    <span className="text-emerald-400 font-bold">{product.proteinPerScoop} Protein</span>
                    <span>•</span>
                    <span className="text-zinc-300">{product.bcaaPerScoop} BCAA</span>
                    <span>•</span>
                    <span>{product.servings} Servings</span>
                  </div>
                </div>

                {/* Flavor & Size Selector */}
                <div className="space-y-2 mb-4 pt-3 border-t border-white/5 text-xs">
                  {product.flavors && product.flavors.length > 0 && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400 text-[11px] font-mono">Flavor:</span>
                      <select
                        value={selection.flavor}
                        onChange={(e) => updateSelection(product._id, 'flavor', e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-200 text-xs font-mono focus:outline-none focus:border-emerald-500 max-w-[150px]"
                      >
                        {product.flavors.map((fl) => (
                          <option key={fl.name} value={fl.name}>
                            {fl.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400 text-[11px] font-mono">Size:</span>
                      <select
                        value={selection.size}
                        onChange={(e) => updateSelection(product._id, 'size', e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-200 text-xs font-mono focus:outline-none focus:border-emerald-500 max-w-[150px]"
                      >
                        {product.sizes.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Pricing & Actions */}
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black font-mono text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono line-through text-zinc-500">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        onAddToCart({
                          productId: product._id,
                          name: product.name,
                          brand: product.brand,
                          price: product.price,
                          flavor: selection.flavor,
                          size: selection.size,
                          image: product.image,
                        })
                      }
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() =>
                        onQuickWhatsAppOrder({
                          name: product.name,
                          price: product.price,
                          flavor: selection.flavor,
                          size: selection.size,
                        })
                      }
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs border border-emerald-500/40 transition active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Buy on WA</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProductForModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl w-full glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 max-h-[90vh] overflow-y-auto relative shadow-2xl"
              >
                <button
                  onClick={() => setSelectedProductForModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-zinc-950 shrink-0">
                    <img
                      src={selectedProductForModal.image}
                      alt={selectedProductForModal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-1">
                      {selectedProductForModal.brand} • {selectedProductForModal.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white mb-2">
                      {selectedProductForModal.name}
                    </h3>
                    <div className="text-2xl font-black font-mono text-emerald-400 mb-3">
                      ₹{selectedProductForModal.price.toLocaleString('en-IN')}{' '}
                      <span className="text-xs text-zinc-500 line-through font-normal">
                        ₹{selectedProductForModal.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {selectedProductForModal.description}
                    </p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-6 p-4 rounded-2xl bg-zinc-900/80 border border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                    Tested Clinical Advantages:
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {selectedProductForModal.keyBenefits?.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FSSAI & Batch Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-t border-white/10 pt-4">
                  <span>FSSAI Lic: {selectedProductForModal.fssaiNumber}</span>
                  <span className="text-emerald-400">Batch Code: {selectedProductForModal.batchCode}</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
