const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product
router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

// /admin/products
router.get("/products", adminController.getAdminProducts);

module.exports = router;
