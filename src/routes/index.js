const express = require("express");
const productRoutes = require("./productsRoutes");
const userRoutes = require("./userRoutes");
const router = express.Router();
const jwtAuthenticate = require("../middlewares/jwtAuthenticate");

router.use("/products",jwtAuthenticate, productRoutes);
router.use("/users", userRoutes);

module.exports = router;
