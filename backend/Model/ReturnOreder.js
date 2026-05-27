const mongoose=require("mongoose");

const returnRequestSchema = new mongoose.Schema(
  {
    productId: {
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },

    UserId: {
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },

    reason: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
    },

    // images: [
    //   {
    //     type: String,
    //   },
    // ],

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const ReturnRequest = mongoose.model(
  "ReturnRequest",
  returnRequestSchema
);

module.exports=ReturnRequest