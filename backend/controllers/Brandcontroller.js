const brandModel = require("../Model/Brand");
const Brand=async(req,res)=>{
    const {BrandName, brandCode}=req.body;
    console.log(req.body)
    try {
        const checkBrand=await brandModel.findOne({BrandName:BrandName, BrandCode: brandCode});
        if(checkBrand){
            return res.json({success:false,message:"This Brand Name is ALready have"})
        }
        const data=await brandModel.create({BrandName:BrandName})
        res.status(200).json({success:true,message :"successfully creat Brand",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
const getBrand=async(req,res)=>{
    try {
        const data=await brandModel.find();
        res.status(200).json({success:true,message :"successfully get Brand",data});
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" });
        
    }
}
module.exports={Brand,getBrand};