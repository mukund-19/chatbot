import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Order } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Search, Truck, CheckCircle2 } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function load() {
      const res = await api.getOrders();
      setOrders(res.orders || []);
    }
    load();
  }, []);

  const filtered = orders.filter((o) => (filter === 'all' ? true : o.status === filter));

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Console</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Orders Fulfillment & Dispatch</h2>
          <p className="text-xs text-gray-500">{orders.length} orders logged across delivery partners</p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'confirmed', 'packed', 'shipped', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors ${
                filter === st ? 'bg-violet-600 text-white shadow-xs' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-200/70 text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Order Code</th>
              <th className="p-3.5">Customer & Destination</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Courier & Tracking</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50/50">
                <td className="p-3.5">
                  <span className="font-mono font-bold text-violet-700">{o.order_number}</span>
                  <span className="block text-[10px] text-gray-400">{new Date(o.order_date).toLocaleDateString('en-IN')}</span>
                </td>
                <td className="p-3.5">
                  <p className="font-semibold text-gray-900">{o.shipping_address?.name || 'Shopper'}</p>
                  <span className="text-[10px] text-gray-500">{o.shipping_address?.city}, {o.shipping_address?.state}</span>
                </td>
                <td className="p-3.5 font-bold text-gray-900">₹{o.total_amount.toLocaleString('en-IN')}</td>
                <td className="p-3.5">
                  <span className="font-medium text-gray-800">{o.courier}</span>
                  <span className="block text-[10px] font-mono text-gray-400">{o.tracking_number}</span>
                </td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 uppercase font-bold text-[10px] bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
