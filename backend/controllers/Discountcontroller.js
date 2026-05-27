const dicountModel = require("../Model/Discount");
const Discount=async(req,res)=>{
    const {discountValue,discountName}=req.body;
    try {
        const checkdiscount=await dicountModel.findOne({discountValue:discountValue});
        if(checkdiscount){
            return res.json({success:false,message:"this discount name is Allready have "})
        }
        const data=await dicountModel.create({discountValue:discountValue,discountName})
        res.status(200).json({success:true,message :"successfully creat Discount",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
const getDiscount=async(req,res)=>{
    try {
        const data=await dicountModel.find();
        res.status(200).json({success:true,message :"successfully get Discount",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
module.exports={Discount,getDiscount};