import { db } from '../config/db.js';

const RETURNING_COLUMNS = 'id, email, cpf, created_at, full_name, birth_date';

export const UserModel = {
  /**
   * Finds a user by their email.
   * @param {string} email The user's email.
   * @returns {Promise<object|null>} The user object or null if not found.
   */
  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  },

  /**
   * Creates a new user.
   * @param {object} userData The user data.
   * @returns {Promise<object>} The newly created user object.
   */
  async create(userData) {
    const columns = Object.keys(userData).join(', ');
    const placeholders = Object.keys(userData).map((_, i) => `$${i + 1}`).join(', ');
    const values = Object.values(userData);

    const query = `
      INSERT INTO users (${columns}) 
      VALUES (${placeholders}) 
      RETURNING ${RETURNING_COLUMNS}
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  }
};