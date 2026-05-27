const express=require("express");
const {Allproduct,updateStock,Deleteproduct,FetchDashbord,Fetchsingleproduct,Fetchproduct,updateProduct, Adminproduct} = require("../controllers/Produectcontrollers");
const uplaode = require("../middleware/Multer");
const Athucheck = require("../middleware/Athu");
const Admincheck = require("../middleware/Admin");
const route=express.Router();
route.post("/Produect",uplaode.array("file",4),Allproduct)
route.post("/SingleProduect",Fetchsingleproduct)
route.get("/FetchProduct",Fetchproduct)
route.get("/Adminproduct/:page", Adminproduct);
route.put("/Deleteitems/:id",Deleteproduct);
route.get("/Dashbord",FetchDashbord);
route.get("/Admin",Athucheck,Admincheck);
route.put("/updateProduct/:editId",updateProduct);
route.put("/updateStock/:id",updateStock);
module.exports=route;