const { productController } = require("../controllers");

const express = require("express");
const router = express.Router();
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create", productController.createProduct);
router.put("/:id");
router.delete("/:id");

module.exports = router;
