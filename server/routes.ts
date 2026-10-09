import express, { Request, Response, Router } from 'express';
import { db } from './db';
import { AIProviderManager } from './ai/provider';
import { ChurnScoreService } from './services/churn';
import { RecommendationEngine } from './services/recommender';
import { LanguageNormalizer } from './ai/normalizer';
import { PROMPT_VERSION } from './ai/prompts';

export const apiRouter = Router();

// ============================================================================
// 1. CHAT API (/api/chat)
// ============================================================================
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const {
      sessionId = `sess-${Date.now()}`,
      message,
      prompt, // backwards compatibility
      language = 'auto',
      personalizationEnabled = true,
      userId = 'usr-demo-001',
      history = [],
      lastProductIds = [],
    } = req.body;

    const inputMsg = (message || prompt || '').trim();
    if (!inputMsg) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const aiManager = AIProviderManager.getInstance();
    const result = await aiManager.generateResponse({
      sessionId,
      userId,
      message: inputMsg,
      language,
      personalizationEnabled,
      history,
      lastProductIds,
    });

    // Log chat message and events in database
    const userEvent = {
      user_id: userId,
      session_id: sessionId,
      event_type: 'message_sent',
      metadata: { language: result.language, intent: result.intent },
    };
    db.logEvent(userEvent);

    return res.json({
      text: result.text,
      language: result.language,
      intent: result.intent,
      products: result.products || [],
      toolCalls: result.toolCalls || [],
      provider: result.provider,
      model: result.model,
      latencyMs: result.latencyMs,
      sessionId,
    });
  } catch (err: any) {
    console.error('Error in /api/chat endpoint:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing the chat request.',
      details: err?.message,
    });
  }
});

// ============================================================================
// 2. PRODUCTS API (/api/products)
// ============================================================================
apiRouter.get('/products', (req: Request, res: Response) => {
  try {
    const {
      query,
      category,
      subcategory,
      brand,
      maxPrice,
      minPrice,
      minRating,
      color,
      size,
      inStockOnly,
      limit,
    } = req.query;

    const products = db.getProducts({
      query: query ? String(query) : undefined,
      category: category ? String(category) : undefined,
      subcategory: subcategory ? String(subcategory) : undefined,
      brand: brand ? String(brand) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      color: color ? String(color) : undefined,
      size: size ? String(size) : undefined,
      inStockOnly: inStockOnly === 'true',
      limit: limit ? Number(limit) : undefined,
    });

    db.logEvent({
      event_type: 'product_search',
      metadata: { count: products.length, query, category, maxPrice },
    });

    return res.json({ count: products.length, products });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

apiRouter.get('/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  db.logEvent({
    event_type: 'product_click',
    product_id: product.id,
  });
  return res.json({ product });
});

apiRouter.post('/products', (req: Request, res: Response) => {
  try {
    const { name, brand, category, subcategory, price, description, image_url, stock_qty } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }
    const newProduct = db.addProduct({
      id: `prod-${Date.now()}`,
      sku: `BHARAT-CUSTOM-${Date.now().toString().slice(-4)}`,
      name,
      brand: brand || 'BharatShop Partner',
      category,
      subcategory: subcategory || 'General',
      description: description || 'High-quality e-commerce product.',
      price: Number(price),
      currency: 'INR',
      rating: 4.5,
      review_count: 1,
      stock_qty: Number(stock_qty || 25),
      color_options: ['Standard'],
      size_options: ['Standard'],
      specifications: { Warranty: '1 Year Brand Warranty' },
      tags: [category.toLowerCase()],
      image_url: image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      seller: 'BharatShop Direct',
      delivery_days: 2,
      active: true,
    });
    return res.status(201).json({ success: true, product: newProduct });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

apiRouter.put('/products/:id', (req: Request, res: Response) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json({ success: true, product: updated });
});

// ============================================================================
// 3. RECOMMENDATIONS API (/api/recommendations)
// ============================================================================
apiRouter.post('/recommendations', (req: Request, res: Response) => {
  try {
    const { query, category, maxPrice, userId = 'usr-demo-001' } = req.body;
    const candidates = db.getProducts({ category, maxPrice, limit: 30 });
    const profile = db.getProfile(userId);
    const context = LanguageNormalizer.normalize(query || category || '');
    if (maxPrice) context.maxPrice = Number(maxPrice);
    if (category) context.category = category;

    const ranked = RecommendationEngine.rankProducts(candidates, context, profile);
    return res.json({ count: ranked.length, recommendations: ranked.slice(0, 8) });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to compute recommendations' });
  }
});

// ============================================================================
// 4. CART API (/api/cart)
// ============================================================================
apiRouter.get('/cart', (req: Request, res: Response) => {
  const ownerId = (req.query.userId || req.query.sessionId || 'usr-demo-001') as string;
  const cart = db.getCart(ownerId);
  return res.json({ cart });
});

apiRouter.post('/cart/add', (req: Request, res: Response) => {
  const { userId = 'usr-demo-001', sessionId, productId, quantity = 1, color, size } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  const ownerId = userId || sessionId || 'usr-demo-001';
  const cart = db.addToCart(ownerId, productId, Number(quantity), color, size);
  return res.json({ success: true, cart });
});

apiRouter.post('/cart/update', (req: Request, res: Response) => {
  const { userId = 'usr-demo-001', sessionId, productId, quantity } = req.body;
  const ownerId = userId || sessionId || 'usr-demo-001';
  const cart = db.updateCartItemQuantity(ownerId, productId, Number(quantity));
  return res.json({ success: true, cart });
});

apiRouter.post('/cart/remove', (req: Request, res: Response) => {
  const { userId = 'usr-demo-001', sessionId, productId } = req.body;
  const ownerId = userId || sessionId || 'usr-demo-001';
  const cart = db.removeFromCart(ownerId, productId);
  return res.json({ success: true, cart });
});

apiRouter.post('/cart/clear', (req: Request, res: Response) => {
  const { userId = 'usr-demo-001', sessionId } = req.body;
  const ownerId = userId || sessionId || 'usr-demo-001';
  const cart = db.clearCart(ownerId);
  return res.json({ success: true, cart });
});

// ============================================================================
// 5. WISHLIST API (/api/wishlist)
// ============================================================================
apiRouter.get('/wishlist', (req: Request, res: Response) => {
  const ownerId = (req.query.userId || req.query.sessionId || 'usr-demo-001') as string;
  const items = db.getWishlist(ownerId);
  return res.json({ count: items.length, items });
});

apiRouter.post('/wishlist/toggle', (req: Request, res: Response) => {
  const { userId = 'usr-demo-001', sessionId, productId } = req.body;
  if (!productId) return res.status(400).json({ error: 'Product ID required' });
  const ownerId = userId || sessionId || 'usr-demo-001';
  const result = db.toggleWishlist(ownerId, productId);
  return res.json({ success: true, added: result.added, wishlist: result.wishlist });
});

// ============================================================================
// 6. ORDERS API (/api/orders)
// ============================================================================
apiRouter.get('/orders', (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  const orders = db.getOrders(userId);
  return res.json({ count: orders.length, orders });
});

apiRouter.get('/orders/track/:orderNumber', (req: Request, res: Response) => {
  const order = db.getOrderByNumber(req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ error: `Order ${req.params.orderNumber} not found` });
  }
  db.logEvent({
    event_type: 'order_lookup',
    metadata: { orderNumber: order.order_number },
  });
  return res.json({ order });
});

// ============================================================================
// 7. POLICIES & KNOWLEDGE API (/api/policies)
// ============================================================================
apiRouter.get('/policies', (req: Request, res: Response) => {
  const { type, language = 'en' } = req.query;
  const docs = db.getKnowledgeDocs(type ? String(type) : undefined, String(language));
  return res.json({ count: docs.length, documents: docs });
});

apiRouter.post('/policies', (req: Request, res: Response) => {
  const { type, title, content, language = 'en', version = '1.0' } = req.body;
  if (!type || !title || !content) {
    return res.status(400).json({ error: 'Type, title and content are required' });
  }
  const created = db.addKnowledgeDoc({
    id: `doc-${Date.now()}`,
    type,
    title,
    content,
    language,
    version,
    active: true,
    updated_at: new Date().toISOString(),
  });
  return res.status(201).json({ success: true, document: created });
});

// ============================================================================
// 8. SUPPORT TICKETS API (/api/support)
// ============================================================================
apiRouter.get('/support', (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  const tickets = db.getSupportTickets(userId);
  return res.json({ count: tickets.length, tickets });
});

apiRouter.post('/support', (req: Request, res: Response) => {
  const { category, summary, priority = 'medium', language = 'en', userId = 'usr-demo-001' } = req.body;
  if (!summary) return res.status(400).json({ error: 'Issue summary is required' });
  const ticket = db.createSupportTicket({
    user_id: userId,
    category: category || 'Customer Assistance',
    priority,
    language,
    summary,
    status: 'open',
  });
  return res.status(201).json({ success: true, ticket });
});

// ============================================================================
// 9. CHURN RISK INTELLIGENCE API (/api/churn)
// ============================================================================
apiRouter.get('/churn', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'usr-demo-001';
  const profile = db.getProfile(userId);
  const prediction = ChurnScoreService.predict({
    tier: profile?.city_tier || 'Tier-2',
    days_since_last_order: 14,
    total_orders_lifetime: 4,
  });
  db.saveChurnScore(userId, prediction);
  return res.json({ userId, prediction });
});

apiRouter.get('/churn/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const profile = db.getProfile(userId);
  const prediction = ChurnScoreService.predict({
    tier: profile?.city_tier || 'Tier-2',
    days_since_last_order: 14,
    total_orders_lifetime: 4,
  });
  db.saveChurnScore(userId, prediction);
  return res.json({ userId, prediction });
});

// ============================================================================
// 10. ANALYTICS & ADMIN METRICS API (/api/analytics)
// ============================================================================
apiRouter.get('/analytics', (_req: Request, res: Response) => {
  const summary = db.getAnalyticsSummary();
  return res.json(summary);
});

// ============================================================================
// 11. MODEL & SYSTEM CONFIGURATION API (/api/model)
// ============================================================================
apiRouter.get('/model', (_req: Request, res: Response) => {
  const aiManager = AIProviderManager.getInstance();
  const churn = ChurnScoreService.predict({});

  return res.json({
    appName: 'BharatShop AI',
    currentProvider: aiManager.getProviderName(),
    currentModel: process.env.LLM_MODEL || (aiManager.getProviderName() === 'gemini' ? 'gemini-3.8-flash' : 'deterministic_rag_engine_v1'),
    promptVersion: PROMPT_VERSION,
    recommendationWeightsVersion: db.getSettings('weights_version') || 'hybrid_v1.2',
    recommendationWeights: db.getSettings('recommendation_weights'),
    churnModelVersion: churn.model_version,
    churnModelSource: churn.source,
    isAssignment3Prototype: true,
    systemHealth: 'healthy',
    activeProductsCount: db.getProducts().length,
  });
});

// ============================================================================
// 12. USER PROFILE & CONSENT API (/api/profile)
// ============================================================================
apiRouter.get('/profile/:userId', (req: Request, res: Response) => {
  const profile = db.getProfile(req.params.userId) || db.getProfile('usr-demo-001');
  return res.json({ profile });
});

apiRouter.put('/profile/:userId', (req: Request, res: Response) => {
  const updated = db.updateProfile(req.params.userId, req.body);
  return res.json({ success: true, profile: updated });
});

// ============================================================================
// 13. FEEDBACK API (/api/feedback)
// ============================================================================
apiRouter.post('/feedback', (req: Request, res: Response) => {
  const { message_id, session_id, rating, reason, comment } = req.body;
  if (!rating) return res.status(400).json({ error: 'Rating is required' });
  const recorded = db.recordFeedback({
    message_id: message_id || `msg-${Date.now()}`,
    session_id,
    rating,
    reason,
    comment,
  });
  return res.json({ success: true, feedback: recorded });
});

apiRouter.get('/feedback', (_req: Request, res: Response) => {
  const list = db.getFeedback();
  return res.json({ count: list.length, feedback: list });
});

// ============================================================================
// 14. SESSIONS API (/api/sessions)
// ============================================================================
apiRouter.get('/sessions', (_req: Request, res: Response) => {
  const sessions = db.getAllChatSessions();
  return res.json({ count: sessions.length, sessions });
});

apiRouter.post('/sessions', (req: Request, res: Response) => {
  const session = db.saveChatSession(req.body);
  return res.json({ success: true, session });
});

apiRouter.delete('/sessions/:id', (req: Request, res: Response) => {
  const deleted = db.deleteChatSession(req.params.id);
  return res.json({ success: deleted });
});

apiRouter.post('/sessions/clear', (_req: Request, res: Response) => {
  db.clearAllSessions();
  return res.json({ success: true });
});
