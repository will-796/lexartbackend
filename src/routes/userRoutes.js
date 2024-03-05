const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.loginController);
router.post("/create", userController.userCreateController);

module.exports = router;