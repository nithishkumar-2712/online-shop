const express =require("express");
const route=express.Router();
const{getAllReviews,deleteReview,approveReview,createReview}=require("../controllers/Reviewcontroller");
const Athucheck = require("../middleware/Athu");
route.post("/Customer-Rating",Athucheck,createReview);
route.get("/fetch-Customer-Rating",getAllReviews);
route.put("/approveReview/:id", approveReview);
route.delete("/deleteReview/:id", deleteReview);
module.exports=route