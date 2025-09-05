import { motion } from "framer-motion";
import { Film, Mail, Lock, Eye, EyeOff, User, FileText, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    showPass,
    setShowPass,
    apiError,
    isLoading,
    onSubmitRegister,
  } = useRegister();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cinema-red flex items-center justify-center shadow-cinema-glow">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Criar Conta no <span className="text-red-400">KinoLens</span></h1>
              <p className="text-sm text-gray-300">Seu assistente de cinema.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4">
            <FormField
              name="fullName"
              label="Nome Completo"
              placeholder="Seu nome completo"
              icon={User}
              register={register}
              errors={errors}
              validation={{ required: "O nome é obrigatório." }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                icon={FileText}
                register={register}
                errors={errors}
                validation={{ required: "O CPF é obrigatório." }}
              />
              <FormField
                name="birthDate"
                label="Data de Nascimento"
                type="date"
                icon={Calendar}
                register={register}
                errors={errors}
                validation={{ required: "A data de nascimento é obrigatória." }}
              />
            </div>

            <FormField
              name="email"
              label="E-mail"
              type="email"
              placeholder="voce@exemplo.com"
              icon={Mail}
              register={register}
              errors={errors}
              validation={{ 
                required: "Informe seu e-mail.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido." } 
              }}
            />

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
            
            {apiError && (<p className="text-sm text-red-400 text-center py-2 bg-red-900/20 rounded-md">{apiError}</p>)}

            <div className="space-y-3 pt-2">
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                <ArrowRight className="w-5 h-5" />
                {isLoading ? 'Processando...' : 'Criar Conta'}
              </Button>
            </div>
          </form>

           <p className="text-center text-sm text-gray-300 mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-red-400 hover:text-red-300 underline underline-offset-4">
              Faça login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}