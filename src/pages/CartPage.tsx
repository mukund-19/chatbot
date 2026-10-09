import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, setIsCheckoutModalOpen } = useApp();
  const navigate = useNavigate();

  const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-3xl bg-violet-100/70 text-violet-600 flex items-center justify-center mb-4">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Your shopping cart is empty</h3>
        <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6 leading-relaxed">
          Looks like you haven't added anything yet. Ask BharatShop AI for personalized recommendations or browse the full catalogue!
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md transition-colors"
          >
            Ask BharatShop AI
          </button>
          <button
            onClick={() => navigate('/products')}
            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold text-xs hover:bg-gray-50 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Shopping Cart</h2>
          <p className="text-xs text-gray-500">{totalItems} items in your current session</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Item Rows */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex gap-4 items-center"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100 shrink-0 cursor-pointer"
                onClick={() => navigate(`/products/${item.product_id}`)}
              />

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700">
                  {item.product.brand}
                </span>
                <h4
                  onClick={() => navigate(`/products/${item.product_id}`)}
                  className="text-xs sm:text-sm font-semibold text-gray-900 truncate hover:text-violet-700 cursor-pointer"
                >
                  {item.product.name}
                </h4>

                <div className="flex gap-2 text-[11px] text-gray-500 my-1">
                  {item.selected_color && <span>Color: <strong>{item.selected_color}</strong></span>}
                  {item.selected_size && <span>• Size: <strong>{item.selected_size}</strong></span>}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm sm:text-base font-extrabold text-gray-950">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  {/* Quantity Modifier */}
                  <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-xl">
                    <button
                      onClick={() => updateCartQuantity(item.product_id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product_id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product_id)}
                className="text-gray-300 hover:text-red-500 p-2 rounded-lg transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm h-fit space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Order Summary</h3>

          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items Total ({totalItems})</span>
              <span>₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Festival Savings (5%)</span>
                <span>- ₹{cart.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {cart.delivery_fee === 0 ? (
                  <strong className="text-emerald-600 uppercase">FREE</strong>
                ) : (
                  `₹${cart.delivery_fee}`
                )}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-950">
              <span>Grand Total</span>
              <span className="text-violet-700">₹{cart.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-violet-50/70 border border-violet-100 rounded-2xl flex items-center gap-2 text-violet-900 text-xs">
            <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
            <span>Orders above ₹499 qualify for Free Express Shipping!</span>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Demo Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
