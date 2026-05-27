const OrederModel = require("../Model/OrderSuccess");
const CreateOrder = async (req, res) => {
  try {
    const {fullName,mobile,address,pincode,products,subtotal,discount,total,paymentMode,expectedDelivery,productId} = req.body;
    const UserId=req.body.userId;
    console.log(productId);
    const orderId=`ORD-${Date.now()}-${Math.random().toString(36).substring(2,6)}`;
    // console.log(orderId)
    // Validation check
    if (!fullName || !mobile || !address || !pincode || !products || !total || !paymentMode) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const data = await OrederModel.create({productId,fullName,mobile,address,pincode,products,subtotal,discount,total,paymentMode,expectedDelivery,orderId,UserId});
    console.log(data);
    res.status(201).json({
      success:true,
      message: "Order placed successfully",
      data
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({  success:true,message: "Server Error", error: error.message });
  }
};
const Orderfetch=async(req,res)=>{
  const UserId=req.body.userId;
  // console.log(UserId)
  try {
    const data=await OrederModel.find({UserId:UserId}).populate("products.productId");;
    res.json({success:true,message:"successfully Oreder",data})
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}
const AllOrderfetch = async (req, res) => {
  try {

    const { status } = req.params;

    let query = {};

    // "All" இல்லாத status மட்டும் filter பண்ணு
    if (status && status !== "All") {
      query.status = status;
    }

    const data = await OrederModel.find(query)
      .populate("products.productId");

    res.json({
      success: true,
      message: "Successfully Order Fetch",
      data,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await OrederModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const cancelOrder = async (req, res) => {

  const { id } = req.params;
  // console.log(id)
  const userId = req.body.userId;
  // console.log(userId)

  try {

    const order = await OrederModel.findById({
      _id: id,
      userId: userId
    });
    console.log(order)
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found"
      });
    }

    // update status only
    order.status = "Cancelled";

    await order.save();

    res.json({
      success: true,
      message: "Order Cancelled Successfully",
      data: order
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }
};

module.exports = { CreateOrder,cancelOrder,Orderfetch,AllOrderfetch,updateOrderStatus};