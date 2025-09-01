import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  feedback?: 'up' | 'down';
}

interface ChatResponse {
  message: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! 🎬 Eu sou o KinoLens, seu assistente especializado em cinema. Posso ajudar você com recomendações de filmes, análises cinematográficas, discussões sobre diretores, curiosidades do cinema e muito mais. Como posso ajudá-lo hoje?',
      sender: 'assistant',
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
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Log de tokens para debug
      if (data.usage) {
        console.log('📊 Token Usage:', {
          input: data.usage.prompt_tokens,
          output: data.usage.completion_tokens,
          total: data.usage.total_tokens
        });
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );

    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          feedback,
          message: messages.find(m => m.id === messageId)?.text
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-cinema-dark-gray to-cinema-burgundy">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-cinema-red/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-10 h-10 bg-cinema-red rounded-full flex items-center justify-center mr-3">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">KinoLens</h1>
            <p className="text-cinema-gray/80 text-sm">Seu assistente especializado em cinema</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'assistant' && (
                <div className="w-8 h-8 bg-cinema-red rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-cinema-red text-white ml-12'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  
                  {message.sender === 'assistant' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFeedback(message.id, 'up')}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${
                          message.feedback === 'up' ? 'text-green-400' : 'text-white/60'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'down')}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${
                          message.feedback === 'down' ? 'text-red-400' : 'text-white/60'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-cinema-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-cinema-black" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 bg-cinema-red rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Pensando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-cinema-red/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte sobre filmes, diretores, recomendações..."
              className="flex-1 bg-transparent text-white placeholder-white/60 resize-none outline-none min-h-[20px] max-h-32"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 bg-cinema-red rounded-full flex items-center justify-center hover:bg-cinema-red/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};