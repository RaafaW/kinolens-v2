import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || "development",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_EMBED_MODEL: process.env.OPENAI_EMBED_MODEL,
  EMBED_THRESHOLD: Number(process.env.EMBED_THRESHOLD),
  ENABLE_LLM_GUARD: process.env.ENABLE_LLM_GUARD,
  OPENAI_MODEL_GUARD: process.env.OPENAI_MODEL_GUARD,
};

if (!env.OPENAI_API_KEY) {
  console.error("Faltando OPENAI_API_KEY no .env");
  process.exit(1);
}

export default env;
