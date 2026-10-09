import { AIProvider, ChatRequestOptions, ChatResponseOutput } from './types';
import { DeterministicFallbackEngine } from './fallback';
import { BHARATSHOP_SYSTEM_INSTRUCTION } from './prompts';

export class GroqAIProvider implements AIProvider {
  public name = 'groq';
  private apiKey: string | undefined;
  private modelName: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY;
    this.modelName = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  public async generateResponse(options: ChatRequestOptions): Promise<ChatResponseOutput> {
    if (!this.apiKey) {
      return DeterministicFallbackEngine.execute(options);
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: [
            { role: 'system', content: BHARATSHOP_SYSTEM_INSTRUCTION },
            { role: 'user', content: options.message },
          ],
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq HTTP error ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';

      return {
        text: content,
        language: options.language || 'en',
        intent: 'general_help',
        provider: 'groq',
        model: this.modelName,
        latencyMs: 320,
      };
    } catch (err) {
      console.warn('Groq API invocation failed, falling back to deterministic engine:', err);
      return DeterministicFallbackEngine.execute(options);
    }
  }
}
