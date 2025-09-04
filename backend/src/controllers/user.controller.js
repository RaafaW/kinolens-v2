import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

export async function register(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: "E-mail e uma senha com no mínimo 6 caracteres são obrigatórios." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );

    const newUser = result.rows[0];
    return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });

  } catch (error) {
    console.error("ERRO DETALHADO AO REGISTRAR USUÁRIO:", error); 
    if (error.code === '23505') {
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }
    next(error);
  }
}