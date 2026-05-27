const mongoose =require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
 const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Db is connect successfully`);
    } catch (error) {
        console.log(error.message)
    }
 }
 module.exports=connect;