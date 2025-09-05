import { motion } from "framer-motion";
import { Film, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="text-red-500 w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">
                Kino<span className="text-red-500">Lens</span>
              </h1>
            </div>

            {/* Botão do header */}
            <button onClick={goToChat} className="btn-cinema flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Iniciar Chat
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {/* ... Seção visual do Hero não muda ... */}
            <div className="flex justify-center mb-8">
              {/* ... Ícone do filme ... */}
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Bem-vindo ao
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                KinoLens
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Seu assistente inteligente para descobrir, discutir e explorar o fascinante mundo do cinema
            </p>

            {/* Botão principal */}
            <motion.button
              onClick={goToChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-cinema text-lg px-8 py-4 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Conversar Agora
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-800/30 bg-black/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Construído com React, TypeScript, OpenAI GPT-4o e muito carinho pelo cinema ❤️
          </p>
          <p className="text-gray-600 text-xs mt-2">KinoLens v0.1.0 • Powered by OpenAI</p>
        </div>
      </footer>
    </div>
  );
}