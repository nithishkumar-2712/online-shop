const taxModel = require("../Model/Tax");
const Tax =async(req,res)=>{
    const {taxValue,taxName}=req.body;
    try {
        const checkdiscount=await taxModel.findOne({taxValue:taxValue});
        if(checkdiscount){
            return res.json({success:false,message:"this tax name is Allready have "})
        }
        const data=await taxModel.create({taxValue:taxValue,taxName})
        res.status(200).json({success:true,message :"successfully creat tax",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
const FetchTax=async(req,res)=>{
    try {
        const data=await taxModel.find();
        res.status(200).json({success:true,message :"successfully get tax",data})
    } catch (error) {
        res.status(401).json({success:false,message :"server internet error" })
        
    }
}
module.exports={Tax,FetchTax};