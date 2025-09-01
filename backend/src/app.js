import express from "express";
import helmet from "helmet";
import cors from "cors";
import env from "./config/env.js";
import routes from "./routes/index.js";
import { httpLogger } from "./utils/logger.js";
import { limiter } from "./middlewares/rateLimit.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const allowedList = String(env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

  const corsOptions = {
  origin(origin, cb) {
    // sem Origin (curl, apps nativas) -> permite
    if (!origin) return cb(null, true);
    // wildcard em dev
    if (allowedList.includes("*")) return cb(null, true);
    // lista explícita
    if (allowedList.length === 0 || allowedList.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use(httpLogger);
app.use(limiter);

// rotas
app.use("/", routes);

// handlers finais
app.use(notFound);
app.use(errorHandler);

export default app;