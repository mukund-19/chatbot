import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { api } from '../lib/api';
import { Order } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Truck, Clock, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { userProfile, showToast } = useApp();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackQuery, setTrackQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.getOrders(userProfile.user_id);
        setOrders(res.orders || []);
      } catch {
        showToast('Error loading orders');
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [userProfile.user_id]);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    try {
      const res = await api.trackOrder(trackQuery.trim());
      setSearchedOrder(res.order);
      showToast(`Found tracking for ${res.order.order_number}`);
    } catch {
      showToast(`No order found matching "${trackQuery.trim()}"`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">Delivered</span>;
      case 'shipped':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">In Transit</span>;
      case 'packed':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">Packed</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto animate-in fade-in duration-200">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">My Orders & Tracking</h2>
          <p className="text-xs text-gray-500">Live courier updates and mock Indian delivery telemetry</p>
        </div>

        {/* Quick Tracking Search Form */}
        <form onSubmit={handleTrackSubmit} className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="e.g. ORD-10025"
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              className="text-xs bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 w-48 focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-xs"
          >
            Track
          </button>
        </form>
      </div>

      {/* Searched Order Spotlight if exists */}
      {searchedOrder && (
        <div className="mb-6 p-5 bg-violet-50/80 border border-violet-200 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-violet-200/60 mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700">Tracking Spotlight</span>
              <h3 className="text-base font-extrabold text-gray-950">{searchedOrder.order_number}</h3>
            </div>
            {getStatusBadge(searchedOrder.status)}
          </div>
          <div className="text-xs text-gray-700 space-y-1.5">
            <p><strong>Courier:</strong> {searchedOrder.courier} (Code: <code className="font-mono bg-white px-1.5 py-0.5 rounded border">{searchedOrder.tracking_number}</code>)</p>
            <p><strong>Estimated Arrival:</strong> {searchedOrder.estimated_delivery}</p>
            <p><strong>Live Update:</strong> {searchedOrder.last_update}</p>
          </div>
        </div>
      )}

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-20 text-xs text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-gray-900">No orders found</h3>
          <p className="text-xs text-gray-500 mt-1">Place a demo order from your shopping cart to test tracking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-950">{order.order_number}</h4>
                    <span className="text-[11px] text-gray-400">
                      Placed on {new Date(order.order_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(order.status)}
                  <span className="text-sm font-extrabold text-gray-950">
                    ₹{order.total_amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="divide-y divide-gray-50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center gap-3">
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded-xl border border-gray-100"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{item.product_name}</p>
                      <span className="text-[11px] text-gray-500">Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Telemetry Message */}
              <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 text-xs text-gray-600 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800">{order.courier} ({order.tracking_number})</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">{order.last_update}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/');
                    // Small delay to allow home to mount, then could trigger question
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-violet-200 text-violet-700 bg-violet-50/60 hover:bg-violet-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask AI Assistant about this Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
