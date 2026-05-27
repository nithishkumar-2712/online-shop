const registerModel = require("../Model/Register");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const Register=async(req,res)=>{
    const{Name,Username,Email,Password,Number,isBlocked}=req.body;
    // console.log(req.body);
    const salt=10;
    try {
        const Same= await registerModel.findOne({Email:Email});
        // console.log(Same);
        if(Same){
           return res.json({success:false,message:"this Email already have"});
        }
        const haspassword=await bcrypt.hash(Password,salt);
        const data=await registerModel.create({Name,Username,Password:haspassword,Number,Email,isBlocked});
        res.json({success:true,message:'successfully user register',data})
    } catch (error) {
        res.json({success:false,message:`network error${error.message}`})
        
    }
}
const Login=async(req,res)=>{
    const{Email,Password}=req.body;
    try {
        const User=await registerModel.findOne({Email:Email});
        if(!User){
            return res.json({success:false,message:"Email is incorrect"});
        }
        const isMatch=await bcrypt.compare(Password,User.Password)
        if(!isMatch){
            return res.json({success:false,message:"Password is incorrect"});
        }
        const token=jwt.sign({id:User._id},process.env.JWT_SECRET,{expiresIn:"8d"});
        res.cookie("token", token, {httpOnly: true,sameSite: "strict",maxAge: 8 * 24 * 60 * 60 * 1000,  });
        res.json({success:true,role: User.role,message:"User successfully Login"})
    } catch (error) {
        res.json({success:false,message:`unsuccessfully user Login${error.message}`})
    }
}
const profile = async (req, res) => {
  try {
    const id = req.body.userId;
    const data = await registerModel.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const Admin = async (req, res) => {
  try {
    const id = req.body.userId;
    const data = await registerModel.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    console.log(data)
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getUser=async(req,res)=>{
    try {
        const data=await registerModel.find();
        res.status(200).json({success:true,message:"Successfully getUser",data})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}
const DeleteUser=async(req,res)=>{
    const{id}=req.params;
    try {
        const data=await registerModel.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Dlete the User",data})
    } catch (error) {
        res.status(200).json({success:false,message:`serever error${error.message}`})
        
    }
}
const blockUnblockUser=async(req,res)=>{
    const{id}=req.params;
    const{isBlocked}=req.body;
    try {
       const data =await registerModel.findByIdAndUpdate(id,{$set:{isBlocked:isBlocked}},{ new: true });
         res.status(200).json({
      success: true,
      message: isBlocked ? "User blocked successfully" : "User unblocked successfully",
      data,
    });
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}
const logoutUser = async (req, res) => {
  try {
res.clearCookie("token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/"   // ✅ MUST MATCH
});

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
module.exports={Register,profile,logoutUser,Admin,Login,getUser,DeleteUser,blockUnblockUser}