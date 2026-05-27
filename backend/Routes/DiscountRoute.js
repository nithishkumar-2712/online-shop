const express =require("express");
const {Discount,getDiscount} = require("../controllers/Discountcontroller");
const route=express.Router();
route.post("/add-discount",Discount)
route.get("/fetch-discount",getDiscount)
module.exports=route;