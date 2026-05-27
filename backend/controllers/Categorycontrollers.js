const categoryModel = require("../Model/Category");
const category=async(req,res)=>{
    const {categoryName,categoryCode}=req.body;
    try {
        const CheckCategory=await categoryModel.findOne({categoryName:categoryName})
        if(CheckCategory){
            return res.json({success:false,message:"this catogery Name is already have"})
        }
        const data=await categoryModel.create({categoryName,categoryCode})
        res.status(200).json({success:true,message :"successfully creat categ",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
const getCategory=async(req,res)=>{
    try {
        const data=await categoryModel.find()
        res.status(200).json({success:true,message :"successfully get categ",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
module.exports={category,getCategory};