const orderModel=require("../Model/Delivery")
const placeOrder = async (req, res) => {
  const { fullName, mobile, house, street, landmark, district, pincode, addressType, orderDetails,} = req.body;

  try {
    const data = await orderModel.create({ fullName, mobile, house, street, landmark, district, pincode, addressType, orderDetails,});
    res.status(201).json({ success: true, data, message: "Order placed successfully", });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message,});
  }
};

module.exports = placeOrder;

