import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, CheckCircle, ShieldAlert, Truck, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutModal: React.FC = () => {
  const { cart, clearCart, isCheckoutModalOpen, setIsCheckoutModalOpen, userProfile, setLastOrder, showToast } = useApp();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Card'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  if (!isCheckoutModalOpen) return null;

  const handlePlaceDemoOrder = async () => {
    if (cart.items.length === 0) return;
    setIsSubmitting(true);

    const randNum = Math.floor(10028 + Math.random() * 900);
    const orderNumber = `ORD-${randNum}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      user_id: userProfile.user_id,
      order_number: orderNumber,
      order_date: new Date().toISOString(),
      status: 'confirmed' as const,
      total_amount: cart.total,
      payment_method: paymentMethod === 'UPI' ? 'UPI (PhonePe / GPay)' : paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'RuPay Card',
      courier: 'Delhivery Express',
      tracking_number: `DEL-IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      shipping_address: {
        name: userProfile.full_name,
        street: 'Flat 402, Sai Residency, MG Road',
        city: userProfile.city || 'Indore',
        state: userProfile.state || 'Madhya Pradesh',
        pincode: '452001',
        phone: '+91 98260 12345',
      },
      estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      last_update: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: Order confirmed by merchant. Preparing for packaging.`,
      items: cart.items.map((item) => ({
        id: `oi-${Date.now()}-${item.product_id}`,
        product_id: item.product_id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      // Create order via API or database
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      }).catch(() => null);

      await clearCart();
      setLastOrder(newOrder);
      setOrderConfirmed(newOrder);
      showToast(`Order ${orderNumber} placed successfully!`);
    } catch {
      await clearCart();
      setLastOrder(newOrder);
      setOrderConfirmed(newOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setOrderConfirmed(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FCFBFE]">
          <h3 className="text-lg font-bold text-gray-900">
            {orderConfirmed ? 'Order Confirmed 🎉' : 'Demo Checkout'}
          </h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-950">Thank you for your demo order!</h4>
              <p className="text-sm text-gray-500 mt-1">
                Order Number: <strong className="text-violet-700 font-mono">{orderConfirmed.order_number}</strong>
              </p>
            </div>

            <div className="bg-violet-50/70 p-4 rounded-2xl border border-violet-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-semibold text-gray-800">{orderConfirmed.estimated_delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Courier Partner:</span>
                <span className="font-semibold text-gray-800">{orderConfirmed.courier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Code:</span>
                <span className="font-mono text-gray-800">{orderConfirmed.tracking_number}</span>
              </div>
              <div className="flex justify-between border-t border-violet-200/60 pt-2 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-violet-900">₹{orderConfirmed.total_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  handleClose();
                  navigate('/orders');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-xs"
              >
                Track in Orders
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
            {/* Academic & Demonstration notice */}
            <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Demo Environment Only</strong>
                <p className="mt-0.5 text-amber-800">
                  No real payment or financial credentials will be collected. This is a functional e-commerce prototype for BharatShop AI.
                </p>
              </div>
            </div>

            {/* Shipping Address Summary */}
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-xs">
              <span className="text-gray-400 font-semibold uppercase tracking-wider block mb-1">Delivering to</span>
              <p className="font-bold text-gray-900">{userProfile.full_name}</p>
              <p className="text-gray-600">Flat 402, Sai Residency, MG Road, {userProfile.city || 'Indore'}, {userProfile.state || 'MP'} - 452001</p>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-violet-600 bg-violet-50/70 text-violet-900 font-bold ring-2 ring-violet-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-violet-600" />
                  <span className="text-xs">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-violet-600 bg-violet-50/70 text-violet-900 font-bold ring-2 ring-violet-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-violet-600 bg-violet-50/70 text-violet-900 font-bold ring-2 ring-violet-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span className="text-xs">RuPay / Card</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{cart.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Festival Discount (5%)</span>
                  <span>- ₹{cart.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{cart.delivery_fee === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `₹${cart.delivery_fee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-950 pt-2 border-t border-gray-100">
                <span>Order Total</span>
                <span className="text-violet-700">₹{cart.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="button"
              disabled={isSubmitting || cart.items.length === 0}
              onClick={handlePlaceDemoOrder}
              className="w-full py-3.5 px-4 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Demo Order...</span>
              ) : (
                <span>Confirm & Place Demo Order (₹{cart.total.toLocaleString('en-IN')})</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
