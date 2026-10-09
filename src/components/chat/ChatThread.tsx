import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage, RecommendedProduct } from '../../types/index';
import { ProductCard } from '../products/ProductCard';
import { FeedbackModal } from '../modals/FeedbackModal';
import { useApp } from '../../contexts/AppContext';
import { Sparkles, ArrowUp, ThumbsUp, ThumbsDown, Check, User, Bot, Clock, Tag } from 'lucide-react';

interface ChatThreadProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatThread: React.FC<ChatThreadProps> = ({ messages, onSendMessage, isLoading }) => {
  const { showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [feedbackModalMsgId, setFeedbackModalMsgId] = useState<string | null>(null);
  const [votedMessages, setVotedMessages] = useState<Record<string, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !isLoading) {
        onSendMessage(inputText.trim());
        setInputText('');
      }
    }
  };

  const handleVote = (msgId: string, rating: 'up' | 'down') => {
    setVotedMessages((prev) => ({ ...prev, [msgId]: rating }));
    if (rating === 'up') {
      showToast('Thank you for your positive rating!');
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: msgId, rating: 'thumbs_up' }),
      }).catch(() => {});
    } else {
      setFeedbackModalMsgId(msgId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user' || msg.sender === 'user';
          const msgText = msg.content || msg.text || '';
          const hasProducts = msg.products && msg.products.length > 0;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div className={`space-y-3 max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Text Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-violet-600 text-white rounded-tr-xs shadow-xs font-normal'
                      : 'bg-white text-gray-900 border border-gray-200/80 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Basic Markdown Rendering */}
                  {renderFormattedText(msgText)}
                </div>

                {/* Interactive Product Cards Grid */}
                {hasProducts && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
                      <Tag className="w-3.5 h-3.5 text-violet-600" />
                      <span>Recommended Products ({msg.products!.length})</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-3 pt-1 custom-scrollbar">
                      {msg.products!.map((prod) => (
                        <ProductCard key={prod.id} product={prod} layout="chat" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant Metadata & Feedback Bar */}
                {!isUser && (
                  <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono text-[10px]">
                        {msg.model || 'BharatShop AI'}
                      </span>
                      {msg.latency_ms !== undefined && msg.latency_ms > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {msg.latency_ms}ms
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleVote(msg.id, 'up')}
                        className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                          votedMessages[msg.id] === 'up' ? 'text-violet-600 font-bold' : 'text-gray-400'
                        }`}
                        title="Good response"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVote(msg.id, 'down')}
                        className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                          votedMessages[msg.id] === 'down' ? 'text-rose-600 font-bold' : 'text-gray-400'
                        }`}
                        title="Report issue or poor response"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-4xl mx-auto justify-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-2xl rounded-tl-xs shadow-xs text-xs text-gray-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]" />
              <span>Analyzing catalog & specs...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Follow-up Action Suggestion Pills */}
      {messages.length > 0 && !isLoading && (
        <div className="px-4 py-1.5 flex gap-2 overflow-x-auto custom-scrollbar border-t border-gray-100 bg-white/70">
          {[
            'Hindi mein samjhao',
            'Battery aur camera mein best kaunsa hai?',
            'Compare first and second',
            'Add the first one to cart',
            'Return policy kya hai?',
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(suggestion)}
              className="text-[11px] font-medium text-gray-700 bg-gray-100 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 border border-transparent px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Composer */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
        <div className="max-w-4xl mx-auto bg-[#FBFBFE] border border-gray-200/90 rounded-2xl p-2.5 shadow-sm focus-within:ring-2 focus-within:ring-violet-300 focus-within:border-violet-400 transition-all flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your follow-up inquiry... (Shift+Enter for newline)"
            className="flex-1 text-xs sm:text-sm bg-transparent border-none outline-hidden resize-none max-h-32 text-gray-800 placeholder-gray-400 py-1 px-2"
          />

          <button
            type="button"
            onClick={() => {
              if (inputText.trim() && !isLoading) {
                onSendMessage(inputText.trim());
                setInputText('');
              }
            }}
            disabled={!inputText.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
              inputText.trim() && !isLoading
                ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-xs'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feedback Dialog */}
      {feedbackModalMsgId && (
        <FeedbackModal
          messageId={feedbackModalMsgId}
          isOpen={Boolean(feedbackModalMsgId)}
          onClose={() => setFeedbackModalMsgId(null)}
        />
      )}
    </div>
  );
};

// Lightweight markdown formatter for headings and bold tokens
function renderFormattedText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('### ')) {
      return (
        <h4 key={i} className="font-bold text-sm sm:text-base text-gray-950 mt-2 mb-1">
          {line.replace('### ', '')}
        </h4>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="font-extrabold text-base text-gray-950 mt-2 mb-1">
          {line.replace('## ', '')}
        </h3>
      );
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <li key={i} className="ml-4 list-disc text-xs sm:text-sm my-0.5">
          {formatInline(line.substring(2))}
        </li>
      );
    }
    return (
      <p key={i} className="my-1 text-xs sm:text-sm leading-relaxed">
        {formatInline(line)}
      </p>
    );
  });
}

function formatInline(str: string) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-gray-950">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
