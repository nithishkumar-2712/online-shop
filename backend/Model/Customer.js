const mongoose =require("mongoose");
const CustomerSchema=mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
        
    },
    message:{
        type:String
    }
});
const chatModel=mongoose.model("Chat",CustomerSchema);
module.exports=chatModel;