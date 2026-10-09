import React, { useState, useRef, useEffect } from 'react';
import { ModelOption } from '../types';
import { MODEL_OPTIONS } from '../mockData';

interface HeaderProps {
  selectedModel: ModelOption;
  onSelectModel: (m: ModelOption) => void;
  onExport: () => void;
  onUpgrade: () => void;
  onShare: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedModel,
  onSelectModel,
  onExport,
  onUpgrade,
  onShare,
  onOpenSettings,
}) => {
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="flex items-center justify-between w-full select-none z-20 relative">
      {/* Model Selector Pill */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/90 hover:border-gray-300 bg-white shadow-2xs transition-all cursor-pointer active:scale-95"
        >
          <div className="w-4 h-4 rounded bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center text-[10px]">
            <i className="ph-bold ph-sparkle"></i>
          </div>
          <span className="text-xs font-semibold text-gray-700">{selectedModel.name}</span>
          <i className={`ph ph-caret-down text-[10px] text-gray-400 transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`}></i>
        </button>

        {/* Model dropdown menu */}
        {modelDropdownOpen && (
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-3 py-2 border-b border-gray-100 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Select Intelligence Tier
            </div>
            {MODEL_OPTIONS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onSelectModel(model);
                  setModelDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 hover:bg-violet-50/60 transition-colors cursor-pointer ${
                  selectedModel.id === model.id ? 'bg-violet-50/80' : ''
                }`}
              >
                <div className="w-5 h-5 rounded-md bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center text-xs mt-0.5 shrink-0">
                  <i className="ph-bold ph-sparkle"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{model.name}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{model.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2">
        {/* Overflow Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            title="More actions"
          >
            <i className="ph ph-dots-three text-lg"></i>
          </button>
          {menuDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200/80 py-1 z-50 text-xs">
              <button
                onClick={() => {
                  onOpenSettings();
                  setMenuDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <i className="ph ph-gear text-sm text-gray-400"></i>
                Workspace Settings
              </button>
              <button
                onClick={() => {
                  window.open('https://discord.com', '_blank');
                  setMenuDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <i className="ph ph-discord-logo text-sm text-gray-400"></i>
                Join Community
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button
                onClick={() => {
                  alert('Keyboard Shortcuts:\n• ⌘K : Quick Command / Search\n• ⌘Enter : Send message\n• Esc : Dismiss modals');
                  setMenuDropdownOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <i className="ph ph-command text-sm text-gray-400"></i>
                Shortcuts
              </button>
            </div>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
          title="Share chat link"
        >
          <i className="ph ph-link-simple text-base"></i>
        </button>

        {/* Export Chat Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200/90 rounded-lg hover:bg-gray-50 transition-all shadow-2xs cursor-pointer active:scale-95"
        >
          <i className="ph ph-tray-arrow-down text-sm text-gray-500"></i>
          <span>Export chat</span>
        </button>

        {/* Upgrade Button */}
        <button
          onClick={onUpgrade}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-[#18181B] hover:bg-black rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
        >
          Upgrade
        </button>
      </div>
    </header>
  );
};
