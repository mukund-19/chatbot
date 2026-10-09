import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { FeedbackSubmission } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle } from 'lucide-react';

export const AdminFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'thumbs_up' | 'thumbs_down'>('all');

  useEffect(() => {
    async function load() {
      const res = await api.getFeedbackList();
      setFeedbackList(res.feedback || []);
    }
    load();
  }, []);

  const filtered = feedbackList.filter((f) => (filter === 'all' ? true : f.rating === filter));

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Console</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Shopper Feedback & Model Telemetry</h2>
          <p className="text-xs text-gray-500">Live sentiment telemetry captured from assistant response ratings</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {(['all', 'thumbs_up', 'thumbs_down'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors ${
                filter === mode
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {mode === 'all' ? 'All Feedback' : mode === 'thumbs_up' ? 'Positive 👍' : 'Negative 👎'}
            </button>
          ))}
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-gray-800">No user feedback logged yet</h3>
          <p className="text-xs text-gray-500 mt-1">Rate assistant answers in chat with thumbs up or thumbs down to populate logs.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    fb.rating === 'thumbs_up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {fb.rating === 'thumbs_up' ? <ThumbsUp className="w-4 h-4" /> : <ThumbsDown className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">
                      {fb.rating === 'thumbs_up' ? 'Helpful Recommendation' : `Reported: ${fb.reason || 'Issue'}`}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">ID: {fb.message_id}</span>
                  </div>
                  {fb.comment && <p className="text-xs text-gray-600 mt-0.5 leading-snug">"{fb.comment}"</p>}
                </div>
              </div>

              <span className="text-[11px] text-gray-400 shrink-0">
                {fb.created_at ? new Date(fb.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
