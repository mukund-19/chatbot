import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { api } from '../lib/api';
import { SupportTicket } from '../types/index';
import { Headphones, Send, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { userProfile, showToast } = useApp();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [category, setCategory] = useState('Order Delivery');
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      try {
        const res = await api.getSupportTickets(userProfile.user_id);
        setTickets(res.tickets || []);
      } catch {
        showToast('Error loading support tickets');
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, [userProfile.user_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.createSupportTicket({
        category,
        summary: summary.trim(),
        priority,
        language: userProfile.preferred_language,
        userId: userProfile.user_id,
      });
      setTickets((prev) => [res.ticket, ...prev]);
      setSummary('');
      showToast(`Support Ticket ${res.ticket.ticket_number} created successfully!`);
    } catch {
      showToast('Error creating ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto animate-in fade-in duration-200">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Customer Support & Escalations</h2>
        <p className="text-xs text-gray-500">Human support assistance, return inquiries, and ticket resolution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submit Ticket Form */}
        <div className="lg:col-span-1 bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs h-fit space-y-4">
          <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
            <Headphones className="w-4 h-4" />
            <span>Open Support Ticket</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden"
              >
                <option value="Order Delivery">Order Delivery Status</option>
                <option value="Return / Refund">Return or Refund Request</option>
                <option value="Payment / COD">Payment or COD Issue</option>
                <option value="Damaged Product">Damaged / Wrong Item Received</option>
                <option value="General Assistance">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden"
              >
                <option value="low">Low (General guidance)</option>
                <option value="medium">Medium (Standard 24h)</option>
                <option value="high">High (Dispatch urgency)</option>
                <option value="urgent">Urgent (Immediate review)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Explain the Issue</label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe your issue or mention your order ID..."
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !summary.trim()}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Support Request'}</span>
            </button>
          </form>
        </div>

        {/* Existing Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Recent Support Tickets</h3>

          {loading ? (
            <div className="text-center py-10 text-xs text-gray-400">Loading support tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-800">No open complaints or support tickets.</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Everything is smooth!</p>
            </div>
          ) : (
            tickets.map((tkt) => (
              <div
                key={tkt.id}
                className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                      {tkt.ticket_number}
                    </span>
                    <span className="text-xs font-bold text-gray-800">{tkt.category}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      tkt.status === 'resolved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {tkt.status}
                  </span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{tkt.summary}</p>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <span>Priority: <strong className="capitalize text-gray-600">{tkt.priority}</strong></span>
                  <span>Created {new Date(tkt.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
