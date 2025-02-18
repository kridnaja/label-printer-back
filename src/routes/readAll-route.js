const express = require("express");
const readAllController = require("../controllers/readAll-controller");
const authController = require("../controllers/auth-controller");
const authenticatedMiddleware = require("../middlewares/authenticate");
const router = express.Router();

router.post("/loginAdmin", authController.login);
router.post("/logoutAdmin", authController.logout);
router.get("/auth", authenticatedMiddleware, authController.getMe);
router.post("/registerAdmin", authController.register);

router.get("/readAll", authenticatedMiddleware, readAllController.readAll);
router.get(
  "/readPendingProduction",
  authenticatedMiddleware,
  readAllController.readPendingProduction
);
router.get(
  "/readInProduction",
  authenticatedMiddleware,
  readAllController.readInProduction
);
router.get(
  "/readDelivering",
  authenticatedMiddleware,
  readAllController.readDelivering
);
router.get(
  "/readCompleted",
  authenticatedMiddleware,
  readAllController.readCompleted
);
router.get(
  "/readPendingDelivery",
  authenticatedMiddleware,
  readAllController.readPendingDelivery
);

router.get("/search", authenticatedMiddleware, readAllController.search);

module.exports = router;
