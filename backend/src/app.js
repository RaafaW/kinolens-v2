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
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(httpLogger);
app.use(limiter);

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
