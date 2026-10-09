import React, { useState } from 'react';
import { ChatSession } from '../types';

interface HistoryViewProps {
  chatSessions: ChatSession[];
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
  onBackToChat: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  chatSessions,
  onSelectChat,
  onDeleteChat,
  onClearAll,
  onBackToChat,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = chatSessions.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-2 max-w-4xl mx-auto w-full animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Conversation History</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Audit, resume, or export past threads and synthesis outputs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {chatSessions.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <i className="ph ph-trash"></i>
              <span>Clear History</span>
            </button>
          )}
          <button
            onClick={onBackToChat}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
          >
            <i className="ph ph-chat-circle"></i>
            <span>Return to Chat</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter conversation archives by title or text..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 shadow-2xs"
        />
      </div>

      {/* History List */}
      <div className="space-y-2.5">
        {filtered.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-violet-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-start gap-3 min-w-0 pr-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ph ph-chat-text text-base"></i>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-gray-800 group-hover:text-violet-600 transition-colors truncate">
                  {chat.title}
                </h4>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                  <span>{chat.timeGroup}</span>
                  <span>•</span>
                  <span>{chat.messages.length} messages</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChat(chat.id);
                }}
                className="px-2.5 py-1 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors"
              >
                Resume
              </button>
              <button
                onClick={(e) => onDeleteChat(chat.id, e)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete session"
              >
                <i className="ph ph-trash text-sm"></i>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-xs">
            No history sessions match your query.
          </div>
        )}
      </div>
    </div>
  );
};
