import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  activeNavTab: 'chat' | 'explore' | 'library' | 'files' | 'history';
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onSelectNavTab: (tab: 'chat' | 'explore' | 'library' | 'files' | 'history') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSettings: () => void;
  onDeleteChat: (id: string, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chatSessions,
  activeChatId,
  activeNavTab,
  onSelectChat,
  onNewChat,
  onSelectNavTab,
  isCollapsed,
  onToggleCollapse,
  searchQuery,
  onSearchChange,
  onOpenSettings,
  onDeleteChat,
}) => {
  // Filter sessions based on search
  const filtered = chatSessions.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const todaySessions = filtered.filter(c => c.timeGroup === 'Today');
  const yesterdaySessions = filtered.filter(c => c.timeGroup === 'Yesterday');
  const weekSessions = filtered.filter(c => c.timeGroup === '7 days');

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-[#F6F5F8] border-r border-gray-200/70 flex flex-col items-center justify-between py-4 px-2 flex-shrink-0 select-none transition-all duration-300">
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold shadow-xs hover:bg-violet-200 transition-colors"
          >
            <i className="ph-bold ph-sparkle text-lg"></i>
          </button>
          <button
            onClick={onNewChat}
            title="New chat"
            className="w-10 h-10 bg-[#18181B] hover:bg-black text-white rounded-xl flex items-center justify-center shadow-xs transition-all"
          >
            <i className="ph-bold ph-plus text-sm"></i>
          </button>
          <div className="w-8 h-px bg-gray-200 my-1"></div>
          <button
            onClick={() => onSelectNavTab('explore')}
            title="Explore"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeNavTab === 'explore' ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-200/60'}`}
          >
            <i className="ph ph-globe text-lg"></i>
          </button>
          <button
            onClick={() => onSelectNavTab('library')}
            title="Library"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeNavTab === 'library' ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-200/60'}`}
          >
            <i className="ph ph-books text-lg"></i>
          </button>
          <button
            onClick={() => onSelectNavTab('files')}
            title="Files"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeNavTab === 'files' ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-200/60'}`}
          >
            <i className="ph ph-tray text-lg"></i>
          </button>
          <button
            onClick={() => onSelectNavTab('history')}
            title="History"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeNavTab === 'history' ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-200/60'}`}
          >
            <i className="ph ph-clock-counter-clockwise text-lg"></i>
          </button>
        </div>
        <button
          onClick={onOpenSettings}
          title="Emerson Sterling - Profile & Settings"
          className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-violet-400 transition-all"
        >
          <img
            alt="Emerson Sterling"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOMenYConi2BiT16i6_kFfBhMgGKhCoZS-gubl3UDsVKJw59bmjDuiJY07gSUBMgcgm7uGkkwV_TAVmOsX2OqoGtc27pQyqepD2Jb-DrJG9A8VY_bpxmk1BC3fryWY5ephwGZztOdOqp8EMq2yoSOj4NCJMN7_kxraZEAmeampZZJGeMVdbaE7cSD4m-x3BGf8LR6tzLlNJ6M3-sFEiVUgARG1Y79_glRmtbOQCI"
          />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-[#F6F5F8] border-r border-gray-200/70 flex flex-col justify-between p-4 flex-shrink-0 select-none transition-all duration-300">
      {/* Top Section */}
      <div className="flex flex-col gap-4">
        {/* Logo and Collapse Action */}
        <div className="flex items-center justify-between px-1.5 pt-1">
          <div
            onClick={onNewChat}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shadow-xs">
              <i className="ph-bold ph-sparkle text-base"></i>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Cortex</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-200/40"
            title="Collapse sidebar"
          >
            <i className="ph ph-sidebar-simple text-lg"></i>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full bg-[#18181B] hover:bg-black text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all text-sm group cursor-pointer active:scale-[0.99]"
        >
          <i className="ph-bold ph-plus text-xs group-hover:scale-110 transition-transform"></i>
          <span>New chat</span>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-white/70 border border-gray-200/90 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:bg-white transition-all shadow-2xs"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              <i className="ph ph-x"></i>
            </button>
          ) : (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono bg-gray-100 px-1 py-0.5 rounded border border-gray-200">
              ⌘
            </span>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-0.5 mt-0.5">
          <button
            onClick={() => onSelectNavTab('explore')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
              activeNavTab === 'explore'
                ? 'bg-violet-100/80 text-violet-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <i className={`ph ph-globe text-base ${activeNavTab === 'explore' ? 'text-violet-600' : 'text-gray-500'}`}></i>
            <span>Explore</span>
          </button>
          <button
            onClick={() => onSelectNavTab('library')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
              activeNavTab === 'library'
                ? 'bg-violet-100/80 text-violet-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <i className={`ph ph-books text-base ${activeNavTab === 'library' ? 'text-violet-600' : 'text-gray-500'}`}></i>
            <span>Library</span>
          </button>
          <button
            onClick={() => onSelectNavTab('files')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
              activeNavTab === 'files'
                ? 'bg-violet-100/80 text-violet-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <i className={`ph ph-tray text-base ${activeNavTab === 'files' ? 'text-violet-600' : 'text-gray-500'}`}></i>
            <span>Files</span>
          </button>
          <button
            onClick={() => onSelectNavTab('history')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
              activeNavTab === 'history'
                ? 'bg-violet-100/80 text-violet-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <i className={`ph ph-clock-counter-clockwise text-base ${activeNavTab === 'history' ? 'text-violet-600' : 'text-gray-500'}`}></i>
            <span>History</span>
          </button>
        </nav>

        {/* Chat History Feeds */}
        <div className="overflow-y-auto max-h-[calc(100vh-450px)] custom-scrollbar pr-1 space-y-4 text-xs">
          {/* Today */}
          {todaySessions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
                Today
              </div>
              <div className="space-y-0.5">
                {todaySessions.map((chat) => {
                  const isActive = activeNavTab === 'chat' && activeChatId === chat.id;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`group relative flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-violet-100 text-violet-900 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="truncate pr-4">{chat.title}</span>
                      <button
                        onClick={(e) => onDeleteChat(chat.id, e)}
                        title="Delete chat"
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 text-gray-400 p-0.5 transition-opacity"
                      >
                        <i className="ph ph-trash text-xs"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {yesterdaySessions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
                Yesterday
              </div>
              <div className="space-y-0.5">
                {yesterdaySessions.map((chat) => {
                  const isActive = activeNavTab === 'chat' && activeChatId === chat.id;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`group relative flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-violet-100 text-violet-900 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="truncate pr-4">{chat.title}</span>
                      <button
                        onClick={(e) => onDeleteChat(chat.id, e)}
                        title="Delete chat"
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 text-gray-400 p-0.5 transition-opacity"
                      >
                        <i className="ph ph-trash text-xs"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 7 Days */}
          {weekSessions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
                7 days
              </div>
              <div className="space-y-0.5">
                {weekSessions.map((chat) => {
                  const isActive = activeNavTab === 'chat' && activeChatId === chat.id;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`group relative flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-violet-100 text-violet-900 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="truncate pr-4">{chat.title}</span>
                      <button
                        onClick={(e) => onDeleteChat(chat.id, e)}
                        title="Delete chat"
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 text-gray-400 p-0.5 transition-opacity"
                      >
                        <i className="ph ph-trash text-xs"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="px-3 py-4 text-center text-gray-400">
              No matching chats found
            </div>
          )}
        </div>
      </div>

      {/* User Profile Card */}
      <div
        onClick={onOpenSettings}
        className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between px-2 bg-white/70 py-2 rounded-xl shadow-2xs border border-gray-200/60 hover:bg-white hover:border-gray-300 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            alt="Emerson Sterling"
            className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOMenYConi2BiT16i6_kFfBhMgGKhCoZS-gubl3UDsVKJw59bmjDuiJY07gSUBMgcgm7uGkkwV_TAVmOsX2OqoGtc27pQyqepD2Jb-DrJG9A8VY_bpxmk1BC3fryWY5ephwGZztOdOqp8EMq2yoSOj4NCJMN7_kxraZEAmeampZZJGeMVdbaE7cSD4m-x3BGf8LR6tzLlNJ6M3-sFEiVUgARG1Y79_glRmtbOQCI"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-gray-800 truncate leading-tight">
              Emerson Sterling
            </span>
            <span className="text-[10px] text-gray-400 truncate">
              sterlingr@gmail.com
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenSettings();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          title="Account Settings"
        >
          <i className="ph ph-sign-out text-base"></i>
        </button>
      </div>
    </aside>
  );
};
