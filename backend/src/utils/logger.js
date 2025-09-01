import morgan from "morgan";

// Logs concisos em prod, detalhados em dev
export const httpLogger = morgan(process.env.NODE_ENV === "production" ? "combined" : "dev");
