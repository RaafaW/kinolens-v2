import { getOpenAI } from "../config/openai.js";
import { getSystemPrompt } from "./prompt.js";
import env from "../config/env.js";

export async function chatCompletion({ message, history = [], language = "pt" }) {
  const client = getOpenAI();

  const messages = [
    { role: "system", content: getSystemPrompt({ lang: language }) },
    ...(Array.isArray(history) ? history : []),
    { role: "user", content: message }
  ];

  try {
    const resp = await client.chat.completions.create({
      model: env.OPENAI_MODEL,
      temperature: 1,
      messages,
    });

    const choice = resp.choices?.[0]?.message?.content || "";
    const usage = resp.usage || {};
  
    return { text: choice, usage };
  } catch (error) {
    console.error("Erro na chamada para a API da OpenAI:", error.response?.data || error.message)
    throw new Error("Falha ao se comunicar com a API da OpenAI.")
  }
}
