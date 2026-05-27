const mongoose=require("mongoose");
const userSchema =mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Number:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        unique: true,
        required:true
        
    },
    isBlocked:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:"user"
    }
    },
    {timestamps:true},
)
const registerModel=mongoose.model("User",userSchema );
    module.exports=registerModel;