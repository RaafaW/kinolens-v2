import { getOpenAI } from "../config/openai.js";

/**
 * Palavras que indicam cinema (pt/en).
 * Ajuste conforme necessário.
 */
const ALLOW_HINTS = [
  "filme","filmes","cinema","movie","film",
  "diretor","diretora","director","atriz","ator","cast","elenco",
  "cena","sinopse","roteiro","screenplay","trilha","soundtrack",
  "gênero","genero","noir","sci-fi","ficção científica","terror","drama","comédia","acao","ação",
  "fotografia","cinematografia","montagem","edição",
  "franquia","saga","trilogia","prequel","sequel","remake","reboot",
  "oscar","bafta","cannes","sundance","premio","prêmio","award",
  "longa","curta","documentário","animação",
  "onde assistir","streaming","netflix","prime video","hbo","mubi","globoplay","disney"
];

export function isCinemaHeuristic(text) {
  const t = (text || "").toLowerCase();
  const allow = ALLOW_HINTS.some(k => t.includes(k));
  return { ok: allow };
}

/**
 * Classificador opcional via LLM (barato/rápido).
 * Habilite com ENABLE_LLM_GUARD=true no .env.
 */
async function isCinemaWithLLM(text) {
  const client = getOpenAI();
  const prompt = `Classifique se a pergunta abaixo é sobre CINEMA.
Responda **apenas** com "cinema" ou "fora".
Escopo de cinema: filmes, diretores, atores, gêneros, cenas, sinopses, história do cinema, festivais, prêmios, recomendações, identificação de filmes e onde assistir.

Pergunta: """${text}"""`;
  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_GUARD || "gpt-4o-mini",
    temperature: 0,
    messages: [{ role: "user", content: prompt }]
  });
  const out = resp.choices?.[0]?.message?.content?.toLowerCase() || "";
  return out.includes("cinema");
}

/**
 * Enforce de escopo: tenta heurística; se não aprovar e
 * ENABLE_LLM_GUARD=true, tenta LLM. Retorna mensagem de recusa pronta.
 */
export async function enforceCinemaScope(text) {
  const h = isCinemaHeuristic(text);
  if (h.ok) return { ok: true };

  if (process.env.ENABLE_LLM_GUARD === "true") {
    try {
      const ok = await isCinemaWithLLM(text);
      if (ok) return { ok: true };
    } catch { /* silencia e cai na recusa */ }
  }

  return {
    ok: false,
    message:
      "Posso ajudar apenas com **cinema** (filmes, diretores, atores, gêneros, cenas, prêmios, festivais, onde assistir, etc.). " +
      "Reformule sua pergunta dentro desse contexto."
  };
}
