    const jwt=require("jsonwebtoken");
    const registerModel = require("../Model/Register");

    const isBlocking=async(req,res,next)=>{
        const {token}=req.cookies
        try {
            if(!token){
                return res.json({success:false,message:" pelese First Login First"})
            }
            const decode=jwt.verify(token,"NITHISH_KUMAR");
            if(decode.id){
                req.body=req.body||{};
                const userblocking=await registerModel.findById(decode.id);
                console.log(userblocking)
                if(userblocking.isBlocked ===true){
                    next();
                }else{
                    res.json({success:false,message:"your Acount is Blocking by Admin"})
                }
            }else{
                res.json({success:false,message:"Token is invalied"})
            }
        } catch (error) {
            res.json({success:false,message:"network error"})
            
        }
    }
    module.exports = isBlocking 