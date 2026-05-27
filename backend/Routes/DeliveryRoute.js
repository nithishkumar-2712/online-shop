const express = require("express");
const placeOrder =require("../controllers/Deliverycontroller")
const router = express.Router();
router.post("/place-order",placeOrder);
module.exports = router;
