import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-cinema-red/20 p-4">
      <div className="max-w-4xl mx-auto flex items-center">
        <div className="w-10 h-10 bg-cinema-red rounded-full flex items-center justify-center mr-3">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">KinoLens</h1>
          <p className="text-cinema-gray/80 text-sm">
            Seu assistente especializado em cinema
          </p>
        </div>
      </div>
    </div>
  );
}