import http from "http";
import app from "./app.js";
import env from "./config/env.js";

const port = Number(process.env.PORT || env.PORT || 5000);
const host = "0.0.0.0";

const server = http.createServer(app);

server.keepAliveTimeout = 65_000; // > 60s
server.headersTimeout   = 66_000;
server.requestTimeout   = 60_000;

server.listen(port, host, () => {
  const mode = process.env.NODE_ENV || env.NODE_ENV || "development";
  console.log(`KinoLens API ouvindo na porta ${port} [${mode}]`);
});

// Shutdown gracioso (SIGTERM/SIGINT)
function shutdown(signal) {
  console.log(`[${signal}] recebida. Encerrando...`);
  server.close(err => {
    if (err) {
      console.error("Erro ao fechar servidor:", err);
      process.exit(1);
    }
    console.log("Servidor encerrado com segurança.");
    process.exit(0);
  });
  // hard timeout de segurança
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));
