import { motion } from "framer-motion";
import { Film, Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "../ui/Button"; // 1. Importe o componente Button

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    showPass,
    setShowPass,
    apiError,
    isLoading,
    onSubmitLogin,
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cinema-red flex items-center justify-center shadow-cinema-glow">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Entrar no <span className="text-red-400">KinoLens</span></h1>
              <p className="text-sm text-gray-300">Seu assistente de cinema.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-200">E-mail</span>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="email"
                  placeholder="voce@exemplo.com"
                  {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido." } })}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-red-500 focus:outline-none"
                />
              </div>
              {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
            </label>
            <label className="block">
              <span className="text-sm text-gray-200">Senha</span>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: "Informe sua senha.", minLength: { value: 6, message: "Mínimo de 6 caracteres." } })}
                  className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-red-500 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white" aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}>
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
            </label>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-300 select-none">
                <input type="checkbox" {...register("remember")} className="accent-red-600" />
                Lembrar de mim
              </label>
              <button type="button" className="text-sm text-red-400 hover:text-red-300 underline underline-offset-4">Esqueci minha senha</button>
            </div>
            {apiError && (<p className="text-sm text-red-400 text-center py-2">{apiError}</p>)}

            <div className="space-y-3 pt-2">
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                <LogIn className="w-5 h-5" />
                {isLoading ? 'Processando...' : 'Entrar'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/register')}
                disabled={isLoading}
              >
                <UserPlus className="w-5 h-5" />
                Criar conta
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/60">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button type="button" variant="secondary" className="w-full">
              Continuar com Google
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
      </motion.div>
    </div>
  );
}