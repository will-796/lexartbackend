const { productController } = require("../controllers");
const { productsService } = require("../services");

const express = require("express");
const router = express.Router();
router.get("/", productController.getAllProducts);
router.get("/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;
