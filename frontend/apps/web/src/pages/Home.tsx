import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button"; // Usando o componente de botão

// O Header e Footer foram removidos daqui

export default function Home() {
  const navigate = useNavigate();
  const goToChat = () => navigate("/chat");

  return (
    // A div principal e o background agora são controlados pelo componente Layout
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={goToChat}>
              <MessageCircle className="w-6 h-6" />
              Conversar Agora
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}