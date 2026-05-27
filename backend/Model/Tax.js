const mongoose=require("mongoose");
const taxSchema=mongoose.Schema({
    taxValue:{
        type:Number,
        required:true
    },
    taxName:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
});
const taxModel=mongoose.model("Tax",taxSchema);
module.exports=taxModel