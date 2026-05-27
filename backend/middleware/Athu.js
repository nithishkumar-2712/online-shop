const jwt=require("jsonwebtoken");
const registerModel = require("../Model/Register");
const dotenv=require("dotenv");
dotenv.config();
const Athucheck=async(req,res,next)=>{
    const{token}=req.cookies
    try {
        if(!token){
            return res.status(401).json({success:false,message:"Token is not found"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        
        if(decode.id){
            // console.log(decode.id)
            req.body=req.body||{};
            const user=await registerModel.findById(decode.id);
            // console.log(user)

            if(user){
                req.body.userId=user._id,
                // console.log(req.body.userId)
                req.body.userName=user.Name
                // console.log(req.body.userName)
                next();
            }else{
                res.status(401).json({success:false,message:"User is not found"})
            }
        }else{        
            res.status(401).json({success:false,message:"token is invaled"});
        }
        
    } catch (error) {
        res.status(401).json({success:false,message:"INSERNET SERVER ERROR"})
        
    }
}
module.exports=Athucheck