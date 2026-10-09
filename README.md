# 🛍️ BharatShop AI: AI-Powered Personalized Shopping Assistant for Indian E-Commerce

> **A production-grade, grounded conversational AI shopping concierge and retention intelligence platform tailored for Indian consumers.**

---

## 📖 Executive Summary
**BharatShop AI** is a full-stack, deployable AI shopping assistant designed to eliminate cognitive overload and vernacular barriers for Indian online shoppers. Built with modern conversational intelligence, a deterministic multi-objective recommendation engine, and leakage-safe retention intelligence (Assignment 3 LightGBM integration), BharatShop AI delivers grounded, factual product discovery across 200+ seeded Indian e-commerce products.

---

## 🌟 Core System Capabilities

### 1. Conversational AI Concierge with Strict Grounding
- Natural language discovery across 17 Indian e-commerce categories.
- Real-time catalog and inventory queries using server-side application tools (`searchProducts`, `getProduct`, `compareProducts`, `getOrderStatus`, `getPolicy`).
- Hard budget constraints (e.g. *"phones under ₹30,000"*) are enforced deterministically — the AI never presents over-budget items as satisfying the user's hard criteria.

### 2. Deep Multilingual & Hinglish Support (12 Languages)
- Automatic language detection and manual override for **English, Hindi, Hinglish (Romanized Hindi), Punjabi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Urdu**.
- Specialized Indic normalization layer resolving vernacular expressions:
  - `sasta` / `sasti` → Low-price preference
  - `jaldi delivery` / `Diwali se pehle` → Fast express shipping requirement
  - `achha camera` / `battery backup` → Feature prioritization
  - Post-nominal budget parsing (e.g. *"2000 ke andar"*, *"30k tak"*, *"20 hazar"*)
  - Reference resolution (*"pehle wala"*, *"dusra wala"*, *"compare first and third"*, *"add the first one to cart"*)
  - **Negation preservation:** *"iPhone jaisa camera nahi chahiye"* strictly preserves the negation without confusing it for a positive interest.

### 3. Multi-Objective Deterministic Recommendation Engine
- Configurable 6-factor scoring formula:
  $$\text{Score} = 0.30 \cdot \text{Constraint} + 0.20 \cdot \text{Personalization} + 0.15 \cdot \text{Quality} + 0.15 \cdot \text{Value} + 0.10 \cdot \text{Availability} + 0.10 \cdot \text{Delivery}$$
- Generates transparent, verifiable *"Why recommended"* reasoning and top 3 specification highlights on every interactive card.

### 4. Side-by-Side Product Comparison Matrix
- Compare up to 4 items simultaneously with dynamic specifications (CPU, Camera, Battery, RAM, Screen for smartphones; Fabric, Length, Occasion for ethnic wear).
- Direct *"Add to Cart"* actions from inside the comparison table.

### 5. Persistent Cart, Wishlist & Safe Demo Checkout
- Real database-backed cart and wishlist state management.
- Transparent demo checkout clearly labeled: *"Demo checkout only — no payment is processed"*.
- Never collects or stores sensitive card numbers, CVVs, or bank credentials.

### 6. Grounded Order Telemetry (`ORD-10025`)
- Live simulated courier tracking (Delhivery Express, BlueDart, XpressBees) with real order history.
- Never fabricates delivery status or dates.

### 7. RAG Store Policies & Knowledge Base
- Grounded return (7-day electronics, 14-day fashion), exchange, cancellation, COD, and delivery policies queried from `knowledge_documents` before replying.

### 8. Customer Support Escalation
- Automated conversion of complaints into tracked support tickets (`TKT-XXXX`) with priority rating.

### 9. Retention Intelligence (Assignment 3 Churn Model)
- Integrated `ChurnScoreService` based on Assignment 3 LightGBM SHAP features (`days_since_last_order`, `total_orders_lifetime`, `complaint_count`, `cart_abandonment_ratio`, `app_visits_last_30d`).
- Operational risk bands: Low (< 0.30), Medium (0.30–0.60), High (> 0.60).
- Proactive non-discriminatory retention interventions (festival vouchers `BHARATCARE10`, free express delivery perks).
- **Responsible AI Rule:** Customers are NEVER labeled as "high churn" or exposed to internal risk scores.

### 10. Admin Intelligence Console
- Real-time telemetry: Total Chats, Active Users, Recommendation Clicks, Add-to-Cart Conversion, Language Distribution, Intent Classification, Average Latency, and Provider Usage.
- Admin subpages for Catalog Inventory, Order Tracking, Policy Documents, AI Health, and User Feedback Logs.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, React Router v7.
- **Backend Server:** Node.js, Express, TSX.
- **Database & Persistence:** Supabase PostgreSQL migration ready (`supabase/migrations/`) + Self-contained high-performance file-backed database engine (`server/db.ts`).
- **AI Providers:** Google Gemini 3.8 Flash (`@google/genai`), Groq Adapter, and Multi-Tier Deterministic RAG Fallback Engine.

---

## 📂 Project Structure
```
├── server/
│   ├── ai/
│   │   ├── normalizer.ts     # Multilingual & Hinglish canonicalization layer
│   │   ├── tools.ts          # Typed application tools with permission checks
│   │   ├── fallback.ts       # Deterministic RAG engine & tool executor
│   │   ├── gemini.ts         # Google Gemini provider with DB grounding
│   │   ├── groq.ts           # Groq provider adapter
│   │   ├── provider.ts       # AIProviderManager factory
│   │   ├── prompts.ts        # Versioned system instructions
│   │   └── types.ts          # AI interfaces
│   ├── data/
│   │   ├── products.ts       # 215 Seeded Indian e-commerce products
│   │   ├── orders.ts         # Seed demo orders (ORD-10025, ORD-10026, ORD-10027)
│   │   ├── knowledge.ts      # Grounded store policies (EN & HI)
│   │   └── users.ts          # Demo shopper & admin profiles
│   ├── services/
│   │   ├── recommender.ts    # Deterministic multi-objective ranker
│   │   └── churn.ts          # Assignment 3 ChurnScoreService
│   ├── db.ts                 # Full database & repository layer
│   └── routes.ts             # Express REST API endpoints (/api/*)
├── src/
│   ├── components/
│   │   ├── layout/AppShell.tsx            # Cortex-inspired workspace shell
│   │   ├── chat/HeroScreen.tsx            # Concierge greeting with glowing orb
│   │   ├── chat/ChatThread.tsx            # Rich conversation view with product cards
│   │   ├── products/ProductCard.tsx       # Interactive product card
│   │   ├── products/CompareModal.tsx      # Side-by-side comparison table
│   │   └── modals/                        # CheckoutModal, FeedbackModal
│   ├── contexts/AppContext.tsx            # Global application state & cart/wishlist
│   ├── lib/api.ts                         # Frontend API client
│   ├── pages/                             # Chat, Products, Cart, Wishlist, Orders, Profile, Support, Admin
│   ├── types/index.ts                     # Core domain models
│   └── App.tsx                            # React Router routes
├── evals/                                 # 50+ Evaluation suites (shopping, multilingual, grounding, safety)
├── prompts/                               # Version-controlled prompt repository
├── docs/                                  # Architecture, API & deployment documentation
├── supabase/migrations/                   # Full Supabase SQL schema migration
├── scripts/seed.ts                        # Reproducible seed script
├── test/index.ts                          # Automated test suite (31 tests)
└── server.ts                              # Express production server & Vite dev middleware
```

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database
Seeds 215 realistic Indian products, mock orders, and policy documents:
```bash
npm run seed
```

### 3. Run Automated Tests
Executes 31 automated unit and integration tests across normalization, search, recsys, churn, orders, and fallback:
```bash
npm run test
```

### 4. Run Development Server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables (`.env`)
Create `.env` using `.env.example`:
```env
PORT=3000
LLM_PROVIDER=gemini
LLM_MODEL=gemini-3.8-flash
GEMINI_API_KEY=your_gemini_api_key_here
ENABLE_DEMO_DATA=true
ENABLE_CHURN_SERVICE=true
```
*(Note: If no `GEMINI_API_KEY` is provided, the application activates the deterministic RAG fallback engine automatically. The entire app remains 100% functional and demonstrable offline!)*

---

## 🧪 Verified Demonstration Script (End-to-End Walkthrough)
1. **Explore Home:** Open `http://localhost:3000` — see greeting and suggestion chips.
2. **Product Search:** Enter *"I need a phone under ₹30,000 with a good camera and battery."*
   - See ranked phones strictly under ₹30,000 with why-recommended explanations.
3. **Vernacular Switch:** Enter *"Hindi mein samjhao"*.
   - Context is retained; assistant explains in Hindi.
4. **Contextual Comparison:** Enter *"Compare first and second"*.
   - Renders side-by-side trade-off matrix.
5. **Cart Mutation:** Enter *"Add the first one to cart"*.
   - Product is added; cart badge increments.
6. **Festive Saree Query:** Enter *"Mujhe 2000 ke andar red saree chahiye aur Diwali se pehle delivery honi chahiye."*
   - Returns festive red sarees within budget with fast delivery tag.
7. **Policy Inquiry:** Enter *"Return policy kya hai?"*
   - Returns grounded return policy (7-day electronics, 14-day fashion).
8. **Order Tracking:** Enter *"ORD-10025 ka status batao"*.
   - Queries real database; returns shipped status with Delhivery tracking code.
9. **Support Escalation:** Enter *"Customer support se baat karni hai"*.
   - Creates support ticket `TKT-XXXX`.
10. **Cart & Checkout:** Open `/cart`, review items, click *"Proceed to Demo Checkout"*, place order with UPI/COD.
11. **Profile & Consent:** Open `/profile`, toggle personalization memory or change language.
12. **Admin Console:** Open `/admin`, view live telemetry, catalog management, model status, and feedback logs.

---

## 🛡️ Responsible AI & Ethical Guardrails
- **Zero Hallucination Grounding:** Product pricing, stock, courier tracking, and policies are strictly retrieved from application storage.
- **Privacy & Consent Sovereignty:** Shoppers can toggle personalization memory off at any time. When disabled, behavioral histories are omitted from recommendation scoring.
- **Non-Discriminatory Churn Interventions:** Retention signals are used strictly for proactive loyalty care (e.g. coupons), never for credit scoring, price inflation, or service denial.
