import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Cart, WishlistItem, UserProfile, ChatSession, Order, LanguageCode } from '../types/index';
import { api } from '../lib/api';

interface AppContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfileData: (updates: Partial<UserProfile>) => Promise<void>;
  cart: Cart;
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (val: boolean) => void;
  chatSessions: ChatSession[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => Promise<void>;
  clearAllHistory: () => Promise<void>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  personalizationEnabled: boolean;
  togglePersonalization: () => Promise<void>;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (val: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  refreshData: () => Promise<void>;
}

const defaultProfile: UserProfile = {
  id: 'usr-demo-001',
  user_id: 'usr-demo-001',
  email: 'shopper@bharatshop.ai',
  full_name: 'Jackson Reed',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'shopper',
  preferred_language: 'en',
  city_tier: 'Tier-2',
  city: 'Indore',
  state: 'Madhya Pradesh',
  preferred_categories: ['Mobile Phones', 'Fashion', 'Kitchen'],
  budget_min: 2000,
  budget_max: 35000,
  payment_preference: 'UPI',
  personalization_enabled: true,
  analytics_consent: true,
};

const defaultCart: Cart = {
  id: 'cart-init',
  items: [],
  subtotal: 0,
  discount: 0,
  delivery_fee: 0,
  total: 0,
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('auto');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const refreshData = async () => {
    try {
      const [cRes, wRes, pRes, sRes] = await Promise.all([
        api.getCart(userProfile.user_id),
        api.getWishlist(userProfile.user_id),
        api.getProfile(userProfile.user_id),
        api.getSessions(),
      ]);

      if (cRes.cart) setCart(cRes.cart);
      if (wRes.items) setWishlist(wRes.items);
      if (pRes.profile) {
        setUserProfile(pRes.profile);
        setPersonalizationEnabled(pRes.profile.personalization_enabled);
        setCurrentLanguage(pRes.profile.preferred_language);
      }
      if (sRes.sessions) setChatSessions(sRes.sessions);
    } catch (err) {
      console.warn('Could not sync initial remote data:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateProfileData = async (updates: Partial<UserProfile>) => {
    try {
      const res = await api.updateProfile(userProfile.user_id, updates);
      if (res.profile) {
        setUserProfile(res.profile);
        setPersonalizationEnabled(res.profile.personalization_enabled);
        setCurrentLanguage(res.profile.preferred_language);
        showToast('Profile preferences updated');
      }
    } catch {
      setUserProfile((prev) => ({ ...prev, ...updates }));
      showToast('Profile updated locally');
    }
  };

  const togglePersonalization = async () => {
    const nextVal = !personalizationEnabled;
    setPersonalizationEnabled(nextVal);
    await updateProfileData({ personalization_enabled: nextVal });
    showToast(`Personalization memory ${nextVal ? 'enabled' : 'disabled'}`);
  };

  const addToCart = async (productId: string, quantity = 1, color?: string, size?: string) => {
    try {
      const res = await api.addToCart(productId, quantity, color, size, userProfile.user_id);
      if (res.cart) {
        setCart(res.cart);
        showToast('Item added to cart!');
      }
    } catch (err) {
      showToast('Error adding to cart');
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await api.updateCartQuantity(productId, quantity, userProfile.user_id);
      if (res.cart) setCart(res.cart);
    } catch (err) {
      showToast('Error updating cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.removeFromCart(productId, userProfile.user_id);
      if (res.cart) {
        setCart(res.cart);
        showToast('Item removed from cart');
      }
    } catch (err) {
      showToast('Error removing item');
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.clearCart(userProfile.user_id);
      if (res.cart) {
        setCart(res.cart);
        showToast('Cart cleared');
      }
    } catch (err) {
      showToast('Error clearing cart');
    }
  };

  const toggleWishlist = async (productId: string) => {
    try {
      const res = await api.toggleWishlist(productId, userProfile.user_id);
      if (res.wishlist) {
        setWishlist(res.wishlist);
        showToast(res.added ? 'Added to wishlist ❤️' : 'Removed from wishlist');
      }
    } catch (err) {
      showToast('Error updating wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product_id === productId);
  };

  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      showToast('Already added to comparison');
      setIsCompareOpen(true);
      return;
    }
    if (compareList.length >= 4) {
      showToast('You can compare up to 4 products at a time');
      setIsCompareOpen(true);
      return;
    }
    setCompareList((prev) => [...prev, product]);
    showToast(`Added ${product.brand} to comparison tray`);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  const createNewChat = () => {
    setActiveChatId(null);
  };

  const deleteChat = async (id: string) => {
    try {
      await api.deleteSession(id);
    } catch {}
    setChatSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeChatId === id) setActiveChatId(null);
    showToast('Conversation deleted');
  };

  const clearAllHistory = async () => {
    if (window.confirm('Are you sure you want to delete all conversation history?')) {
      try {
        await api.clearAllSessions();
      } catch {}
      setChatSessions([]);
      setActiveChatId(null);
      showToast('All conversation archives cleared');
    }
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        updateProfileData,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        chatSessions,
        activeChatId,
        setActiveChatId,
        createNewChat,
        deleteChat,
        clearAllHistory,
        toastMessage,
        showToast,
        personalizationEnabled,
        togglePersonalization,
        currentLanguage,
        setCurrentLanguage,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        lastOrder,
        setLastOrder,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
