import { getOpenAI } from "../config/openai.js";
import { getSystemPrompt } from "./prompt.js";

export async function chatCompletion({ message, history = [], language = "pt" }) {
  const client = getOpenAI();

  const messages = [
    { role: "system", content: getSystemPrompt({ lang: language }) },
    ...(Array.isArray(history) ? history : []),
    { role: "user", content: message }
  ];

  const resp = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.4,
    messages
  });

  const choice = resp.choices?.[0]?.message?.content || "";
  const usage = resp.usage || {};

  return { text: choice, usage };
}
