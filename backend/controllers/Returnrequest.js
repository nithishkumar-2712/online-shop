const ReturnRequest=require("../Model/ReturnOreder");
const createReturnRequest = async (req,res) => {

  try {

    const {
      productId,
      reason,
      comment,
    } = req.body;
    const UserId=req.body.userId;
    console.log(req.body)
    if (!reason) {
  return res.status(400).json({
    success: false,
    message: "Return reason is required",
  });
}

    // // Uploaded Images
    // const images = req.files.map(
    //   (file) => file.path
    // );

    const newReturn = await ReturnRequest.create
    ({productId,reason,comment,UserId,});
    res.status(201).json({

      success: true,

      message:
        "Return Request Submitted Successfully",

      data: newReturn,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
const getReturnRequests = async (req, res) => {
  try {

    const returnRequests = await ReturnRequest.find().populate("productId").populate("UserId");

    res.status(200).json({
      success: true,
      count: returnRequests.length,
      data: returnRequests,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports={createReturnRequest,getReturnRequests};