import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/index';
import { api } from '../lib/api';
import { useApp } from '../contexts/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  GitCompare,
  Search,
  Filter,
  Check,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, showToast } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters for catalogue browse
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(100000);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (id) {
          const res = await api.getProductById(id);
          setProduct(res.product);
          setSelectedColor(res.product.color_options[0] || 'Standard');
          setSelectedSize(res.product.size_options[0] || 'Standard');
        } else {
          const params: Record<string, string | number | boolean> = {};
          if (searchQuery) params.query = searchQuery;
          if (selectedCategory !== 'all') params.category = selectedCategory;
          if (maxPriceFilter < 100000) params.maxPrice = maxPriceFilter;
          const res = await api.getProducts(params);
          setCatalog(res.products);
        }
      } catch (err) {
        showToast('Error loading product data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, selectedCategory, maxPriceFilter]);

  // If viewing single product details
  if (id && product) {
    const isWish = isInWishlist(product.id);
    const discount =
      product.original_price && product.original_price > product.price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : null;

    return (
      <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto animate-in fade-in duration-200">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous</span>
        </button>

        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Genuine Product
              </span>
              <span className="flex items-center gap-1 font-medium text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg">
                <Truck className="w-4 h-4 text-violet-600" />
                {product.delivery_days}-Day Express Delivery
              </span>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                {product.brand} • {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mt-1 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-800 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">
                  ({product.review_count.toLocaleString('en-IN')} verified customer reviews)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-mono">SKU: {product.sku}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="text-3xl font-extrabold text-gray-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.original_price.toLocaleString('en-IN')}
                  </span>
                )}
                {discount && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {discount}% OFF FESTIVAL SPECIAL
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Options */}
              {product.color_options && product.color_options.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                    Color: <span className="text-gray-900">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.color_options.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          selectedColor === col
                            ? 'border-violet-600 bg-violet-50 text-violet-900 font-bold'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.size_options && product.size_options.length > 0 && !product.size_options.includes('Standard') && (
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                    Size: <span className="text-gray-900">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.size_options.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all ${
                          selectedSize === sz
                            ? 'border-violet-600 bg-violet-50 text-violet-900 font-bold'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specifications || {}).map(([k, v]) => (
                    <div key={k} className="p-1.5 bg-white rounded-lg border border-gray-100">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">{k}</span>
                      <span className="font-semibold text-gray-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => addToCart(product.id, 1, selectedColor, selectedSize)}
                className="flex-1 py-3 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isWish
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-600' : ''}`} />
                <span>{isWish ? 'Wishlisted' : 'Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => addToCompare(product)}
                className="py-3 px-4 rounded-2xl border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Catalog Explorer View (/products)
  const categories = ['all', 'Mobile Phones', 'Laptops', 'Headphones', 'Smartwatches', 'Sarees', 'Kurtis', "Men's Clothing", 'Shoes', 'Kitchen', 'TV', 'Furniture', 'Grocery'];

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
      {/* Top Bar Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Catalogue Explorer</h2>
          <p className="text-xs text-gray-500">200+ Seeded products with verified pricing in INR (₹)</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-violet-400"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedCategory === c
                ? 'bg-violet-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {c === 'all' ? 'All Items' : c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20 text-xs text-gray-400">Loading catalog...</div>
      ) : catalog.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/80 p-8">
          <h3 className="text-base font-bold text-gray-800">No matching products found</h3>
          <p className="text-xs text-gray-500 mt-1">Try relaxing filters or broadening your keyword search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {catalog.map((prod) => (
            <ProductCard key={prod.id} product={prod} layout="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
