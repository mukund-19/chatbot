import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { AnalyticsSummary } from '../types/index';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Search,
  ShoppingCart,
  Heart,
  Package,
  Headphones,
  Zap,
  Activity,
  ThumbsUp,
  Percent,
  Clock,
  Layers,
  Database,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await api.getAnalytics();
        setData(stats);
      } catch (err) {
        console.warn('Failed to load live analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-center text-xs text-gray-400">Loading intelligence console telemetry...</div>;
  }

  const kpis = [
    { label: 'Total Chats', value: data.totalChats, icon: MessageSquare, color: 'text-violet-600 bg-violet-50' },
    { label: 'Active Shoppers', value: data.activeUsers, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Catalog Searches', value: data.productSearches, icon: Search, color: 'text-amber-600 bg-amber-50' },
    { label: 'Recommendation Clicks', value: data.recommendationClicks, icon: Zap, color: 'text-purple-600 bg-purple-50' },
    { label: 'Add-to-Cart Rate', value: `${data.addToCartRate}%`, icon: ShoppingCart, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Wishlist Rate', value: `${data.wishlistRate}%`, icon: Heart, color: 'text-rose-600 bg-rose-50' },
    { label: 'Order Lookups', value: data.orderLookups, icon: Package, color: 'text-sky-600 bg-sky-50' },
    { label: 'Support Escalations', value: data.escalations, icon: Headphones, color: 'text-orange-600 bg-orange-50' },
    { label: 'AI Fallback Rate', value: `${data.fallbackRate}%`, icon: Activity, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Average Latency', value: `${data.averageLatencyMs} ms`, icon: Clock, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Positive Feedback', value: `${data.positiveFeedbackScore}%`, icon: ThumbsUp, color: 'text-teal-600 bg-teal-50' },
    { label: 'AI Error Incidents', value: data.aiFailures, icon: Percent, color: 'text-red-600 bg-red-50' },
  ];

  const adminTabs = [
    { label: 'Analytics Console', path: '/admin', active: true },
    { label: 'Catalog Management', path: '/admin/products' },
    { label: 'Orders Fulfillment', path: '/admin/orders' },
    { label: 'Knowledge & RAG Policies', path: '/admin/knowledge' },
    { label: 'AI & Churn Model Health', path: '/admin/model' },
    { label: 'User Feedback Logs', path: '/admin/feedback' },
  ];

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-violet-600" />
            <span>BharatShop AI Intelligence Console</span>
          </h2>
          <p className="text-xs text-gray-500">Live system telemetry, vernacular adoption, and recommendation conversion metrics</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Real Database Telemetry (Live Grounded)</span>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200/80 custom-scrollbar">
        {adminTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              tab.active
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3.5"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                  {kpi.label}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-gray-950 truncate block">
                  {kpi.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Distribution Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Language Distribution */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-600" />
            <span>Vernacular Language Adoption</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(data.languageDistribution).map(([lang, count]) => {
              const total = Object.values(data.languageDistribution).reduce((a, b) => a + b, 0) || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={lang} className="text-xs">
                  <div className="flex justify-between text-gray-700 mb-1">
                    <span className="capitalize font-semibold">{lang}</span>
                    <span className="text-gray-400">{count} queries ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Intent Distribution */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>User Intent Classification</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(data.intentDistribution).map(([intent, count]) => {
              const total = Object.values(data.intentDistribution).reduce((a, b) => a + b, 0) || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={intent} className="text-xs">
                  <div className="flex justify-between text-gray-700 mb-1">
                    <span className="font-semibold capitalize">{intent.replace('_', ' ')}</span>
                    <span className="text-gray-400">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Demanded Categories */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            <span>Top Categories Catalogued</span>
          </h4>
          <div className="space-y-2">
            {data.topCategories.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 text-xs">
                <span className="font-semibold text-gray-800">{cat.category}</span>
                <span className="font-bold text-violet-700 bg-violet-100/70 px-2 py-0.5 rounded-md">{cat.count} items</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
