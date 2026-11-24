const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

exports.getDashboard = async (req, res) => {
  try {
    const products = await Product.findAll();
    const categories = await Category.findAll();
    const suppliers = await Supplier.findAll();

    const totalProducts = products.length;
    const lowStockCount = products.filter((p) => p.stock_quantity <= 15).length;
    const totalValue = products.reduce(
      (sum, p) => sum + Number(p.price) * Number(p.stock_quantity),
      0
    );

    res.render("dashboard", {
      totalProducts,
      lowStockCount,
      totalCategories: categories.length,
      totalSuppliers: suppliers.length,
      totalValue,
      products,
    });
  } catch (err) {
    res.status(500).send("Error loading dashboard: " + err.message);
  }
};

exports.getProductsPage = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("products", { products });
  } catch (err) {
    res.status(500).send("Error loading products: " + err.message);
  }
};

exports.getAddProductPage = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const suppliers = await Supplier.findAll();
    res.render("add-product", { categories, suppliers });
  } catch (err) {
    res.status(500).send("Error loading add product form: " + err.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/products");
  } catch (err) {
    res.status(500).send("Error saving product: " + err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.remove(req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(500).send("Error deleting product: " + err.message);
  }
};

exports.getCategoriesPage = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("categories", { categories });
  } catch (err) {
    res.status(500).send("Error loading categories: " + err.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error creating category: " + err.message);
  }
};

exports.getSuppliersPage = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.render("suppliers", { suppliers });
  } catch (err) {
    res.status(500).send("Error loading suppliers: " + err.message);
  }
};

exports.createSupplier = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send("Error creating supplier: " + err.message);
  }
};
