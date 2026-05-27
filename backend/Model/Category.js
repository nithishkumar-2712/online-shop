const mongoose=require("mongoose");
const categorySchema=mongoose.Schema({
    categoryName:{
        type:String,
        required:true
        
    },
    categoryCode:{
        type:String,
    },
    status:{
        type:Boolean,
        default:true
    }
});
const categoryModel=mongoose.model("Category",categorySchema);
module.exports=categoryModel