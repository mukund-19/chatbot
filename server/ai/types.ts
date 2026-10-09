import { RecommendedProduct, ToolCall } from '../../src/types/index';

export interface ChatRequestOptions {
  sessionId: string;
  userId?: string;
  message: string;
  language?: string;
  personalizationEnabled?: boolean;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  lastProductIds?: string[];
}

export interface ChatResponseOutput {
  text: string;
  language: string;
  intent: string;
  products?: RecommendedProduct[];
  toolCalls?: ToolCall[];
  provider: 'gemini' | 'groq' | 'local_fallback';
  model: string;
  latencyMs: number;
}

export interface AIProvider {
  name: string;
  generateResponse(options: ChatRequestOptions): Promise<ChatResponseOutput>;
}
