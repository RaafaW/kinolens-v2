import React from 'react';
import { motion } from 'framer-motion';
import { Film, MessageCircle, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 backdrop-blur-sm bg-black/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Film className="text-red-500 w-8 h-8" />
            <h1 className="text-2xl font-bold text-white">
              Kino<span className="text-red-500">Lens</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
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
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <MessageCircle className="text-red-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Chat Inteligente</h3>
              <p className="text-gray-400">Converse sobre filmes, diretores, atores e receba recomendações personalizadas</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <Sparkles className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">IA Avançada</h3>
              <p className="text-gray-400">Tecnologia de ponta para análises profundas e insights únicos sobre cinema</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
              <Film className="text-red-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Base Cinematográfica</h3>
              <p className="text-gray-400">Conhecimento abrangente sobre história, gêneros e tendências do cinema mundial</p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Em breve: Experiência completa de chat
            </h3>
            <p className="text-red-100 mb-6">
              Estamos preparando uma experiência única para você explorar o cinema como nunca antes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Começar Chat (Em Breve)
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all duration-200"
              >
                Saiba Mais
              </motion.button>
            </div>
          </motion.div>

          {/* Tech Stack Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm">
              Construído com React, TypeScript, OpenAI GPT-4 e muito carinho pelo cinema ❤️
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;