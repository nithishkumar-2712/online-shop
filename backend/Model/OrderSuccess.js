const mongoose =require('mongoose')
const OrderCreatSchema=mongoose.Schema({
    orderId: {
      type: String,
      unique: true
    },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    expectedDelivery: { type: Date },
    paymentMode: { 
      type: String, 
      enum: ["Card", "UPI","COD"], 
      required: true 
    },
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    status: { 
      type: String, 
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
      default: "Pending" 
    },
    products: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref:"product", required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ]
});
const OrederModel=mongoose.model("Order",OrderCreatSchema);
module.exports=OrederModel;