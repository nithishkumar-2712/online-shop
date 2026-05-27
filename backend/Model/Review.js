const mongoose=require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    UserId:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required: true,
    },
    status:{
      type: String, 
      enum: ["Pending", "Approved"], 
      default: "Pending" 
    }
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports=reviewModel