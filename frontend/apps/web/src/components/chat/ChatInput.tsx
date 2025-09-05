import React from 'react';
import { Send } from 'lucide-react';
import type { ChatInputProps } from '@/types';

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border-t border-cinema-red/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-3">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre filmes, diretores, recomendações."
            className="flex-1 bg-transparent text-white placeholder-white/60 resize-none outline-none min-h-[20px] max-h-32"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 bg-cinema-red rounded-full flex items-center justify-center hover:bg-cinema-red/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Enviar"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};