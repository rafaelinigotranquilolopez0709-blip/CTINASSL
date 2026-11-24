const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryController");

router.get("/login", (req, res) => res.render("login"));
router.get("/dashboard", controller.getDashboard);

router.get("/products", controller.getProductsPage);
router.get("/products/add", controller.getAddProductPage);
router.post("/products", controller.createProduct);
router.post("/products/delete/:id", controller.deleteProduct);

router.get("/categories", controller.getCategoriesPage);
router.post("/categories", controller.createCategory);

router.get("/suppliers", controller.getSuppliersPage);
router.post("/suppliers", controller.createSupplier);

module.exports = router;
