import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Bot, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ChatMessageProps } from '@/types';

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex items-start gap-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="w-8 h-8 bg-cinema-red rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-xl px-4 py-3 rounded-2xl ${
          isAssistant
            ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
            : 'bg-cinema-red text-white ml-12'
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[gfm]}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="underline">{children}</a>,
          }}
        >
          {message.content}
        </ReactMarkdown>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-60">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isAssistant && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onFeedback(message.id, 'positive')}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${
                  message.feedback === 'positive' ? 'text-green-400' : 'text-white/60'
                }`}
                title="Útil"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onFeedback(message.id, 'negative')}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${
                  message.feedback === 'negative' ? 'text-red-400' : 'text-white/60'
                }`}
                title="Não ajudou"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 bg-cinema-gold rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-cinema-black" />
        </div>
      )}
    </div>
  );
};