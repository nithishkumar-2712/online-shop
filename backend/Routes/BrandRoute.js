const express =require("express");
const {Brand,getBrand} = require("../controllers/Brandcontroller");
const isBlocking = require("../middleware/Blocking");
const route=express.Router();
route.post("/add-brand",Brand)
route.get("/fetch-brand",getBrand)
module.exports=route;