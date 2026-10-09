// ============================================================================
// BharatShop AI: Frontend API Service Layer
// ============================================================================

import {
  Product,
  RecommendedProduct,
  Cart,
  WishlistItem,
  Order,
  SupportTicket,
  KnowledgeDocument,
  UserProfile,
  AnalyticsSummary,
  FeedbackSubmission,
  ChatSession,
} from '../types/index';

const BASE_URL = '/api';

export const api = {
  // 1. Chat
  async sendChatMessage(payload: {
    sessionId: string;
    message: string;
    language?: string;
    personalizationEnabled?: boolean;
    userId?: string;
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
    lastProductIds?: string[];
  }): Promise<{
    text: string;
    language: string;
    intent: string;
    products?: RecommendedProduct[];
    toolCalls?: any[];
    provider: string;
    model: string;
    latencyMs: number;
    sessionId: string;
  }> {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error: ${res.status}`);
    }
    return res.json();
  },

  // 2. Products
  async getProducts(params?: Record<string, string | number | boolean>): Promise<{ count: number; products: Product[] }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') query.append(k, String(v));
      });
    }
    const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
    return res.json();
  },

  async getProductById(id: string): Promise<{ product: Product }> {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async createProduct(product: Partial<Product>): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  // 3. Cart
  async getCart(userId?: string): Promise<{ cart: Cart }> {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${BASE_URL}/cart${query}`);
    return res.json();
  },

  async addToCart(productId: string, quantity = 1, color?: string, size?: string, userId?: string): Promise<{ success: boolean; cart: Cart }> {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, color, size, userId }),
    });
    return res.json();
  },

  async updateCartQuantity(productId: string, quantity: number, userId?: string): Promise<{ success: boolean; cart: Cart }> {
    const res = await fetch(`${BASE_URL}/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, userId }),
    });
    return res.json();
  },

  async removeFromCart(productId: string, userId?: string): Promise<{ success: boolean; cart: Cart }> {
    const res = await fetch(`${BASE_URL}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId }),
    });
    return res.json();
  },

  async clearCart(userId?: string): Promise<{ success: boolean; cart: Cart }> {
    const res = await fetch(`${BASE_URL}/cart/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return res.json();
  },

  // 4. Wishlist
  async getWishlist(userId?: string): Promise<{ count: number; items: WishlistItem[] }> {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${BASE_URL}/wishlist${query}`);
    return res.json();
  },

  async toggleWishlist(productId: string, userId?: string): Promise<{ success: boolean; added: boolean; wishlist: WishlistItem[] }> {
    const res = await fetch(`${BASE_URL}/wishlist/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId }),
    });
    return res.json();
  },

  // 5. Orders
  async getOrders(userId?: string): Promise<{ count: number; orders: Order[] }> {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${BASE_URL}/orders${query}`);
    return res.json();
  },

  async trackOrder(orderNumber: string): Promise<{ order: Order }> {
    const res = await fetch(`${BASE_URL}/orders/track/${encodeURIComponent(orderNumber)}`);
    if (!res.ok) throw new Error('Order not found');
    return res.json();
  },

  // 6. Policies & Knowledge
  async getPolicies(type?: string, language?: string): Promise<{ count: number; documents: KnowledgeDocument[] }> {
    const query = new URLSearchParams();
    if (type) query.append('type', type);
    if (language) query.append('language', language);
    const res = await fetch(`${BASE_URL}/policies?${query.toString()}`);
    return res.json();
  },

  async createPolicy(doc: Partial<KnowledgeDocument>): Promise<{ success: boolean; document: KnowledgeDocument }> {
    const res = await fetch(`${BASE_URL}/policies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    return res.json();
  },

  // 7. Support
  async getSupportTickets(userId?: string): Promise<{ count: number; tickets: SupportTicket[] }> {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${BASE_URL}/support${query}`);
    return res.json();
  },

  async createSupportTicket(ticket: { category: string; summary: string; priority?: string; language?: string; userId?: string }): Promise<{ success: boolean; ticket: SupportTicket }> {
    const res = await fetch(`${BASE_URL}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    return res.json();
  },

  // 8. Analytics & Model
  async getAnalytics(): Promise<AnalyticsSummary> {
    const res = await fetch(`${BASE_URL}/analytics`);
    return res.json();
  },

  async getModelConfig(): Promise<any> {
    const res = await fetch(`${BASE_URL}/model`);
    return res.json();
  },

  // 9. Profile & Churn
  async getProfile(userId: string): Promise<{ profile: UserProfile }> {
    const res = await fetch(`${BASE_URL}/profile/${userId}`);
    return res.json();
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<{ success: boolean; profile: UserProfile }> {
    const res = await fetch(`${BASE_URL}/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async getChurnScore(userId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/churn/${userId}`);
    return res.json();
  },

  // 10. Feedback
  async submitFeedback(fb: FeedbackSubmission): Promise<{ success: boolean; feedback: FeedbackSubmission }> {
    const res = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fb),
    });
    return res.json();
  },

  async getFeedbackList(): Promise<{ count: number; feedback: FeedbackSubmission[] }> {
    const res = await fetch(`${BASE_URL}/feedback`);
    return res.json();
  },

  // 11. Sessions
  async getSessions(): Promise<{ count: number; sessions: ChatSession[] }> {
    const res = await fetch(`${BASE_URL}/sessions`);
    return res.json();
  },

  async saveSession(session: ChatSession): Promise<{ success: boolean; session: ChatSession }> {
    const res = await fetch(`${BASE_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
    return res.json();
  },

  async deleteSession(sessionId: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  async clearAllSessions(): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/sessions/clear`, {
      method: 'POST',
    });
    return res.json();
  },
};
