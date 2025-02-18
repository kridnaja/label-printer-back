const express = require("express");
const authController = require("../controllers/auth-controller");
// const authenticateMiddleware = require("../middlewares/authenticate");
const authenticatedMiddleware = require('../middlewares/authenticate')

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me",authenticatedMiddleware, authController.getMe);

module.exports = router;
