const express =require("express");
const {category,getCategory} = require("../controllers/Categorycontrollers");
const route=express.Router();
route.post("/add-category",category)
route.get("/fetch-category",getCategory,)
module.exports=route;