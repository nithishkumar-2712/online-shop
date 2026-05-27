const mongoose=require("mongoose");
const Productschema=mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    PurchasingRate:{
        type:Number,
        required:true
    },
    Mrp:{
        type:Number,
        required:true
    },
    sellingCost:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    discount:{
        type:mongoose.Schema.ObjectId,
        ref:"Discount"
    },
    about:{
        type:String,
        required:true
    },
    Tax:{
        type:mongoose.Schema.ObjectId,
        ref:"Tax"
    },
    file:{
        type: [String]  
        // required:true
    },
    Brand:{
        type:mongoose.Schema.ObjectId,
        ref:"brand"
    },
    Stock:{
        type:Number,
        required:true,
        default:1,
    },
    seller:{
        type:String,
        required:true
    },
    check:{
        type:Boolean,
        default:true
    },
    finalTax:{
        type:Number
    },
    discountAmount:{
        type:Number
    },
    
    finalPrice: {
        type: Number
    },
    profit: {
        type: Number
    },
});
const ProductModel=mongoose.model("product",Productschema)
module.exports=ProductModel;