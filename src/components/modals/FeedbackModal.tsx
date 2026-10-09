import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useApp } from '../../contexts/AppContext';
import { X, ThumbsDown, Send } from 'lucide-react';

interface FeedbackModalProps {
  messageId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ messageId, isOpen, onClose }) => {
  const { showToast, userProfile } = useApp();
  const [reason, setReason] = useState<'Incorrect' | 'Not useful' | 'Too long' | 'Wrong product' | 'Wrong language' | 'Other'>('Not useful');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.submitFeedback({
        message_id: messageId,
        user_id: userProfile.user_id,
        rating: 'thumbs_down',
        reason,
        comment,
      });
      showToast('Thank you! Your feedback helps train BharatShop AI.');
      onClose();
    } catch {
      showToast('Feedback noted');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <ThumbsDown className="w-5 h-5" />
            <span>Provide Response Feedback</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          What went wrong with this assistant answer? Your report helps our model engineering team improve vernacular grounding.
        </p>

        <div className="space-y-2 mb-4">
          {(['Incorrect', 'Not useful', 'Too long', 'Wrong product', 'Wrong language', 'Other'] as const).map((r) => (
            <label
              key={r}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                reason === r ? 'border-violet-600 bg-violet-50 text-violet-950 font-semibold' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="feedback_reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="text-violet-600 focus:ring-violet-500"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>

        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Additional comments (optional)..."
          className="w-full text-xs p-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-violet-200 focus:outline-hidden"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};
