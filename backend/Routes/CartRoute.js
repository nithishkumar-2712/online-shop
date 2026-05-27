const express =require("express");
const {Addcart,updateSize,Fetchcart,Cartcount,Deletecart,Editcart,AllDeletecart}= require("../controllers/Cartcontroller");
const Athucheck = require("../middleware/Athu");
const route=express.Router();
route.post("/Cart",Athucheck,Addcart);
route.get("/getCart",Athucheck,Fetchcart);
route.get("/Cartcount",Athucheck,Cartcount);
route.delete("/deleteCart/:id",Athucheck,Deletecart);
route.delete("/AllDeletecart",Athucheck,AllDeletecart);
route.post("/Updata",Athucheck,Editcart);
route.post("/Updatasize",Athucheck,updateSize);
module.exports=route