import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CompareModal } from '../products/CompareModal';
import { CheckoutModal } from '../modals/CheckoutModal';
import {
  Sparkles,
  Plus,
  Search,
  Compass,
  ShoppingCart,
  Heart,
  Package,
  Headphones,
  LayoutDashboard,
  User,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Trash2,
  GitCompare,
  Languages,
} from 'lucide-react';
import { LanguageCode } from '../../types/index';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    userProfile,
    cart,
    wishlist,
    compareList,
    setIsCompareOpen,
    chatSessions,
    activeChatId,
    setActiveChatId,
    createNewChat,
    deleteChat,
    clearAllHistory,
    personalizationEnabled,
    togglePersonalization,
    currentLanguage,
    setCurrentLanguage,
    toastMessage,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');

  const cartItemCount = cart.items.reduce((s, i) => s + i.quantity, 0);

  // Group chat sessions
  const filteredSessions = chatSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(historySearch.toLowerCase()) ||
      s.messages.some((m) => (m.text || m.content || '').toLowerCase().includes(historySearch.toLowerCase()))
  );

  const todaySessions = filteredSessions.filter((s) => s.timeGroup === 'Today' || !s.timeGroup);
  const yesterdaySessions = filteredSessions.filter((s) => s.timeGroup === 'Yesterday');
  const olderSessions = filteredSessions.filter((s) => s.timeGroup === '7 days');

  const navItems = [
    { label: 'Explore Catalog', icon: Compass, path: '/products' },
    { label: 'Shopping Cart', icon: ShoppingCart, path: '/cart', badge: cartItemCount },
    { label: 'Wishlist', icon: Heart, path: '/wishlist', badge: wishlist.length },
    { label: 'My Orders', icon: Package, path: '/orders' },
    { label: 'Support & Help', icon: Headphones, path: '/support' },
    { label: 'Admin Hub', icon: LayoutDashboard, path: '/admin' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSelectSession = (id: string) => {
    setActiveChatId(id);
    navigate(`/chat/${id}`);
    setMobileMenuOpen(false);
  };

  const handleStartNewChat = () => {
    createNewChat();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#ECEBF0] text-gray-900 font-sans antialiased">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-gray-950 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10 animate-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Compare Tray Pill if items selected */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md border border-violet-200 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
            <GitCompare className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <strong className="text-gray-900">{compareList.length} items</strong>
            <span className="text-gray-500 block text-[11px]">in comparison tray</span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Left Sidebar (Desktop & Tablet) */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-[#F6F5F8] border-r border-gray-200/80 transition-all duration-300 z-30 select-none ${
          isCollapsed ? 'w-20 p-3' : 'w-72 p-4'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Branding & Collapse Button */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleStartNewChat()}
            >
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-sm font-extrabold text-gray-950 tracking-tight leading-none">BharatShop AI</h1>
                  <span className="text-[10px] font-medium text-violet-600 uppercase tracking-widest">Shopping Concierge</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleStartNewChat}
            className={`w-full mb-3 flex items-center gap-2.5 bg-[#18181B] hover:bg-black text-white rounded-xl py-2.5 px-3.5 text-xs font-semibold shadow-xs transition-all ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Start New Chat"
          >
            <Plus className="w-4 h-4 text-violet-300 shrink-0" />
            {!isCollapsed && <span>New Chat</span>}
          </button>

          {/* Search Chat History (if not collapsed) */}
          {!isCollapsed && (
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full text-xs bg-white/70 border border-gray-200/90 rounded-xl pl-8 pr-3 py-1.5 text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-violet-400 focus:bg-white"
              />
            </div>
          )}

          {/* Main Navigation Links */}
          <nav className="space-y-1 mb-4 border-b border-gray-200/60 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 py-2 px-3 rounded-xl text-xs font-medium transition-colors relative ${
                    isActive
                      ? 'bg-violet-100 text-violet-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-700' : 'text-gray-500'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isCollapsed
                          ? 'absolute top-1 right-1 bg-violet-600 text-white text-[9px] w-4 h-4 flex items-center justify-center p-0'
                          : 'ml-auto bg-violet-600 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Chat History Groupings (Only if not collapsed) */}
          {!isCollapsed && (
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
              {todaySessions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1.5">
                    <span>Today</span>
                  </div>
                  <div className="space-y-0.5">
                    {todaySessions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSession(s.id)}
                        className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          activeChatId === s.id ? 'bg-violet-100/90 text-violet-950 font-semibold' : 'text-gray-700 hover:bg-gray-200/50'
                        }`}
                      >
                        <span className="truncate max-w-[190px]">{s.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteChat(s.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1 rounded transition-opacity"
                          title="Delete chat"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {yesterdaySessions.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1.5">
                    Yesterday
                  </div>
                  <div className="space-y-0.5">
                    {yesterdaySessions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSession(s.id)}
                        className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          activeChatId === s.id ? 'bg-violet-100/90 text-violet-950 font-semibold' : 'text-gray-700 hover:bg-gray-200/50'
                        }`}
                      >
                        <span className="truncate max-w-[190px]">{s.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteChat(s.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {olderSessions.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1.5">
                    7 Days
                  </div>
                  <div className="space-y-0.5">
                    {olderSessions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSession(s.id)}
                        className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          activeChatId === s.id ? 'bg-violet-100/90 text-violet-950 font-semibold' : 'text-gray-700 hover:bg-gray-200/50'
                        }`}
                      >
                        <span className="truncate max-w-[190px]">{s.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteChat(s.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredSessions.length === 0 && (
                <div className="text-center py-6 text-xs text-gray-400">
                  <p>No conversations yet</p>
                  <p className="text-[11px] mt-1 text-gray-500">Ask BharatShop to begin</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Section at Bottom */}
        <div className="border-t border-gray-200/70 pt-3 mt-2">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity flex-1 min-w-0"
              >
                <img
                  src={userProfile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={userProfile.full_name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <div className="truncate">
                  <p className="text-xs font-bold text-gray-900 truncate leading-none">{userProfile.full_name}</p>
                  <span className="text-[10px] text-gray-500 capitalize">{userProfile.role} • {userProfile.city}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/profile')}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60"
                title="Profile & Settings"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                onClick={() => navigate('/profile')}
                src={userProfile.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-violet-400"
              />
            </div>
          )}
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white md:rounded-l-3xl shadow-sm border-l border-gray-200/60">
        {/* Top Header Toolbar */}
        <header className="h-14 border-b border-gray-200/70 px-4 flex items-center justify-between bg-white/95 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {location.pathname.startsWith('/admin') ? 'BharatShop Intelligence Console' : 'BharatShop AI Assistant'}
            </span>
          </div>

          {/* Quick Settings & Navigation in Header */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-gray-100/90 hover:bg-gray-200/80 px-2.5 py-1 rounded-xl text-xs text-gray-700 transition-colors">
              <Languages className="w-3.5 h-3.5 text-violet-700" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="auto">Auto-detect</option>
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="hinglish">Hinglish</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Personalization Memory Toggle */}
            <button
              type="button"
              onClick={togglePersonalization}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                personalizationEnabled
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'bg-gray-100 text-gray-500 border border-gray-200 line-through'
              }`}
              title="Toggle customer preference memory"
            >
              <Sparkles className="w-3 h-3" />
              <span>Memory {personalizationEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Cart Icon Shortcut */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Route View Content Area */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar flex flex-col bg-[#FAF9FC]">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="font-bold text-gray-900">BharatShop AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <button
                onClick={handleStartNewChat}
                className="w-full mb-4 flex items-center justify-center gap-2 bg-gray-950 text-white rounded-xl py-2.5 text-xs font-semibold"
              >
                <Plus className="w-4 h-4 text-violet-300" />
                <span>New Chat</span>
              </button>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-violet-600" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-violet-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-left"
              >
                <img src={userProfile.avatar_url} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-gray-900">{userProfile.full_name}</p>
                  <span className="text-[10px] text-gray-500">{userProfile.email}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <CompareModal />
      <CheckoutModal />
    </div>
  );
};
