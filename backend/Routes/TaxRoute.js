const express =require("express");
const {Tax,FetchTax} = require("../controllers/Taxcontroller");
const route=express.Router();
route.post("/add-tax",Tax);
route.get("/fetch-tax",FetchTax);
module.exports=route