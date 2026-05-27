const express = require("express");
const router = express.Router();
const { CreateOrder,cancelOrder,Orderfetch,updateOrderStatus,AllOrderfetch} = require("../controllers/OrderSuccess");
const Athucheck = require("../middleware/Athu");

router.post("/orders",Athucheck,CreateOrder);
router.get("/orders-fetch",Athucheck,Orderfetch);
router.put("/cancelOrder/:id",Athucheck,cancelOrder);
// router.get("/AllOrderfetch",Athucheck,AllOrderfetch);
router.get("/AllOrderfetch/:status", Athucheck, AllOrderfetch);
router.put("/update-order/:id",Athucheck,updateOrderStatus);
module.exports = router;