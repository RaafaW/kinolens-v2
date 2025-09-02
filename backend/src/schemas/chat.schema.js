import { z } from "zod";

export const messageRoleSchema = z.enum(["user", "assistant", "system"]);

export const historyItemSchema = z.object({
  role: messageRoleSchema,
  content: z.string().min(1)
});

export const chatBodySchema = z.object({
  message: z.string().min(1, "message é obrigatório"),
  history: z.array(historyItemSchema).optional(),
  language: z.enum(["pt", "en"]).optional()
});
