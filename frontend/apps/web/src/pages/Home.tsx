import { motion } from "framer-motion";
import { Film, MessageCircle, Sparkles, ArrowDown } from "lucide-react";
import { ChatContainer } from "../components/chat/ChatContainer";
import { useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const scrollToChat = () => {
    setShowChat(true);
    setTimeout(() => {
      document.getElementById("chat-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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

            <button onClick={scrollToChat} className="btn-cinema flex items-center gap-2">
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
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                  <Film className="text-white w-12 h-12" />
                </div>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="text-yellow-400 w-8 h-8" />
                </motion.div>
              </motion.div>
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

            <motion.button
              onClick={scrollToChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-cinema text-lg px-8 py-4 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Conversar Agora
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <MessageCircle className="text-red-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Chat Inteligente</h3>
              <p className="text-gray-400">
                Converse sobre filmes, diretores, atores e receba recomendações personalizadas
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <Sparkles className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">IA Avançada</h3>
              <p className="text-gray-400">GPT-4o especializado em cinema com conhecimento abrangente</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <Film className="text-red-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Base Cinematográfica</h3>
              <p className="text-gray-400">
                Análises profundas sobre história, gêneros e tendências do cinema mundial
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Chat Section */}
      <section id="chat-section" className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showChat ? 1 : 0, y: showChat ? 0 : 30 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">🎬 Converse com a IA Especializada</h2>
            <p className="text-gray-300">
              Faça perguntas sobre filmes, peça recomendações ou discuta análises cinematográficas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: showChat ? 1 : 0, scale: showChat ? 1 : 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {showChat && <ChatContainer />}
          </motion.div>
        </div>
      </section>

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