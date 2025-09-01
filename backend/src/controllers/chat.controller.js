import { chatBodySchema } from "../schemas/chat.schema.js";
import { chatCompletion } from "../services/chat.service.js";

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
    const { text, usage } = await chatCompletion({ message, history, language });

    res.json({ ok: true, reply: text, usage });
  } catch (err) {
    next(err);
  }
}
