import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../mockData';

interface LibraryViewProps {
  onUsePrompt: (promptText: string) => void;
  onBackToChat: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onUsePrompt, onBackToChat }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Product', 'Creative', 'Legal', 'Engineering', 'Strategy'];

  const filteredTemplates = filter === 'All'
    ? PROMPT_TEMPLATES
    : PROMPT_TEMPLATES.filter((t) => t.category === filter);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-2 max-w-4xl mx-auto w-full animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Prompt & Knowledge Library</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Your personal vault of tested prompts, structured guidelines, and system macros.
          </p>
        </div>
        <button
          onClick={onBackToChat}
          className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
        >
          <i className="ph ph-chat-circle"></i>
          <span>Return to Chat</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === c
                ? 'bg-[#18181B] text-white shadow-2xs'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-violet-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className={`ph ${tpl.icon} text-violet-600 text-lg`}></i>
                  <span className="text-xs font-bold text-gray-900">{tpl.title}</span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
                  {tpl.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{tpl.description}</p>
              <div className="p-2.5 bg-gray-50 rounded-lg text-[11px] font-mono text-gray-600 border border-gray-100 mb-3 line-clamp-2">
                {tpl.prompt}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(tpl.prompt);
                  alert('Prompt copied to clipboard!');
                }}
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-800 rounded hover:bg-gray-100 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={() => onUsePrompt(tpl.prompt)}
                className="px-3 py-1 text-xs font-medium bg-[#18181B] hover:bg-black text-white rounded-lg shadow-2xs transition-all"
              >
                Run Prompt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
