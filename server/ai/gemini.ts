import { GoogleGenAI } from '@google/genai';
import { BHARATSHOP_SYSTEM_INSTRUCTION } from './prompts';
import { DeterministicFallbackEngine } from './fallback';
import { LanguageNormalizer } from './normalizer';
import { BharatShopTools } from './tools';
import { AIProvider, ChatRequestOptions, ChatResponseOutput } from './types';
import { ToolCall } from '../../src/types/index';

export class GeminiAIProvider implements AIProvider {
  public name = 'gemini';
  private client: GoogleGenAI | null = null;
  private modelName: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    this.modelName = process.env.LLM_MODEL || 'gemini-3.8-flash';
    if (apiKey) {
      try {
        this.client = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'bharatshop-ai',
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize GoogleGenAI client:', err);
      }
    }
  }

  public async generateResponse(options: ChatRequestOptions): Promise<ChatResponseOutput> {
    const startTime = Date.now();

    // 1. If no client or API key, invoke the structured deterministic fallback engine
    if (!this.client || !process.env.GEMINI_API_KEY) {
      return DeterministicFallbackEngine.execute(options);
    }

    try {
      const { message, history = [], sessionId, userId = 'usr-demo-001', lastProductIds = [] } = options;
      const normContext = LanguageNormalizer.normalize(message);
      const userLang = options.language && options.language !== 'auto' ? options.language : normContext.detectedLanguage;

      // 2. Pre-tool grounding: query tools based on intent
      const toolCalls: ToolCall[] = [];
      let toolContextStr = '';
      let candidateProducts = undefined;

      if (normContext.isOrderQuery || normContext.orderNumberQuery) {
        const orderNum = normContext.orderNumberQuery || 'ORD-10025';
        const res = await BharatShopTools.executeTool('getOrderStatus', { orderNumber: orderNum }, { userId, sessionId });
        toolCalls.push({ name: 'getOrderStatus', arguments: { orderNumber: orderNum }, result: res });
        toolContextStr = `[DATABASE TOOL EXECUTION RESULT: getOrderStatus(${orderNum})]\n${JSON.stringify(res, null, 2)}`;
      } else if (normContext.isPolicyQuery && normContext.policyType) {
        const res = await BharatShopTools.executeTool('getPolicy', { type: normContext.policyType, language: userLang }, { userId, sessionId });
        toolCalls.push({ name: 'getPolicy', arguments: { type: normContext.policyType }, result: res });
        toolContextStr = `[DATABASE POLICY RAG CONTEXT: getPolicy(${normContext.policyType})]\n${JSON.stringify(res, null, 2)}`;
      } else if (normContext.isCartAction === 'add') {
        const pid = (normContext.productReferenceIndex !== undefined && lastProductIds[normContext.productReferenceIndex])
          ? lastProductIds[normContext.productReferenceIndex]
          : lastProductIds[0] || 'prod-mob-001';
        const res = await BharatShopTools.executeTool('addToCart', { productId: pid, quantity: 1 }, { userId, sessionId });
        toolCalls.push({ name: 'addToCart', arguments: { productId: pid }, result: res });
        toolContextStr = `[DATABASE ACTION COMPLETED: addToCart(${pid})]\n${JSON.stringify(res, null, 2)}`;
      } else if (normContext.referencedProducts && normContext.referencedProducts.length >= 2) {
        const pids = [
          lastProductIds[normContext.referencedProducts[0]] || lastProductIds[0] || 'prod-mob-001',
          lastProductIds[normContext.referencedProducts[1]] || lastProductIds[1] || 'prod-mob-002',
        ];
        const res = await BharatShopTools.executeTool('compareProducts', { productIds: pids }, { userId, sessionId });
        toolCalls.push({ name: 'compareProducts', arguments: { productIds: pids }, result: res });
        toolContextStr = `[DATABASE SPECIFICATION COMPARISON RESULT]\n${JSON.stringify(res, null, 2)}`;
      } else {
        // Product Search & Recommendation
        const searchRes = await BharatShopTools.executeTool(
          'searchProducts',
          {
            query: normContext.category ? undefined : message,
            category: normContext.category,
            maxPrice: normContext.maxPrice,
            color: normContext.color,
            size: normContext.size,
            limit: 6,
          },
          { userId, sessionId, lastProductIds }
        );
        toolCalls.push({ name: 'searchProducts', arguments: { query: message, maxPrice: normContext.maxPrice }, result: searchRes });
        candidateProducts = searchRes.products;
        toolContextStr = `[DATABASE REAL PRODUCT CATALOGUE RESULTS (Count: ${searchRes.count})]\n${JSON.stringify(searchRes.products, null, 2)}`;
      }

      // Build conversation turns
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }],
        });
      }

      const promptWithGrounding = `${toolContextStr}\n\n[USER INQUIRY in language '${userLang}']:\n${message}\n\nInstructions: Respond to the customer in language '${userLang}' matching their tone. Ground every statement strictly in the provided database results. Never fabricate products, prices, or fake statuses. Keep response concise, structured, and helpful.`;

      contents.push({
        role: 'user',
        parts: [{ text: promptWithGrounding }],
      });

      const response = await this.client.models.generateContent({
        model: this.modelName,
        contents,
        config: {
          systemInstruction: BHARATSHOP_SYSTEM_INSTRUCTION,
          temperature: 0.3, // Low temperature for high factual precision
        },
      });

      const responseText = response.text || 'I retrieved the information from our catalog. How else may I assist your shopping today?';

      return {
        text: responseText,
        language: userLang,
        intent: normContext.isOrderQuery ? 'order_status' : normContext.isPolicyQuery ? 'policy' : 'recommendation',
        products: candidateProducts,
        toolCalls,
        provider: 'gemini',
        model: this.modelName,
        latencyMs: Date.now() - startTime,
      };
    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to deterministic application engine:', apiError?.message || apiError);
      return DeterministicFallbackEngine.execute(options);
    }
  }
}
