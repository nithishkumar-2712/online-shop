const mongoose=require("mongoose");
const dicountSchema=mongoose.Schema({
    discountValue:{
        type:Number,
        required:true
    },
    discountName:{
        type:Number,
        required:true
    },

    status:{
        type:Boolean,
        default:true
    }
});
const dicountModel=mongoose.model("Discount",dicountSchema);
module.exports=dicountModel