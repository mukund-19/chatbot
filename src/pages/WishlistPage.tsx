import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <Heart className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">No saved products yet</h3>
        <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6 leading-relaxed">
          Tap the heart icon on any product in recommendations or catalogue to bookmark it for later.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md transition-colors"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto animate-in fade-in duration-200">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">My Wishlist</h2>
        <p className="text-xs text-gray-500">{wishlist.length} saved products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div
                className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 cursor-pointer"
                onClick={() => navigate(`/products/${item.product_id}`)}
              >
                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-violet-700 uppercase">{item.product.brand}</span>
              <h4
                onClick={() => navigate(`/products/${item.product_id}`)}
                className="text-xs font-semibold text-gray-900 line-clamp-2 hover:text-violet-700 cursor-pointer mt-0.5"
              >
                {item.product.name}
              </h4>
              <div className="mt-2 text-base font-extrabold text-gray-950">
                ₹{item.product.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-2 mt-3">
              <button
                onClick={() => addToCart(item.product_id, 1)}
                className="flex-1 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(item.product_id)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
