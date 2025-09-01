import http from "http";
import app from "./app.js";
import env from "./config/env.js";

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`KinoLens API rodando em http://localhost:${env.PORT} [${env.NODE_ENV}]`);
});
