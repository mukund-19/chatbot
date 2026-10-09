# BharatShop AI REST API Reference

All backend endpoints are prefixed with `/api`.

### 1. Chat
- `POST /api/chat`
  - Input: `{ sessionId, message, language, personalizationEnabled, history, lastProductIds }`
  - Response: `{ text, language, intent, products, toolCalls, provider, model, latencyMs }`

### 2. Products
- `GET /api/products` (supports `query`, `category`, `maxPrice`, `minRating`, `color`, `size`, `limit`)
- `GET /api/products/:id`
- `POST /api/products` (Admin inventory creation)
- `PUT /api/products/:id` (Admin update)

### 3. Recommendations
- `POST /api/recommendations`
  - Input: `{ query, category, maxPrice, userId }`
  - Output: `{ count, recommendations }`

### 4. Cart & Wishlist
- `GET /api/cart?userId=...`
- `POST /api/cart/add` (`{ productId, quantity, color, size, userId }`)
- `POST /api/cart/update` (`{ productId, quantity, userId }`)
- `POST /api/cart/remove` (`{ productId, userId }`)
- `POST /api/cart/clear`
- `GET /api/wishlist?userId=...`
- `POST /api/wishlist/toggle` (`{ productId, userId }`)

### 5. Orders & Telemetry
- `GET /api/orders?userId=...`
- `GET /api/orders/track/:orderNumber` (e.g. `/api/orders/track/ORD-10025`)
- `POST /api/orders` (Creates demo order)

### 6. Policies & Support
- `GET /api/policies?type=...&language=...`
- `POST /api/policies`
- `GET /api/support?userId=...`
- `POST /api/support` (`{ category, summary, priority, language, userId }`)

### 7. Governance, Model & Analytics
- `GET /api/analytics`
- `GET /api/model`
- `GET /api/churn/:userId`
- `POST /api/feedback`
- `GET /api/feedback`
