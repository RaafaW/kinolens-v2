import { Film, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export function Header() {
  const navigate = useNavigate();
  const goToChat = () => navigate("/chat");

  return (
    <header className="border-b border-red-800/30 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="text-red-500 w-8 h-8" />
            <h1 className="text-2xl font-bold text-white">
              Kino<span className="text-red-500">Lens</span>
            </h1>
          </div>
          <Button onClick={goToChat} className="px-4 py-2 text-base"> {/* Estilos ajustados para o header */}
            <MessageCircle className="w-5 h-5" />
            Iniciar Chat
          </Button>
        </div>
      </div>
    </header>
  );
}