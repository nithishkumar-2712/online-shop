const mongoose=require("mongoose");
const brandSchema=mongoose.Schema({
    BrandName:{
        type:String,
         required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    BrandCode:{
        type:Number
    }
});
const brandModel=mongoose.model("brand",brandSchema);
module.exports=brandModel