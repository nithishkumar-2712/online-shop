const mongoose=require("mongoose");
const CartSchema=mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    qty:{
        type:Number,
        default:1,
        required:true
    },
Size: {
  type: String,
  enum: ["S", "M", "L", "XL"],
  required: true,
},
    totalPrice:{
        type:Number,
        // required:true
        
    },
    selecterOption:{
        type:String,
        // required:true
    }

})
const Catmodel=mongoose.model("Addtocart",CartSchema)
module.exports=Catmodel;