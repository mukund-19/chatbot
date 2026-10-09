import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, ShoppingCart, Trash2, CheckCircle2, GitCompare } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen, addToCart } = useApp();

  if (!isCompareOpen || compareList.length === 0) return null;

  // Collect union of all spec keys
  const specKeys = Array.from(
    new Set(
      compareList.flatMap((p) => Object.keys(p.specifications || {}))
    )
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FCFBFE]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Side-by-Side Product Comparison</h3>
              <p className="text-xs text-gray-500">Comparing {compareList.length} of 4 selected products</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Table */}
        <div className="overflow-x-auto flex-1 p-5 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-gray-200/70">
                <th className="p-3 w-40 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/70 rounded-l-xl">
                  Product
                </th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-3 align-top min-w-[200px]">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white flex items-center justify-center text-xs text-gray-600 transition-colors shadow-xs"
                        title="Remove product"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl border border-gray-100 mb-2 mx-auto"
                      />
                      <span className="text-[11px] font-semibold text-violet-700 uppercase">{product.brand}</span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 leading-snug">{product.name}</h4>
                      <div className="mt-2 text-base font-extrabold text-gray-950">₹{product.price.toLocaleString('en-IN')}</div>
                      <button
                        onClick={() => addToCart(product.id, 1)}
                        className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {/* Rating */}
              <tr>
                <td className="p-3 font-semibold text-gray-500 bg-gray-50/50">Rating & Reviews</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-gray-800">
                    <span className="font-bold text-amber-700">{p.rating} ★</span> ({p.review_count.toLocaleString('en-IN')})
                  </td>
                ))}
              </tr>

              {/* Delivery Days */}
              <tr>
                <td className="p-3 font-semibold text-gray-500 bg-gray-50/50">Delivery Speed</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-gray-800">
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {p.delivery_days} Business Days
                    </span>
                  </td>
                ))}
              </tr>

              {/* Stock */}
              <tr>
                <td className="p-3 font-semibold text-gray-500 bg-gray-50/50">Availability</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-gray-800">
                    {p.stock_qty > 0 ? (
                      <span className="text-emerald-600 font-medium">In Stock ({p.stock_qty} units)</span>
                    ) : (
                      <span className="text-red-500 font-medium">Out of Stock</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Dynamic Specifications */}
              {specKeys.map((key) => (
                <tr key={key}>
                  <td className="p-3 font-semibold text-gray-500 bg-gray-50/50">{key}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 text-gray-800">
                      {p.specifications && p.specifications[key] ? (
                        <span className="font-medium text-gray-900">{String(p.specifications[key])}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>*Specifications verified against BharatShop official catalogue.</span>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-medium transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
