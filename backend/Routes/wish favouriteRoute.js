const express =require("express");
const {favourite,fethufavourite,removeWishlist}=require("../controllers/favouritecontroller");
const Athucheck = require("../middleware/Athu");
const router= express.Router();
router.post("/favourite",Athucheck,favourite);
router.get("/Fethufavourite",Athucheck,fethufavourite);
router.delete("/removeWishlist",Athucheck,removeWishlist);
module.exports=router;