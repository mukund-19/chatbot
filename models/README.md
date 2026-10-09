# BharatShop AI: Model Governance & Versioning

## 1. Conversational AI Model
- **Primary Provider:** Google Gemini 3.8 Flash (`@google/genai`)
- **Secondary Provider:** Groq (`llama-3.3-70b-versatile`)
- **Deterministic RAG Engine:** Built-in multi-lingual rule-based & catalogue retriever (`deterministic_rag_engine_v1`)
- **System Prompt Version:** `bharatshop_v2.4_multilingual`

## 2. Recommendation Engine (RecSys)
- **Scoring Architecture:** Multi-objective weighted ranker
- **Formula:**
  $$\text{Score} = 0.30 \cdot \text{Constraint} + 0.20 \cdot \text{Personalization} + 0.15 \cdot \text{Quality} + 0.15 \cdot \text{Value} + 0.10 \cdot \text{Availability} + 0.10 \cdot \text{Delivery}$$
- **Version:** `hybrid_v1.2`
- **Consent Gate:** If `personalization_enabled == false`, personal behavioral history is isolated and personal weight falls to 0.

## 3. Customer Churn Intelligence (Assignment 3)
- **Service Boundary:** `server/services/churn.ts` (`ChurnScoreService.predict()`)
- **Reported Champion:** LightGBM (`assignment3_lightgbm_v1`)
- **Features Used:**
  1. `days_since_last_order` (Recency)
  2. `total_orders_lifetime` (Frequency)
  3. `complaint_count` (Friction)
  4. `cart_abandonment_ratio` (Intent decay)
  5. `app_visits_last_30d` (Engagement)
  6. `avg_order_value` (Monetary value)
- **Operational Risk Bands:**
  - Low Risk: Probability < 0.30
  - Medium Risk: 0.30 ≤ Probability ≤ 0.60
  - High Risk: Probability > 0.60
- **Academic Disclaimer:**
  *This is a student demonstration prototype. Operational thresholds and simulated features demonstrate ML integration into customer support workflows, not an immutable enterprise guarantee.*
