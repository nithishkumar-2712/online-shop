const express=require("express");
const helmet =require("helmet")
// const http=require("http");
// const {Server}=require("socket.io");
const cors =require("cors");
const dotenv =require("dotenv");
const connect=require("./Config/DB");
// const cookies=require("cookie");
const jwt =require("jsonwebtoken")
// const error = require("./middleware/error");s
const  Register  = require("./Routes/RegisterRoute");
// const registerModel = require("./Model/Register");
// const chatModel = require("./Model/Customer");
const cookiParser=require("cookie-parser")
const category = require("./Routes/CategoryRoute");
const Product = require("./Routes/ProductRoute");
const Cart = require("./Routes/CartRoute");
const discount = require("./Routes/DiscountRoute");
const Brand = require("./Routes/BrandRoute");
const tax = require("./Routes/TaxRoute");
const favourite=require("./Routes/wish favouriteRoute");
const compression=require("compression");
const Order = require("./Routes/OrderSuccess");
const Review = require("./Routes/ReviewRoute");
const Returnrequest = require("./Routes/Returnrequest");
// const redisconnection = require("./Config/Redis");
dotenv.config()
const app=express();
connect();
// const server =http.createServer(app);
// const io=new Server(server,{
//     cors:{
//         origin:process.env.URL,
//         methods:["POST","GET","PUT","DELETE"],
//         credentials:true,
//     }
// });
// io.use(async(socket,next)=>{
//     try {
//         const cookieHeader =socket.handshake.headers.cookie;
//         if(!cookieHeader){
//             return res.status(401).json({success:false,message:"Go to login"});
//         }
//         const token = cookieHeader.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1];
//         if(!token){
//             return res.status(401).json({success:false,message:"token is notfount"});
//         }
//         const decode=jwt.verify(token,process.env.JWT_SECRET)
//         if(decode.id){
//              const user=await registerModel.findById(decode.id);
//             if(user){
//                 socket.userId=user._id;
//                 next();
//             }else{
//                 res.status(401).json({success:false,message:"user is notfount"})
//             }
//         }else{
//             res.status(401).json({success:false,message:"user is token is incoorect"})
//         }
//     } catch (error) {
        
//     }
// })
// io.on("connection",(socket)=>{
//     console.log(`connection ${socket}`);
//     socket.on("join",({touserid})=>{
//         const roomId=[socket.userId,touserid].sort().join("_")
//         socket.join(roomId);
//         console.log(`send id ${socket.userid} room name${roomId}`);
//         socket.emit("privatemessage",{roomId})
//     });
//     socket.on("sendmessage",async({touserid,message})=>{
//         const msg =await chatModel.create({
//             "sender":socket.userId,
//             "resever":touserid,
//             "message":message
//         });
//     })
//     io.to(roomId).emit("revermessage",{
//         "sender":socket.userid,
//         "text":message
//     });
// })
// app.use(helmet({
//     contentSecurityPolicy:false,
// }));
app.use("/public",express.static("public"))
app.use(
    cors(
        {
        origin: [process.env.URL,"http://10.131.211.250:5173"],     
        methods:["GET","POST","PUT","DELETE"],
        credentials: true,           
    }
)
);
app.use(express.json());
app.use(compression({
    threshold:2*1024
}))
app.use(cookiParser());
app.use(Register);
app.use(Review);
app.use(category);
app.use(Product);
app.use(Cart);
app.use(discount);
app.use(Brand);
app.use(Order);
app.use(tax);
app.use(Returnrequest);
app.use(favourite);
app.listen(process.env.PORT, "0.0.0.0",()=>{
    console.log(`Server is runing in this ${process.env.PORT || 4000}`);
});