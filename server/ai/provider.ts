import { AIProvider, ChatRequestOptions, ChatResponseOutput } from './types';
import { GeminiAIProvider } from './gemini';
import { GroqAIProvider } from './groq';
import { DeterministicFallbackEngine } from './fallback';

export class AIProviderManager {
  private static instance: AIProviderManager;
  private currentProvider: AIProvider;

  private constructor() {
    const providerName = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();

    if (providerName === 'groq' && process.env.GROQ_API_KEY) {
      this.currentProvider = new GroqAIProvider();
    } else if (providerName === 'gemini') {
      this.currentProvider = new GeminiAIProvider();
    } else {
      this.currentProvider = {
        name: 'local_fallback',
        generateResponse: (opts: ChatRequestOptions) => DeterministicFallbackEngine.execute(opts),
      };
    }
  }

  public static getInstance(): AIProviderManager {
    if (!AIProviderManager.instance) {
      AIProviderManager.instance = new AIProviderManager();
    }
    return AIProviderManager.instance;
  }

  public getProviderName(): string {
    return this.currentProvider.name;
  }

  public async generateResponse(options: ChatRequestOptions): Promise<ChatResponseOutput> {
    try {
      return await this.currentProvider.generateResponse(options);
    } catch (err) {
      console.error('Unhandled provider failure in AIProviderManager, falling back:', err);
      return DeterministicFallbackEngine.execute(options);
    }
  }
}
