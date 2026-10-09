import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeroScreen } from '../components/chat/HeroScreen';
import { ChatThread } from '../components/chat/ChatThread';
import { useApp } from '../contexts/AppContext';
import { ChatSession, ChatMessage } from '../types/index';
import { api } from '../lib/api';

export const ChatPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();
  const {
    chatSessions,
    activeChatId,
    setActiveChatId,
    userProfile,
    currentLanguage,
    personalizationEnabled,
    showToast,
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Sync active chat session
  useEffect(() => {
    if (sessionId) {
      setActiveChatId(sessionId);
      const session = chatSessions.find((s) => s.id === sessionId);
      if (session) {
        setMessages(session.messages || []);
      }
    } else {
      setActiveChatId(null);
      setMessages([]);
    }
  }, [sessionId, chatSessions]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    setInputPrompt('');
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      sender: 'user',
      content: textToSend,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      created_at: new Date().toISOString(),
    };

    const newMessagesList = [...messages, userMessage];
    setMessages(newMessagesList);

    let currentSessionId = activeChatId;
    if (!currentSessionId) {
      currentSessionId = `chat-${Date.now()}`;
      setActiveChatId(currentSessionId);
      navigate(`/chat/${currentSessionId}`, { replace: true });
    }

    // Extract product IDs currently visible in this chat thread for conversational reference
    const lastProductIds = messages
      .flatMap((m) => (m.products ? m.products.map((p) => p.id) : []))
      .slice(-6);

    try {
      const response = await api.sendChatMessage({
        sessionId: currentSessionId,
        message: textToSend,
        language: currentLanguage,
        personalizationEnabled,
        userId: userProfile.user_id,
        history: messages.map((m) => ({
          role: m.role === 'user' || m.sender === 'user' ? 'user' : 'assistant',
          content: m.content || m.text || '',
        })),
        lastProductIds,
      });

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        role: 'assistant',
        sender: 'bot',
        content: response.text,
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        created_at: new Date().toISOString(),
        language: response.language,
        intent: response.intent,
        products: response.products,
        tool_calls: response.toolCalls,
        model: response.model,
        latency_ms: response.latencyMs,
      };

      const finalMessages = [...newMessagesList, assistantMessage];
      setMessages(finalMessages);

      // Persist session to server
      const titleSummary = textToSend.length > 36 ? `${textToSend.slice(0, 36)}...` : textToSend;
      const updatedSession: ChatSession = {
        id: currentSessionId,
        user_id: userProfile.user_id,
        title: titleSummary,
        timeGroup: 'Today',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: finalMessages,
      };
      await api.saveSession(updatedSession).catch(() => {});
    } catch (err: any) {
      showToast('Assistant temporarily unavailable. Please try again.');
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'assistant',
        sender: 'bot',
        content: "I'm having a slight trouble reaching the server right now. You can still search products in the Explore Catalog or check your cart.",
        text: "I'm having a slight trouble reaching the server right now. You can still search products in the Explore Catalog or check your cart.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        created_at: new Date().toISOString(),
      };
      setMessages([...newMessagesList, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {messages.length === 0 ? (
        <HeroScreen
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSubmitPrompt={handleSendMessage}
          isLoading={isLoading}
        />
      ) : (
        <ChatThread
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
