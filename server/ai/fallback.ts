import { db } from '../db';
import { LanguageNormalizer, NormalizedIntentContext } from './normalizer';
import { BharatShopTools } from './tools';
import { RecommendationEngine } from '../services/recommender';
import { ChatRequestOptions, ChatResponseOutput } from './types';
import { RecommendedProduct, ToolCall } from '../../src/types/index';

export class DeterministicFallbackEngine {
  /**
   * Generates a fully grounded response using structured application tools and localized templates
   */
  public static async execute(options: ChatRequestOptions): Promise<ChatResponseOutput> {
    const startTime = Date.now();
    const { message, sessionId, userId = 'usr-demo-001', lastProductIds = [] } = options;
    const context = LanguageNormalizer.normalize(message);
    const lang = options.language && options.language !== 'auto' ? options.language : context.detectedLanguage;

    let intent = 'general_help';
    let responseText = '';
    let products: RecommendedProduct[] | undefined = undefined;
    const toolCalls: ToolCall[] = [];

    // 1. ORDER STATUS LOOKUP
    if (context.isOrderQuery || context.orderNumberQuery) {
      intent = 'order_status';
      const orderNum = context.orderNumberQuery || 'ORD-10025';
      const orderResult = await BharatShopTools.executeTool('getOrderStatus', { orderNumber: orderNum }, { userId, sessionId });
      toolCalls.push({ name: 'getOrderStatus', arguments: { orderNumber: orderNum }, result: orderResult });

      if (orderResult.found) {
        const o = orderResult.order;
        if (lang === 'hi' || lang === 'hinglish') {
          responseText = `### 📦 ऑर्डर स्थिति: ${o.order_number}\n\n- **स्थिति:** ${o.status.toUpperCase()}\n- **कूरियर पार्टनर:** ${o.courier} (${o.tracking_number})\n- **अनुमानित डिलीवरी:** ${o.estimated_delivery}\n- **हालिया अपडेट:** ${o.last_update}\n\nक्या आप इस ऑर्डर के संबंध में कोई अन्य सहायता चाहते हैं?`;
        } else if (lang === 'pa') {
          responseText = `### 📦 ਆਰਡਰ ਸਥਿਤੀ: ${o.order_number}\n\n- **ਸਟੇਟਸ:** ${o.status.toUpperCase()}\n- **ਕੂਰੀਅਰ:** ${o.courier} (${o.tracking_number})\n- **ਅੰਦਾਜ਼ਨ ਡਿਲੀਵਰੀ:** ${o.estimated_delivery}\n- **ਤਾਜ਼ਾ ਅਪਡੇਟ:** ${o.last_update}\n\nਕੀ ਤੁਹਾਨੂੰ ਹੋਰ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ?`;
        } else {
          responseText = `### 📦 Order Status: ${o.order_number}\n\n- **Status:** **${o.status.toUpperCase()}**\n- **Courier:** ${o.courier} (Tracking: \`${o.tracking_number}\`)\n- **Estimated Delivery:** ${o.estimated_delivery}\n- **Latest Telemetry:** ${o.last_update}\n\nWould you like me to alert you when out for delivery?`;
        }
      } else {
        responseText = orderResult.message || `No active shipment found matching ${orderNum}.`;
      }
    }

    // 2. POLICY / KNOWLEDGE LOOKUP (RAG)
    else if (context.isPolicyQuery && context.policyType) {
      intent = context.policyType;
      const policyDoc = await BharatShopTools.executeTool('getPolicy', { type: context.policyType, language: lang }, { userId, sessionId });
      toolCalls.push({ name: 'getPolicy', arguments: { type: context.policyType, language: lang }, result: policyDoc });

      if (policyDoc.found) {
        if (lang === 'hi' || lang === 'hinglish') {
          responseText = `### 📋 ${policyDoc.title}\n\n${policyDoc.content}\n\n*क्या आपके पास रिटर्न या एक्सचेंज के बारे में कोई और प्रश्न है?*`;
        } else if (lang === 'pa') {
          responseText = `### 📋 ${policyDoc.title}\n\n${policyDoc.content}\n\n*ਕੀ ਤੁਹਾਨੂੰ ਰਿਟਰਨ ਬਾਰੇ ਕੋਈ ਹੋਰ ਪੁੱਛਣਾ ਹੈ?*`;
        } else {
          responseText = `### 📋 Official Store Policy: ${policyDoc.title}\n\n${policyDoc.content}\n\n*Need help starting a return or size exchange for an existing order?*`;
        }
      } else {
        responseText = "I couldn't retrieve the exact policy document right now, but standard returns are supported within 7-14 days.";
      }
    }

    // 3. SUPPORT ESCALATION
    else if (context.isSupportQuery) {
      intent = 'human_escalation';
      const tkt = await BharatShopTools.executeTool(
        'createSupportTicket',
        {
          category: 'Customer Support Escalation',
          summary: message,
          priority: 'high',
          language: lang,
        },
        { userId, sessionId }
      );
      toolCalls.push({ name: 'createSupportTicket', arguments: { summary: message }, result: tkt });

      if (lang === 'hi' || lang === 'hinglish') {
        responseText = `### 🎧 सपोर्ट टिकट दर्ज किया गया: ${tkt.ticketNumber}\n\nआपकी समस्या कस्टमर केयर टीम को भेज दी गई है।\n- **प्राथमिकता:** ${tkt.priority.toUpperCase()}\n- **स्थिति:** ${tkt.status.toUpperCase()}\n\nहमारा एजेंट 15-30 मिनट के भीतर आपसे संपर्क करेगा।`;
      } else if (lang === 'pa') {
        responseText = `### 🎧 ਸਪੋਰਟ ਟਿਕਟ ਬਣ ਗਈ ਹੈ: ${tkt.ticketNumber}\n\nਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਕਸਟਮਰ ਕੇਅਰ ਟੀਮ ਨੂੰ ਭੇਜ ਦਿੱਤੀ ਗਈ ਹੈ। ਸਾਡਾ ਨੁਮਾਇੰਦਾ ਜਲਦੀ ਹੀ ਸੰਪਰਕ ਕਰੇਗਾ।`;
      } else {
        responseText = `### 🎧 Support Ticket Created: ${tkt.ticketNumber}\n\nI have escalated your request to our senior customer support team.\n- **Ticket Number:** \`${tkt.ticketNumber}\`\n- **Priority:** **${tkt.priority.toUpperCase()}**\n- **Status:** **OPEN**\n\nA human specialist will reach out within 15-30 minutes.`;
      }
    }

    // 4. CART ACTIONS ("Add first one", "View cart", etc.)
    else if (context.isCartAction === 'add') {
      intent = 'cart_add';
      let targetPid = lastProductIds[0];
      if (context.productReferenceIndex !== undefined && lastProductIds[context.productReferenceIndex]) {
        targetPid = lastProductIds[context.productReferenceIndex];
      }
      if (!targetPid) {
        // Fallback to top phone or saree if no previous products
        const topItem = db.getProducts({ limit: 1 })[0];
        targetPid = topItem ? topItem.id : 'prod-mob-001';
      }

      const cartRes = await BharatShopTools.executeTool('addToCart', { productId: targetPid, quantity: 1 }, { userId, sessionId });
      toolCalls.push({ name: 'addToCart', arguments: { productId: targetPid }, result: cartRes });

      if (lang === 'hi' || lang === 'hinglish') {
        responseText = `✅ **${cartRes.added?.name || 'आइटम'}** आपके कार्ट में जोड़ दिया गया है!\n\n- **कार्ट कुल:** ₹${cartRes.cartTotal.toLocaleString('en-IN')}\n- **कुल आइटम:** ${cartRes.itemCount}\n\nक्या आप चेकआउट करना चाहते हैं या और खरीदारी जारी रखें?`;
      } else {
        responseText = `✅ **${cartRes.added?.name || 'Item'}** has been added to your cart!\n\n- **Current Cart Total:** ₹${cartRes.cartTotal.toLocaleString('en-IN')}\n- **Total Items:** ${cartRes.itemCount}\n\nWould you like to review your cart or continue shopping?`;
      }
    }

    // 5. PRODUCT COMPARISON ("Compare first and third", "Compare 1 and 2")
    else if (context.referencedProducts && context.referencedProducts.length >= 2) {
      intent = 'comparison';
      const idx1 = context.referencedProducts[0];
      const idx2 = context.referencedProducts[1];
      const p1Id = lastProductIds[idx1] || lastProductIds[0] || 'prod-mob-001';
      const p2Id = lastProductIds[idx2] || lastProductIds[1] || 'prod-mob-003';

      const compRes = await BharatShopTools.executeTool('compareProducts', { productIds: [p1Id, p2Id] }, { userId, sessionId });
      toolCalls.push({ name: 'compareProducts', arguments: { productIds: [p1Id, p2Id] }, result: compRes });

      const items = compRes.comparison;
      if (items.length >= 2) {
        const itemA = items[0];
        const itemB = items[1];

        if (lang === 'hi' || lang === 'hinglish') {
          responseText = `### ⚖️ तुलना: ${itemA.name} बनाम ${itemB.name}\n\n| विशेषता | ${itemA.brand} | ${itemB.brand} |\n| :--- | :--- | :--- |\n| **कीमत** | ₹${itemA.price.toLocaleString('en-IN')} | ₹${itemB.price.toLocaleString('en-IN')} |\n| **रेटिंग** | ${itemA.rating} ★ | ${itemB.rating} ★ |\n| **डिलीवरी** | ${itemA.delivery_days} दिन | ${itemB.delivery_days} दिन |\n\n**निष्कर्ष:**\n- यदि आपको **बजट और बैटरी** चाहिए, तो **${itemA.price < itemB.price ? itemA.name : itemB.name}** बेहतर विकल्प है।\n- यदि आपको **प्रीमियम कैमरा और फीचर्स** चाहिए, तो **${itemA.price >= itemB.price ? itemA.name : itemB.name}** चुने।`;
        } else if (lang === 'pa') {
          responseText = `### ⚖️ ਤੁਲਨਾ: ${itemA.name} ਅਤੇ ${itemB.name}\n\n- **ਕੀਮਤ:** ${itemA.brand} (₹${itemA.price}) ਬਨਾਮ ${itemB.brand} (₹${itemB.price})\n- **ਰੇਟਿੰਗ:** ${itemA.rating}★ ਬਨਾਮ ${itemB.rating}★\n\nਦੋਵਾਂ ਵਿੱਚੋਂ **${itemA.name}** ਜ਼ਿਆਦਾ ਵਧੀਆ ਬੈਟਰੀ ਅਤੇ ਵੈਲਿਊ ਦਿੰਦਾ ਹੈ!`;
        } else {
          responseText = `### ⚖️ Side-by-Side Comparison\n\n| Specification | ${itemA.name} | ${itemB.name} |\n| :--- | :--- | :--- |\n| **Brand** | ${itemA.brand} | ${itemB.brand} |\n| **Price** | ₹${itemA.price.toLocaleString('en-IN')} | ₹${itemB.price.toLocaleString('en-IN')} |\n| **Customer Rating** | ${itemA.rating} ★ | ${itemB.rating} ★ |\n| **Delivery Timeline** | ${itemA.delivery_days} Business Days | ${itemB.delivery_days} Business Days |\n\n**Trade-off Analysis:**\n- **Value & Battery:** **${itemA.name}** offers superior endurance and cost efficiency.\n- **Premium Camera/Design:** **${itemB.name}** delivers advanced imaging optics and curved display aesthetics.\n\n*Would you like to add either product to your cart?*`;
        }
      }
    }

    // 6. CONTEXTUAL FOLLOW-UP ("Battery aur camera mein best kaunsa hai?", "Hindi mein samjhao", "Punjabi vich samjhao")
    else if (
      lowerContains(message, ['battery aur camera', 'kaunsa best', 'which is better', 'hindi mein samjhao', 'punjabi vich', 'compare karo']) &&
      lastProductIds.length > 0
    ) {
      intent = 'comparison';
      const recentProducts = db.getProductsByIds(lastProductIds.slice(0, 3));
      const bestBattery = recentProducts.find((p) => p.specifications['Battery']?.toString().includes('6000') || p.specifications['Battery']?.toString().includes('5500')) || recentProducts[0];
      const bestCamera = recentProducts.find((p) => p.specifications['Camera']?.toString().includes('200MP') || p.specifications['Camera']?.toString().includes('Sony')) || recentProducts[0];

      if (lang === 'hi' || lang === 'hinglish') {
        responseText = `### 💡 आपके चुने हुए फोन्स का विश्लेषण:\n\n1. **बैटरी में सर्वश्रेष्ठ:** **${bestBattery.name}**\n   - बड़ी बैटरी बैकअप जो 1.5 से 2 दिन आसानी से चलती है।\n\n2. **कैमरा में सर्वश्रेष्ठ:** **${bestCamera.name}**\n   - OIS और Sony सेंसर के साथ स्पष्ट और जीवंत तस्वीरें।\n\n**सलाह:** यदि आप दिनभर भारी इस्तेमाल करते हैं तो **${bestBattery.name}** लें, और यदि फोटोग्राफी मुख्य प्राथमिकता है तो **${bestCamera.name}** चुनें। क्या आप पहले वाले को कार्ट में जोड़ना चाहते हैं?`;
      } else if (lang === 'pa') {
        responseText = `### 💡 ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਵਿਕਲਪ:\n\n- **ਬੈਟਰੀ ਲਈ:** **${bestBattery.name}** ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ, ਇਹ ਬਹੁਤ ਲੰਬਾ ਬੈਕਅੱਪ ਦਿੰਦਾ ਹੈ।\n- **ਕੈਮਰੇ ਲਈ:** **${bestCamera.name}** ਸ਼ਾਨਦਾਰ ਤਸਵੀਰਾਂ ਲੈਂਦਾ ਹੈ।\n\nਤੁਸੀਂ ਕਿਹੜਾ ਪਸੰਦ ਕਰੋਗੇ?`;
      } else {
        responseText = `### 💡 Trade-off Breakdown for Your Products:\n\n1. **Best for Battery Life:** **${bestBattery.name}**\n   - Exceptional endurance designed for heavy multitasking and long screen-on time.\n\n2. **Best for Photography:** **${bestCamera.name}**\n   - Superior optics with optical image stabilization and clear low-light portraits.\n\n*Would you like to compare both side-by-side or proceed to cart?*`;
      }
    }

    // 7. STRUCTURED PRODUCT SEARCH & RECOMMENDATIONS (Phones under 30k, Sarees under 2k, etc.)
    else {
      intent = 'product_search';
      const searchRes = await BharatShopTools.executeTool(
        'searchProducts',
        {
          category: context.category,
          maxPrice: context.maxPrice,
          color: context.color,
          size: context.size,
          limit: 6,
        },
        { userId, sessionId }
      );
      toolCalls.push({ name: 'searchProducts', arguments: { category: context.category, maxPrice: context.maxPrice }, result: searchRes });

      products = searchRes.products || [];

      if (products && products.length > 0) {
        const topPick = products[0];
        const budgetText = context.maxPrice ? `under ₹${context.maxPrice.toLocaleString('en-IN')}` : '';

        if (lang === 'hi' || lang === 'hinglish') {
          responseText = `नमस्ते! आपकी पसंद के अनुसार **${context.category || 'उत्पाद'}** ${budgetText} के बेहतरीन विकल्प तैयार हैं:\n\n**सर्वश्रेष्ठ चयन:** **${topPick.name}** (₹${topPick.price.toLocaleString('en-IN')})\n- **क्यों चुना गया:** ${topPick.why_recommended}\n\n*क्या आप पहले और दूसरे विकल्प की तुलना देखना चाहते हैं?*`;
        } else if (lang === 'pa') {
          responseText = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੇ ਬਜਟ (${budgetText}) ਮੁਤਾਬਕ ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣਾਂ ਇਹ ਹਨ:\n\n**ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ:** **${topPick.name}** (₹${topPick.price.toLocaleString('en-IN')})\n- **ਖਾਸੀਅਤ:** ${topPick.why_recommended}\n\nਕੀ ਤੁਸੀਂ ਪਹਿਲੇ ਅਤੇ ਦੂਜੇ ਦੀ ਤੁਲਨਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?`;
        } else {
          responseText = `Got it — here are the top curated ${context.category || 'products'} matching your criteria ${budgetText}:\n\n**Top Pick:** **${topPick.name}** — ₹${topPick.price.toLocaleString('en-IN')}\n**Why:** ${topPick.why_recommended}\n\n*Want me to compare the top 2 picks, or add the first one to your cart?*`;
        }
      } else {
        responseText = `I couldn't find an exact match for your search within the specified budget. Would you like me to broaden the filters or increase the budget slightly?`;
      }
    }

    return {
      text: responseText,
      language: lang,
      intent,
      products,
      toolCalls,
      provider: 'local_fallback',
      model: 'deterministic_rag_engine_v1',
      latencyMs: Date.now() - startTime,
    };
  }
}

function lowerContains(text: string, words: string[]): boolean {
  const l = text.toLowerCase();
  return words.some((w) => l.includes(w));
}
