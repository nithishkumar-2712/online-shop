const reviewModel = require("../Model/Review.js");

 const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const UserId=req.body.userId;
    // console.log(req.body)

    if (!product || !rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newReview = await reviewModel.create({product,rating,comment,UserId});

    res.status(201).json({
    success:true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({success:false, message: "Server error", error });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .populate("UserId")
      .populate("product");

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const approveReview = async (req, res) => {
  try {

    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review Status Updated",
      data: review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};
const deleteReview = async (req, res) => {

  try {

    const review = await reviewModel.findByIdAndDelete(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }

};
module.exports={approveReview ,deleteReview,createReview,getAllReviews};