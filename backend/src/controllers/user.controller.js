import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model.js';
import env from "../config/env.js";

export async function register(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: "E-mail e uma senha com no mínimo 6 caracteres são obrigatórios." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ email, passwordHash });
    return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });

  } catch (error) {
    console.error("ERRO DETALHADO AO REGISTRAR USUÁRIO:", error); 
    if (error.code === '23505') {
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }
    next(error);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    const user = await UserModel.findByEmail(email); 

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." }); // 401 Unauthorized
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    delete user.password_hash;

    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user,
    });

  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
    next(error);
  }
}