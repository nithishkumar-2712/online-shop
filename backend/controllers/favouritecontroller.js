const favouriteModel =require("../Model/wish favourite");
const  favourite=async(req,res)=>{
    const {favouriteId} =req.body;

    console.log(favouriteId);
    const userId =req.body.userId;
    
    console.log(userId);
    const userName =req.body.userName;
    console.log(userName);
    try {
        if(!favouriteId){
            return res.json({success:false,message:"Chect the Produect"});
        }
        const check=await favouriteModel.findOne({favouriteId,userId:userId});
        if(check){
            return res.json({success:false,message : "this produect is alertinside favorite"})
        }
        const data= await favouriteModel.create({favouriteId,userId:userId,UserName:userName,});
        res.json({success:true,message:"success",data});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
};
const  fethufavourite=async(req,res)=>{
    const userId =req.body.userId;
    try {
        const data=await favouriteModel.find({userId}).populate("favouriteId").populate("userId");
        res.json({success:true,message:"success",data});
    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}
const  removeWishlist=async(req,res)=>{
    const{id}=req.body;
    const userId =req.body.userId;
    try {
        const data=await favouriteModel.findByIdAndDelete({_id:id,userId:userId});
        res.json({success:true,message:"success",data});
    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}

module.exports={favourite,fethufavourite,removeWishlist};