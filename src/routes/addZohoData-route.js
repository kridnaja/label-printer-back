const express = require("express");
const multer = require('multer');
const addZohoDataToDatabase = require("../controllers/addZohoDataToDatabase");
const upload = multer({ dest: 'images/' });
const router = express.Router();

router.get("/addZohoData", addZohoDataToDatabase.addZohoData);
// router.get("/testUploadAndSaveImage", addZohoDataToDatabase.testUploadAndSaveImage);

router.get("/readCompleteStatus", addZohoDataToDatabase.readCompleteStatus);
router.get("/readDeliveringStatus", addZohoDataToDatabase.readDeliveringStatus);
router.get(
  "/readPendingProductionStatus",
  addZohoDataToDatabase.readPendingProductionStatus
);
router.get(
  "/readInProductionStatus",
  addZohoDataToDatabase.readInProductionStatus
);

router.get(
  "/readPendingDeliveryStatus",
  addZohoDataToDatabase.readPendingDeliveryStatus
);

module.exports = router;
