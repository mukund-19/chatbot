# BharatShop AI Architecture Specification

## 1. Executive Summary
BharatShop AI is an end-to-end, deployable AI shopping concierge designed specifically for Indian e-commerce. It addresses language frictions, choice paralysis, and customer retention by marrying a multi-objective recommendation engine with conversational AI, vernacular natural language normalization, and customer churn intelligence.

## 2. End-to-End System Diagram
```
                     +---------------------------------------+
                     |         React / Vite Client           |
                     |  (Workspace Shell, Chat, Cart, RLS)  |
                     +---------------------------------------+
                                         |
                                (REST / JSON API)
                                         v
                     +---------------------------------------+
                     |         Express Backend Server        |
                     +---------------------------------------+
                                         |
             +---------------------------+---------------------------+
             |                           |                           |
             v                           v                           v
   +-------------------+       +-------------------+       +-------------------+
   | Language / Script |       | Intent Router &   |       | Typed Application |
   | Normalizer        |       | Context Memory    |       | Tools Layer       |
   | (12 Indian Langs) |       +-------------------+       +-------------------+
   +-------------------+                 |                           |
                                         |                           v
                                         |                +--------------------+
                                         |                | Database & Stores  |
                                         |                | - 200+ Products    |
                                         |                | - Orders (ORD-*)   |
                                         |                | - RAG Policies     |
                                         |                | - Support Tickets  |
                                         |                +--------------------+
                                         v                           |
                         +-------------------------------+           |
                         |  Recommendation Engine        |<----------+
                         |  (Multi-objective 6-weight)   |
                         +-------------------------------+
                                         |
                                         v
                         +-------------------------------+
                         | AI Provider Manager           |
                         | - Google Gemini 3.8 Flash     |
                         | - Groq (Optional)             |
                         | - Multi-tier RAG Fallback     |
                         +-------------------------------+
                                         |
                                         v
                         +-------------------------------+
                         | Grounded Natural Response     |
                         | + Interactive Product Cards   |
                         +-------------------------------+
```

## 3. Core Components
1. **Multilingual Normalizer (`server/ai/normalizer.ts`):** Canonicalizes Hinglish and regional terms (`sasta` -> price preference, `jaldi delivery` -> fast shipping, `pehle wala` -> index 0). Preserves negations strictly.
2. **Deterministic Recommendation Engine (`server/services/recommender.ts`):** 6-factor scoring formula balancing constraint match, quality, value, availability, personalization, and delivery fit.
3. **Retention Churn Service (`server/services/churn.ts`):** Implements Assignment 3 LightGBM SHAP feature weights to identify retention opportunities without exposing risk labels to shoppers.
4. **Resilient AI Fallback (`server/ai/fallback.ts`):** Guarantees 100% application uptime by resolving queries via deterministic database tools even in zero-network or quota-exhausted environments.
