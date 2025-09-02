import { chatBodySchema } from "../schemas/chat.schema.js";
import { chatCompletion } from "../services/chat.service.js";
import { enforceCinemaScope } from "../services/guardrails.js";

export async function postChat(req, res, next) {
  try {
    const parsed = chatBodySchema.safeParse(req.body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ");
      const err = new Error(msg);
      err.status = 400;
      err.expose = true;
      throw err;
    }

    const { message, history, language } = parsed.data;

    const scope = await enforceCinemaScope(message);
    if (!scope.ok) {
      return res.status(200).json({ ok: true, reply: scope.message, usage: null });
    }

    const { text, usage } = await chatCompletion({ message, history, language });
    return res.status(200).json({ ok: true, reply: text, usage });
  } catch (err) {
    next(err);
  }
}
