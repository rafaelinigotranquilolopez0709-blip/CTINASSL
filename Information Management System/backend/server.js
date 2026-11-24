const express = require("express");
const cors = require("cors");
const path = require("node:path");
require("dotenv").config();
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Configure View Engine & Static Assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Route handlers for Frontend Views
app.get("/login", (req, res) => res.render("login"));
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/products", (req, res) => res.render("products"));
app.get("/products/add", (req, res) => res.render("add-product"));
app.get("/suppliers", (req, res) => res.render("suppliers"));
app.get("/categories", (req, res) => res.render("categories"));

// Test route
app.get("/", (req, res) => {
  res.send("Inventory Management System API is running!");
});

const PORT = process.env.PORT || 5000;

db.getConnection()
  .then((conn) => {
    console.log("MySQL Connected Successfully!");
    conn.release();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MySQL connection error:", error.message);
    process.exit(1);
  });
