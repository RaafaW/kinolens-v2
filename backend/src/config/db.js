import pg from "pg";
import env from "./env.js";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = {
  query: (text, params) => pool.query(text, params),
};