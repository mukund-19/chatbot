import { db } from '../db';
import { RecommendationEngine } from '../services/recommender';
import { ChurnScoreService } from '../services/churn';
import { LanguageNormalizer, NormalizedIntentContext } from './normalizer';
import { Product, RecommendedProduct, Cart, Order, KnowledgeDocument, SupportTicket, ChurnScoreResult } from '../../src/types/index';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  isMutating?: boolean;
  isSensitive?: boolean;
}

export class BharatShopTools {
  public static readonly DEFINITIONS: ToolDefinition[] = [
    {
      name: 'searchProducts',
      description: 'Search for active e-commerce products by query keyword, category, brand, maximum price, rating, or delivery speed.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Product title, tags or description keywords' },
          category: { type: 'string', description: 'Product category (e.g., Mobile Phones, Sarees, Kurtis, Laptops, Kitchen)' },
          brand: { type: 'string', description: 'Brand filter (e.g., Samsung, OnePlus, Libas, boAt)' },
          maxPrice: { type: 'number', description: 'Hard upper ceiling for price in INR (e.g., 30000, 2000)' },
          minPrice: { type: 'number', description: 'Minimum price in INR' },
          minRating: { type: 'number', description: 'Minimum star rating between 1.0 and 5.0' },
          color: { type: 'string', description: 'Color preference (e.g., Red, Blue, Black)' },
          size: { type: 'string', description: 'Size preference (e.g., Size 9, XL, Free Size)' },
          inStockOnly: { type: 'boolean', description: 'Only include in-stock items' },
          limit: { type: 'number', description: 'Maximum products to return (default 6)' }
        }
      }
    },
    {
      name: 'getProduct',
      description: 'Retrieve full specifications, stock, and details of a specific product by its ID.',
      parameters: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string', description: 'The unique product ID' }
        }
      }
    },
    {
      name: 'compareProducts',
      description: 'Perform a side-by-side specification and value comparison of 2 to 4 products by their IDs.',
      parameters: {
        type: 'object',
        required: ['productIds'],
        properties: {
          productIds: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of 2 to 4 product IDs to compare'
          }
        }
      }
    },
    {
      name: 'getRecommendations',
      description: 'Get ranked personalized product recommendations based on shopping query, user context, and preferences.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Natural language shopping query' },
          category: { type: 'string', description: 'Category' },
          maxPrice: { type: 'number', description: 'Max budget' },
          prioritizeCamera: { type: 'boolean' },
          prioritizeBattery: { type: 'boolean' },
          fastDelivery: { type: 'boolean' }
        }
      }
    },
    {
      name: 'getCart',
      description: 'View the items and totals in the current shopping cart.',
      parameters: {
        type: 'object',
        properties: {
          userIdOrSession: { type: 'string', description: 'User or session identifier' }
        }
      }
    },
    {
      name: 'addToCart',
      description: 'Add a product to the cart with specified quantity, color, or size.',
      isMutating: true,
      parameters: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string', description: 'Product ID' },
          quantity: { type: 'number', description: 'Quantity to add (default 1)' },
          color: { type: 'string', description: 'Chosen color option' },
          size: { type: 'string', description: 'Chosen size option' }
        }
      }
    },
    {
      name: 'removeFromCart',
      description: 'Remove a product from the shopping cart.',
      isMutating: true,
      parameters: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string', description: 'Product ID to remove' }
        }
      }
    },
    {
      name: 'toggleWishlist',
      description: 'Add or remove a product from the user wishlist.',
      isMutating: true,
      parameters: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string', description: 'Product ID' }
        }
      }
    },
    {
      name: 'getWishlist',
      description: 'View items in the user wishlist.',
      parameters: {
        type: 'object',
        properties: {
          userIdOrSession: { type: 'string', description: 'User or session identifier' }
        }
      }
    },
    {
      name: 'getOrderStatus',
      description: 'Look up live shipment and tracking status of an existing order by its order number (e.g., ORD-10025).',
      parameters: {
        type: 'object',
        required: ['orderNumber'],
        properties: {
          orderNumber: { type: 'string', description: 'The order identifier, e.g., ORD-10025' }
        }
      }
    },
    {
      name: 'getPolicy',
      description: 'Retrieve official policy or FAQ details (return, exchange, cancellation, delivery, payment, COD).',
      parameters: {
        type: 'object',
        required: ['type'],
        properties: {
          type: {
            type: 'string',
            enum: ['return_policy', 'exchange_policy', 'cancellation_policy', 'delivery_policy', 'payment_faq', 'cod_info', 'warranty'],
            description: 'Type of policy document'
          },
          language: { type: 'string', description: 'Language code (e.g., en, hi)' }
        }
      }
    },
    {
      name: 'createSupportTicket',
      description: 'Escalate an issue and create an official customer support ticket.',
      isMutating: true,
      parameters: {
        type: 'object',
        required: ['category', 'summary'],
        properties: {
          category: { type: 'string', description: 'Issue category' },
          summary: { type: 'string', description: 'Detailed issue summary' },
          priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
          language: { type: 'string', description: 'User preferred language' }
        }
      }
    },
    {
      name: 'getUserPreferences',
      description: 'Retrieve the current user profile, consent settings, and shopping preferences.',
      parameters: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' }
        }
      }
    },
    {
      name: 'getChurnScore',
      description: 'Internal retention intelligence service to inspect customer engagement and determine retention care.',
      isSensitive: true,
      parameters: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string', description: 'User ID' }
        }
      }
    }
  ];

  /**
   * Executes a verified tool call safely
   */
  public static async executeTool(
    name: string,
    args: Record<string, any>,
    sessionContext: { userId?: string; sessionId?: string; lastProductIds?: string[] }
  ): Promise<any> {
    const userId = sessionContext.userId || 'usr-demo-001';
    const ownerId = sessionContext.userId || sessionContext.sessionId || 'usr-demo-001';

    switch (name) {
      case 'searchProducts': {
        const products = db.getProducts({
          query: args.query,
          category: args.category,
          brand: args.brand,
          maxPrice: args.maxPrice ? Number(args.maxPrice) : undefined,
          minPrice: args.minPrice ? Number(args.minPrice) : undefined,
          minRating: args.minRating ? Number(args.minRating) : undefined,
          color: args.color,
          size: args.size,
          inStockOnly: args.inStockOnly,
          limit: args.limit ? Number(args.limit) : 6,
        });

        const normCtx: NormalizedIntentContext = {
          originalText: args.query || '',
          cleanedText: (args.query || '').toLowerCase(),
          detectedLanguage: 'en',
          maxPrice: args.maxPrice,
          category: args.category,
          color: args.color,
          size: args.size,
          requiresFastDelivery: false,
          prioritizeCamera: false,
          prioritizeBattery: false,
          prioritizePriceLow: false,
          isNegatedCamera: false,
          isNegatedBattery: false,
          isOrderQuery: false,
          isPolicyQuery: false,
          isSupportQuery: false,
          isCartAction: null,
          isWishlistAction: null,
        };

        const profile = db.getProfile(userId);
        const ranked = RecommendationEngine.rankProducts(products, normCtx, profile);
        return {
          count: ranked.length,
          products: ranked.slice(0, 6),
        };
      }

      case 'getProduct': {
        const product = db.getProductById(args.productId);
        if (!product) return { error: `Product not found with ID ${args.productId}` };
        return { product };
      }

      case 'compareProducts': {
        let pids: string[] = Array.isArray(args.productIds) ? args.productIds : [];
        if (pids.length === 0 && sessionContext.lastProductIds && sessionContext.lastProductIds.length >= 2) {
          pids = sessionContext.lastProductIds.slice(0, 2);
        }
        const products = db.getProductsByIds(pids);
        return {
          comparison: products.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            price: p.price,
            rating: p.rating,
            delivery_days: p.delivery_days,
            specifications: p.specifications,
          })),
        };
      }

      case 'getRecommendations': {
        const candidates = db.getProducts({
          category: args.category,
          maxPrice: args.maxPrice ? Number(args.maxPrice) : undefined,
          limit: 20,
        });
        const normCtx: NormalizedIntentContext = {
          originalText: args.query || '',
          cleanedText: (args.query || '').toLowerCase(),
          detectedLanguage: 'en',
          maxPrice: args.maxPrice,
          category: args.category,
          requiresFastDelivery: Boolean(args.fastDelivery),
          prioritizeCamera: Boolean(args.prioritizeCamera),
          prioritizeBattery: Boolean(args.prioritizeBattery),
          prioritizePriceLow: false,
          isNegatedCamera: false,
          isNegatedBattery: false,
          isOrderQuery: false,
          isPolicyQuery: false,
          isSupportQuery: false,
          isCartAction: null,
          isWishlistAction: null,
        };
        const profile = db.getProfile(userId);
        const ranked = RecommendationEngine.rankProducts(candidates, normCtx, profile);
        return {
          products: ranked.slice(0, 5),
        };
      }

      case 'getCart': {
        const cart = db.getCart(ownerId);
        return { cart };
      }

      case 'addToCart': {
        const qty = args.quantity ? Number(args.quantity) : 1;
        const updatedCart = db.addToCart(ownerId, args.productId, qty, args.color, args.size);
        const addedProduct = db.getProductById(args.productId);
        return {
          success: true,
          added: addedProduct ? { id: addedProduct.id, name: addedProduct.name, price: addedProduct.price } : null,
          cartTotal: updatedCart.total,
          itemCount: updatedCart.items.reduce((s, i) => s + i.quantity, 0),
        };
      }

      case 'removeFromCart': {
        const updatedCart = db.removeFromCart(ownerId, args.productId);
        return { success: true, cart: updatedCart };
      }

      case 'toggleWishlist': {
        const res = db.toggleWishlist(ownerId, args.productId);
        return { success: true, added: res.added, totalItems: res.wishlist.length };
      }

      case 'getWishlist': {
        const items = db.getWishlist(ownerId);
        return { count: items.length, items };
      }

      case 'getOrderStatus': {
        const order = db.getOrderByNumber(args.orderNumber);
        if (!order) {
          return {
            found: false,
            message: `No active order found with tracking number ${args.orderNumber}. Please check the order number.`,
          };
        }
        return {
          found: true,
          order: {
            order_number: order.order_number,
            status: order.status,
            courier: order.courier,
            tracking_number: order.tracking_number,
            estimated_delivery: order.estimated_delivery,
            last_update: order.last_update,
            total_amount: order.total_amount,
            item_count: order.items.length,
          },
        };
      }

      case 'getPolicy': {
        const doc = db.getPolicy(args.type, args.language || 'en');
        if (!doc) {
          return { found: false, message: 'Policy document temporarily unavailable.' };
        }
        return {
          found: true,
          type: doc.type,
          title: doc.title,
          content: doc.content,
          language: doc.language,
          version: doc.version,
        };
      }

      case 'createSupportTicket': {
        const ticket = db.createSupportTicket({
          user_id: userId,
          session_id: sessionContext.sessionId,
          category: args.category || 'General Assistance',
          priority: args.priority || 'medium',
          language: args.language || 'en',
          summary: args.summary,
          status: 'open',
        });
        return {
          ticketCreated: true,
          ticketNumber: ticket.ticket_number,
          priority: ticket.priority,
          status: ticket.status,
          message: `Support ticket ${ticket.ticket_number} created successfully. An agent will respond shortly.`,
        };
      }

      case 'getUserPreferences': {
        const profile = db.getProfile(userId);
        return { profile };
      }

      case 'getChurnScore': {
        // Sensitive internal service - never expose raw score to customer
        const score = ChurnScoreService.predict({ tier: 'Tier-2' });
        return {
          band: score.band,
          retention_intervention: score.retention_intervention,
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}
