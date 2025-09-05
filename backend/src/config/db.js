import pg from "pg";
import env from "./env.js";

const connectionConfig = {
  connectionString: process.env.DATABASE_URL || env.DATABASE_URL,
  client_encoding: 'UTF8',
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new pg.Pool(connectionConfig);

export const db = {
  query: (text, params) => pool.query(text, params),
};