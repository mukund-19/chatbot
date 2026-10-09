import React, { useState, useRef, useEffect } from 'react';
import { ChatSession } from '../types';

interface ChatThreadProps {
  chat: ChatSession;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isDeepResearch: boolean;
  setIsDeepResearch: (val: boolean | ((prev: boolean) => boolean)) => void;
  onNewChat: () => void;
  onOpenFileAttach: () => void;
  attachedFiles: string[];
  onRemoveAttachment: (name: string) => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  chat,
  onSendMessage,
  isLoading,
  isDeepResearch,
  setIsDeepResearch,
  onNewChat,
  onOpenFileAttach,
  attachedFiles,
  onRemoveAttachment,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages, isLoading]);

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full overflow-hidden max-w-3xl w-full mx-auto">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-4 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={onNewChat}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <i className="ph ph-arrow-left"></i>
              <span>Back to home</span>
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-xs font-semibold text-gray-700 truncate max-w-sm">
              {chat.title}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
            {chat.messages.length} messages
          </span>
        </div>

        {chat.messages.map((message) => {
          const isBot = message.sender === 'bot';

          return (
            <div
              key={message.id}
              className={`flex gap-3.5 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              {isBot ? (
                <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shadow-2xs shrink-0 mt-0.5">
                  <i className="ph-bold ph-sparkle text-sm"></i>
                </div>
              ) : (
                <img
                  alt="Emerson Sterling"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0 mt-0.5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOMenYConi2BiT16i6_kFfBhMgGKhCoZS-gubl3UDsVKJw59bmjDuiJY07gSUBMgcgm7uGkkwV_TAVmOsX2OqoGtc27pQyqepD2Jb-DrJG9A8VY_bpxmk1BC3fryWY5ephwGZztOdOqp8EMq2yoSOj4NCJMN7_kxraZEAmeampZZJGeMVdbaE7cSD4m-x3BGf8LR6tzLlNJ6M3-sFEiVUgARG1Y79_glRmtbOQCI"
                />
              )}

              {/* Message Content */}
              <div className={`flex flex-col max-w-[85%] ${isBot ? '' : 'items-end'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-800">
                    {isBot ? 'Cortex' : 'Jackson'}
                  </span>
                  <span className="text-[10px] text-gray-400">{message.timestamp}</span>
                  {message.isDeepResearch && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-violet-50 text-violet-700 border border-violet-200 px-1.5 py-0.2 rounded-full">
                      <i className="ph ph-atom text-xs"></i>
                      Deep Research
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isBot
                      ? 'bg-[#FCFBFE] border border-gray-200/80 text-gray-800 shadow-2xs whitespace-pre-line'
                      : 'bg-[#18181B] text-white shadow-2xs'
                  }`}
                >
                  {message.text}
                </div>

                {/* Bot action toolbar */}
                {isBot && (
                  <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-xs">
                    <button
                      onClick={() => copyToClipboard(message.id, message.text)}
                      className="p-1 rounded hover:bg-gray-100 hover:text-gray-700 transition-colors flex items-center gap-1"
                      title="Copy response"
                    >
                      <i className={copiedId === message.id ? 'ph ph-check text-green-600' : 'ph ph-copy'}></i>
                      <span className="text-[11px]">{copiedId === message.id ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => alert('Response bookmarked to Library!')}
                      className="p-1 rounded hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      title="Bookmark to library"
                    >
                      <i className="ph ph-bookmark-simple"></i>
                    </button>
                    <button
                      onClick={() => alert('Thanks for the feedback!')}
                      className="p-1 rounded hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      title="Good response"
                    >
                      <i className="ph ph-thumbs-up"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3.5 items-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shadow-2xs shrink-0">
              <i className="ph-bold ph-sparkle text-sm animate-spin"></i>
            </div>
            <div className="p-4 rounded-2xl bg-[#FCFBFE] border border-gray-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-violet-700">
                <div className="w-2 h-2 rounded-full bg-violet-600 animate-ping"></div>
                <span className="font-medium">
                  {isDeepResearch ? 'Conducting Deep Research & Multi-Angle Synthesis...' : 'Cortex is formulating your response...'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Docked Bottom Input Area */}
      <div className="pt-3 pb-2 border-t border-gray-100">
        <div className="w-full bg-[#FCFBFE] border border-gray-200/90 rounded-2xl p-3.5 shadow-sm focus-within:ring-2 focus-within:ring-violet-200 focus-within:border-[#A78BFA] transition-all">
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {attachedFiles.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-violet-50 text-violet-700 border border-violet-200"
                >
                  <i className="ph ph-file-text"></i>
                  <span className="truncate max-w-[140px]">{f}</span>
                  <button onClick={() => onRemoveAttachment(f)} className="hover:text-red-500">
                    <i className="ph ph-x"></i>
                  </button>
                </span>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up or provide further context..."
            rows={2}
            disabled={isLoading}
            className="w-full bg-transparent border-0 resize-none text-sm text-gray-800 placeholder-gray-400 focus:ring-0 p-0 mb-2 outline-none"
          ></textarea>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDeepResearch((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  isDeepResearch
                    ? 'border border-violet-500 bg-violet-600 text-white'
                    : 'border border-[#C4B5FD] bg-[#EDE9FE]/60 text-[#7C3AED]'
                }`}
              >
                <i className="ph ph-atom text-sm"></i>
                <span>Deeper Research</span>
              </button>
              <button
                type="button"
                onClick={onOpenFileAttach}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <i className="ph ph-paperclip text-base"></i>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() && !isLoading
                  ? 'bg-[#18181B] text-white hover:bg-black cursor-pointer shadow-2xs'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="ph-bold ph-arrow-up text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
