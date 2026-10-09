-- ============================================================================
-- BharatShop AI: Database Schema Migration
-- AI-Powered Personalized Shopping Assistant for Indian E-Commerce
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255) NOT NULL DEFAULT 'Shopper',
  avatar_url TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'shopper', -- 'shopper', 'admin'
  preferred_language VARCHAR(50) NOT NULL DEFAULT 'en',
  city_tier VARCHAR(50) DEFAULT 'Tier-2', -- 'Tier-1', 'Tier-2', 'Tier-3'
  city VARCHAR(100) DEFAULT 'Indore',
  state VARCHAR(100) DEFAULT 'Madhya Pradesh',
  preferred_categories JSONB DEFAULT '["Mobile Phones", "Fashion", "Home Appliances"]'::jsonb,
  budget_min NUMERIC DEFAULT 1000,
  budget_max NUMERIC DEFAULT 50000,
  payment_preference VARCHAR(50) DEFAULT 'UPI', -- 'UPI', 'COD', 'Card', 'NetBanking'
  personalization_enabled BOOLEAN NOT NULL DEFAULT true,
  analytics_consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  original_price NUMERIC CHECK (original_price >= price),
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  rating NUMERIC NOT NULL DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
  color_options JSONB DEFAULT '[]'::jsonb,
  size_options JSONB DEFAULT '[]'::jsonb,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  seller VARCHAR(150) NOT NULL DEFAULT 'BharatShop Retail',
  delivery_days INTEGER NOT NULL DEFAULT 3 CHECK (delivery_days >= 0),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);

-- 3. CHAT SESSIONS
CREATE TABLE IF NOT EXISTS chat_sessions (
  id VARCHAR(100) PRIMARY KEY,
  user_id VARCHAR(255),
  title VARCHAR(255) NOT NULL DEFAULT 'New Conversation',
  time_group VARCHAR(50) NOT NULL DEFAULT 'Today',
  language VARCHAR(50) NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
  id VARCHAR(100) PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
  content TEXT NOT NULL,
  language VARCHAR(50) DEFAULT 'en',
  intent VARCHAR(100),
  tool_calls JSONB DEFAULT '[]'::jsonb,
  latency_ms INTEGER DEFAULT 0,
  provider VARCHAR(50) DEFAULT 'gemini',
  model VARCHAR(100) DEFAULT 'gemini-3.8-flash',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);

-- 5. USER EVENTS (Clickstream & Interactions)
CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255),
  session_id VARCHAR(100),
  event_type VARCHAR(100) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_events_type ON user_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_events_session ON user_events(session_id);

-- 6. CARTS & CART ITEMS
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255),
  session_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_cart_user_or_session UNIQUE (user_id, session_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  selected_color VARCHAR(100),
  selected_size VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. WISHLISTS & WISHLIST ITEMS
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255),
  session_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_wishlist_user_or_session UNIQUE (user_id, session_id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_wishlist_item UNIQUE (wishlist_id, product_id)
);

-- 8. ORDERS & ORDER ITEMS
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) NOT NULL,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed' CHECK (
    status IN ('confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned')
  ),
  total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
  payment_method VARCHAR(50) NOT NULL DEFAULT 'UPI',
  courier VARCHAR(100) NOT NULL DEFAULT 'Delhivery Express',
  tracking_number VARCHAR(100) NOT NULL,
  shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
  estimated_delivery DATE NOT NULL,
  last_update TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price NUMERIC NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(100) UNIQUE NOT NULL,
  user_id VARCHAR(255),
  session_id VARCHAR(100),
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  language VARCHAR(50) NOT NULL DEFAULT 'en',
  summary TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. FEEDBACK
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id VARCHAR(100),
  session_id VARCHAR(100),
  user_id VARCHAR(255),
  rating VARCHAR(20) NOT NULL CHECK (rating IN ('thumbs_up', 'thumbs_down')),
  reason VARCHAR(100),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. CONSENTS
CREATE TABLE IF NOT EXISTS consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255),
  session_id VARCHAR(100),
  personalization BOOLEAN NOT NULL DEFAULT true,
  analytics BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

-- 12. CHURN SCORES (Retention Intelligence)
CREATE TABLE IF NOT EXISTS churn_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) NOT NULL,
  probability NUMERIC NOT NULL CHECK (probability >= 0 AND probability <= 1),
  band VARCHAR(20) NOT NULL CHECK (band IN ('low', 'medium', 'high')),
  explanation_features JSONB NOT NULL DEFAULT '{}'::jsonb,
  model_version VARCHAR(100) NOT NULL DEFAULT 'assignment3_lightgbm_v1',
  source VARCHAR(50) NOT NULL DEFAULT 'assignment3_lightgbm', -- 'assignment3_lightgbm' or 'demo_fallback'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. KNOWLEDGE DOCUMENTS (Policy & FAQ RAG Store)
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(100) NOT NULL, -- 'return_policy', 'exchange_policy', 'cancellation_policy', 'delivery_policy', 'warranty', 'payment_faq', 'cod_info'
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(50) NOT NULL DEFAULT 'en',
  version VARCHAR(50) NOT NULL DEFAULT '1.0',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. RECOMMENDATION LOGS (Audit & Performance Tracking)
CREATE TABLE IF NOT EXISTS recommendation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100),
  user_id VARCHAR(255),
  query TEXT,
  product_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  weights_version VARCHAR(50) NOT NULL DEFAULT 'hybrid_v1',
  model_version VARCHAR(100) NOT NULL DEFAULT 'recsys_lightgbm_v1',
  clicked_product_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. MODEL VERSIONS & APPLICATION SETTINGS
CREATE TABLE IF NOT EXISTS model_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  version VARCHAR(50) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS application_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Products: Public can read active items, admins can manage
CREATE POLICY "Public products view" ON products FOR SELECT USING (active = true);
-- Knowledge docs: Public can read active policies
CREATE POLICY "Public knowledge view" ON knowledge_documents FOR SELECT USING (active = true);
