const registerModel = require("../Model/Register");
const Admincheck=async(req,res,next)=>{
    const userId=req.body.userId;
    // console.log(`Admin  check ${userId}`)
    try {
        const user=await registerModel.findById(userId);
        // console.log(user.role);
        if(user.role==="Admin"){
            next()
        }else{
            res.status(401).json({success:false,message:"Admin only Access this route"});
        }
    } catch (error) {
        res.status(401).json({success:false,message:"serrevr internet error"})
    }
}
module.exports=Admincheck;