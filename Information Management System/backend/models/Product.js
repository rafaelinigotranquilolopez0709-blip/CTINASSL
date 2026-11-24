const db = require("../config/db");

const Product = {
  async findAll() {
    const [rows] = await db.query(`
      SELECT p.*, c.name AS category_name, s.name AS supplier_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      ORDER BY p.id DESC
    `);
    return rows;
  },

  async create({ name, sku, category_id, supplier_id, stock_quantity, price }) {
    const [result] = await db.query(
      `INSERT INTO products (name, sku, category_id, supplier_id, stock_quantity, price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, sku || null, category_id || null, supplier_id || null, stock_quantity, price]
    );
    return { id: result.insertId, name, sku, category_id, supplier_id, stock_quantity, price };
  },

  async update(id, { name, sku, category_id, supplier_id, stock_quantity, price }) {
    await db.query(
      `UPDATE products
       SET name = ?, sku = ?, category_id = ?, supplier_id = ?, stock_quantity = ?, price = ?
       WHERE id = ?`,
      [name, sku || null, category_id || null, supplier_id || null, stock_quantity, price, id]
    );
  },

  async remove(id) {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
  },
};

module.exports = Product;
