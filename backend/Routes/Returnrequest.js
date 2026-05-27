const express =require("express");
const {createReturnRequest,getReturnRequests} = require("../controllers/Returnrequest");
const Athucheck = require("../middleware/Athu");

const router = express.Router();

router.post("/returnRequest",Athucheck,createReturnRequest);
router.get("/return", getReturnRequests);

module.exports=router;