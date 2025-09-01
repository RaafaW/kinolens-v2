import OpenAI from "openai";
import env from "./env.js";

let _client;
export function getOpenAI() {
  if (!_client) _client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  return _client;
}
