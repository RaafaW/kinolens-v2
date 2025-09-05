import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model.js';
import env from "../config/env.js";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

const uniqueConstraintMessages = {
  users_email_key: "Este e-mail já está em uso.",
  users_cpf_key: "Este CPF já está em uso."
};

export async function register(req, res, next) {
  const requiredFields = ['email', 'password', 'cpf', 'fullName', 'birthDate'];
  const userData = {};

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `O campo '${field}' é obrigatório.` });
    }
    userData[field] = req.body[field];
  }

  const cleanedCpf = cpfValidator.strip(userData.cpf);

  if (!cpfValidator.isValid(cleanedCpf)) {
    return res.status(400).json({ message: "CPF inválido. Verifique o número digitado." });
  }

  if (userData.password.length < 6) {
    return res.status(400).json({ message: "A senha deve ter no mínimo 6 caracteres." });
  }

  try {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const newUserPayload = {
      email: userData.email,
      password_hash: passwordHash,
      cpf: cleanedCpf,
      full_name: userData.fullName,
      birth_date: userData.birthDate
    };

    const newUser = await UserModel.create(newUserPayload);
    return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });

  } catch (error) {
    console.error("ERRO DETALHADO AO REGISTRAR USUÁRIO:", error); 
    
    if (error.code === '23505' && error.constraint) {
      const message = uniqueConstraintMessages[error.constraint];
      if (message) {
        return res.status(409).json({ message });
      }
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
      return res.status(401).json({ message: "Credenciais inválidas." });
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