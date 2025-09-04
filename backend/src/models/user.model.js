import { db } from '../config/db.js';

export const UserModel = {

  /**
   * Finds a user by their email.
   * @param {string} email The user's email.
   * @returns {Promise<object|null>} The user object or null if not found.
   */
  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  },

  /**
   * Creates a new user.
   * @param {object} userData The user data.
   * @param {string} userData.email The new user's email.
   * @param {string} userData.passwordHash The new user's hashed password.
   * @returns {Promise<object>} The newly created user object.
   */
  async create({ email, passwordHash }) {
    const result = await db.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, passwordHash]
    );
    return result.rows[0];
  }
};