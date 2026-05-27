const mongoose= require("mongoose");
const  favouriteschmea =new mongoose.Schema({
  favouriteId: {
    type:mongoose.Schema.ObjectId,
    ref:"product"
  },
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  UserName:{
    type:String,
  }

});
const favouriteModel=mongoose.model("favourite",favouriteschmea);
module.exports=favouriteModel