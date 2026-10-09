import React from 'react';
import { RecommendedProduct } from '../../types/index';
import { useApp } from '../../contexts/AppContext';
import { Heart, ShoppingCart, GitCompare, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: RecommendedProduct;
  layout?: 'grid' | 'chat';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'chat' }) => {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare } = useApp();
  const navigate = useNavigate();
  const isWish = isInWishlist(product.id);

  const discountPercent =
    product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : null;

  return (
    <div
      className={`group relative bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col ${
        layout === 'chat' ? 'w-full max-w-[340px] flex-shrink-0' : 'w-full'
      }`}
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-4/3 w-full bg-gray-50 overflow-hidden cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Why recommended badge */}
        {product.why_recommended && (
          <div className="absolute top-2.5 left-2.5 bg-violet-900/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>AI Match</span>
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
            isWish ? 'bg-rose-50 text-rose-600' : 'bg-white/80 hover:bg-white text-gray-600'
          }`}
          title={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
            <span className="font-semibold text-violet-700 uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-800 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.review_count.toLocaleString('en-IN')})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4
            className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug cursor-pointer hover:text-violet-700 transition-colors mb-2"
            onClick={() => navigate(`/products/${product.id}`)}
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.highlights.slice(0, 3).map((hl, i) => (
                <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">
                  {hl}
                </span>
              ))}
            </div>
          )}

          {/* Pricing & Stock */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-gray-950">₹{product.price.toLocaleString('en-IN')}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.original_price.toLocaleString('en-IN')}</span>
            )}
            {discountPercent && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Delivery & Stock notice */}
          <div className="text-[11px] text-gray-500 flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="flex items-center gap-1 text-gray-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Delivery in {product.delivery_days} days
            </span>
            <span className={product.stock_qty < 15 ? 'text-amber-600 font-medium' : 'text-gray-400'}>
              {product.stock_qty < 15 ? `Only ${product.stock_qty} left` : 'In Stock'}
            </span>
          </div>

          {/* Why Recommended Explain Text */}
          {product.why_recommended && (
            <p className="mt-2 text-xs text-violet-900 bg-violet-50/70 p-2 rounded-lg leading-relaxed line-clamp-2 border border-violet-100/60">
              <strong className="font-semibold text-violet-950">Why: </strong>
              {product.why_recommended}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-1">
          <button
            type="button"
            onClick={() => addToCompare(product)}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Compare with other products"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            title="View product specifications"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 shadow-xs transition-all"
            title="Add directly to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
