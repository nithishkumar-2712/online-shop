const Catmodel = require("../Model/Addtocart")
const Addcart=async(req,res)=>{
    const {productId,totalPrice,Size}=req.body;
    const UserId=req.body.userId;
    try {
        const checkCart= await Catmodel.findOne({productId:productId,UserId:UserId});
        if(checkCart){
            return res.json({success:false,message:"this produect is already have"});
        }
        const data= await Catmodel.create({productId:productId,Size:Size,totalPrice:totalPrice,UserId:UserId});
        res.status(200).json({success:true,message:"successfully Addtocart Add",data});
    } catch (error) {
        res.status(401).json({success:false,message:error.message})
    }
}
const Fetchcart=async(req,res)=>{
    const UserId=req.body.userId;
    try {
        const data=await Catmodel.find({UserId:UserId}).populate("productId")
        res.status(200).json({success:true,message:"successfully get cart product",data})
    } catch (error) {
        res.status(400).json({success:false,message:`server error${error.message}`})
        
    }
}
// const Cartcount=async(req,res)=>{
//     //  const UserId=req.body.userId;
//     try {
//         const data=await Catmodel.countDocuments();
//         res.status(200).json({success:true,message:"successfully get cart product Count",data})
//     } catch (error) {
//         res.status(400).json({success:false,message:`server error${error.message}`})
        
//     }
// }
const Cartcount = async (req, res) => {
    const UserId=req.body.userId;

    try {

        const count = await Catmodel.countDocuments({
            UserId: UserId
        });

        res.status(200).json({
            success: true,
            message: "successfully get cart product Count",
            data: count
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: `server error ${error.message}`
        });

    }
}
const Deletecart =async(req,res)=>{
    const {id}=req.params;
    const UserId=req.body.userId;
    try {
        // console.log("Delete items ")
        const data=await Catmodel.findByIdAndDelete({UserId:UserId,_id: id});
        res.json({success:true,message:"Delete  a Cart Items",data})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
const AllDeletecart =async(req,res)=>{
    const UserId=req.body.userId;
    try {
        const data=await Catmodel.deleteMany({UserId:UserId});
        res.json({success:true,message:"Delete  a Cart Items",data})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
const Editcart=async(req,res)=>{
    const {id,type}=req.body;
    const UserId=req.body.userId;
    // console.log(`soo this message${id,type}`)
    try {
        const cart =await Catmodel.findById({UserId:UserId,_id:id}).populate("productId");
        // console.log(cart)    
        if(!cart){
                return  res.json({success:false,message:"product is not fount"})
        }
        let newqty=cart.qty;
        let totalPrice=cart.totalPrice;
        if(type==="increment"){
            newqty=cart.qty+1;
        }
        if(type=="decrement"){
            if(cart.qty>1){
                newqty=cart.qty-1;
            }
        }
          totalPrice= cart.productId.finalPrice*newqty;
        console.log()
        cart.qty=newqty;
        cart.totalPrice=totalPrice;
             // 4️⃣ Save
        await cart.save();

        // 5️⃣ Response
        res.json({
            success: true,
            message: "Cart updated successfully",
            data: {
                productId: cart.productId._id,
                qty: newqty,
                // price: cart.productId.finalPrice,
                totalPrice: totalPrice
            }
        });
    } catch (error) {
        res.json({success:false,message:"Unsuccess Cart Updatae "})
        
    }
}
const updateSize = async (req, res) => {
  try {
    const { id, size } = req.body;

    // validation
    if (!["S", "M", "L", "XL"].includes(size)) {
      return res.status(400).json({
        success: false,
        message: "Invalid size selected",
      });
    }

    const updatedCart = await Catmodel.findByIdAndUpdate(
      id,
      { Size: size },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.json({
      success: true,
      message: "Size updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports={Addcart,updateSize,Cartcount,Fetchcart,Deletecart,Editcart,AllDeletecart}