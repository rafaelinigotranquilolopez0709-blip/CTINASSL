const db = require("../config/db");

const Category = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    return rows;
  },

  async create({ name, description }) {
    const [result] = await db.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description || ""]
    );
    return { id: result.insertId, name, description };
  },

  async remove(id) {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
  },
};

module.exports = Category;
