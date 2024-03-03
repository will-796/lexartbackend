const express = require("express");
const productRoutes = require("./productsRoutes");
const router = express.Router();
router.use("/products", productRoutes);

module.exports = router;
