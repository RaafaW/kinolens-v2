import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { sendChat, sendFeedback as sendFeedbackApi } from "@/services/chat.service";
import type { HistoryItem, Role, ChatMessage as ChatMessageType } from '@/types';

import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      content:
        'Olá! 🎬 Eu sou o KinoLens, seu assistente especializado em cinema. Posso ajudar você com recomendações de filmes, análises cinematográficas, discussões sobre diretores, curiosidades do cinema e muito mais. Como posso ajudá-lo hoje?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history: HistoryItem[] = [...messages, userMessage].map((m) => ({
        role: m.role as Role,
        content: m.content,
      }));

      const data = await sendChat({
        message: userMessage.content,
        history,
        language: 'pt',
      });

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errMsg = (error as Error)?.message || 'Erro inesperado';
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: `Desculpe, ocorreu um erro: ${errMsg}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)),
    );
    try {
      await sendFeedbackApi({
        messageId,
        feedback: feedback === 'positive' ? 'up' : 'down',
        message: messages.find((m) => m.id === messageId)?.content || '',
      });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-cinema-dark-gray to-cinema-burgundy">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onFeedback={handleFeedback}
            />
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 bg-cinema-red rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Pensando…</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};