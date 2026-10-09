// ============================================================================
// BharatShop AI: Core Domain Type Definitions
// ============================================================================

export type LanguageCode =
  | 'auto'
  | 'en'
  | 'hi'
  | 'hinglish'
  | 'pa'
  | 'bn'
  | 'ta'
  | 'te'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'ur';

export interface ProductSpecifications {
  [key: string]: string | number | boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  original_price?: number;
  currency: string;
  rating: number;
  review_count: number;
  stock_qty: number;
  color_options: string[];
  size_options: string[];
  specifications: ProductSpecifications;
  tags: string[];
  image_url: string;
  seller: string;
  delivery_days: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RecommendationExplanation {
  constraint_match: number;
  personalization: number;
  quality: number;
  value: number;
  availability: number;
  delivery_fit: number;
  final_score: number;
  reason?: string;
}

export interface RecommendedProduct extends Product {
  recommendation_score?: number;
  recommendation_explanation?: RecommendationExplanation;
  why_recommended?: string;
  highlights?: string[];
}

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'shopper' | 'admin';
  preferred_language: LanguageCode;
  city_tier: 'Tier-1' | 'Tier-2' | 'Tier-3';
  city: string;
  state: string;
  preferred_categories: string[];
  budget_min: number;
  budget_max: number;
  payment_preference: 'UPI' | 'COD' | 'Card' | 'NetBanking';
  personalization_enabled: boolean;
  analytics_consent: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
}

export interface Cart {
  id: string;
  user_id?: string;
  session_id?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export type OrderStatus =
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  order_date: string;
  status: OrderStatus;
  total_amount: number;
  payment_method: string;
  courier: string;
  tracking_number: string;
  shipping_address: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  estimated_delivery: string;
  last_update: string;
  items: OrderItem[];
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  user_id?: string;
  session_id?: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  language: string;
  summary: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface KnowledgeDocument {
  id: string;
  type:
    | 'return_policy'
    | 'exchange_policy'
    | 'cancellation_policy'
    | 'delivery_policy'
    | 'warranty'
    | 'payment_faq'
    | 'cod_info'
    | 'general_faq';
  title: string;
  content: string;
  language: string;
  version: string;
  active: boolean;
  updated_at: string;
}

export interface ChurnScoreResult {
  probability: number;
  band: 'low' | 'medium' | 'high';
  explanation_features: Record<string, number | string>;
  model_version: string;
  source: 'assignment3_lightgbm' | 'demo_fallback';
  retention_intervention?: {
    recommended_action: string;
    offer_code?: string;
    discount_percentage?: number;
    delivery_perk?: string;
  };
}

export interface ToolCall {
  id?: string;
  name: string;
  arguments: Record<string, any>;
  result?: any;
}

export interface ChatMessage {
  id: string;
  session_id?: string;
  role?: 'user' | 'assistant' | 'system' | 'tool';
  content?: string;
  sender?: 'user' | 'bot'; // compatibility alias
  text: string; // compatibility alias
  timestamp?: string; // compatibility alias
  isDeepResearch?: boolean;
  researchSteps?: string[];
  attachments?: string[];
  language?: string;
  intent?: string;
  products?: RecommendedProduct[];
  tool_calls?: ToolCall[];
  latency_ms?: number;
  provider?: string;
  model?: string;
  created_at?: string;
}

// Aliases for compatibility
export type Message = ChatMessage;

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Strategy' | 'Product' | 'Creative' | 'Engineering' | 'Legal' | 'Shopping' | 'Offers';
  prompt: string;
  icon: string;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  badge?: string;
  speed: string;
  reasoning: string;
}

export interface ChatSession {
  id: string;
  user_id?: string;
  title: string;
  timeGroup: 'Today' | 'Yesterday' | '7 days';
  createdAt: string;
  messages: ChatMessage[];
  current_category?: string;
  budget_max?: number;
  last_product_ids?: string[];
  language?: LanguageCode;
}

export interface FeedbackSubmission {
  id?: string;
  message_id: string;
  session_id?: string;
  user_id?: string;
  rating: 'thumbs_up' | 'thumbs_down';
  reason?: 'Incorrect' | 'Not useful' | 'Too long' | 'Wrong product' | 'Wrong language' | 'Other';
  comment?: string;
  created_at?: string;
}

export interface AnalyticsSummary {
  totalChats: number;
  activeUsers: number;
  totalMessages: number;
  productSearches: number;
  recommendationClicks: number;
  addToCartRate: number;
  wishlistRate: number;
  orderLookups: number;
  escalations: number;
  aiFailures: number;
  fallbackRate: number;
  averageLatencyMs: number;
  positiveFeedbackScore: number;
  languageDistribution: Record<string, number>;
  intentDistribution: Record<string, number>;
  providerUsage: Record<string, number>;
  topCategories: Array<{ category: string; count: number }>;
  messagesOverTime: Array<{ time: string; count: number }>;
}
