import React, { useState } from "react";
import "./OrderDetails.css";
import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";
import { toast } from "react-toastify";

const OrderDetails = () => {

  const [showModal, setShowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Return States
  const [returnReason, setReturnReason] = useState("");
  console.log(returnReason);
  const [returnComment, setReturnComment] = useState("");
  const [returnImages, setReturnImages] = useState([]);

  const { Data, CustomHook } = Customhook("/orders-fetch");

  // 🔹 Open Review Modal
  const openReview = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // 🔹 Open Return Modal
  const openReturnModal = (order) => {
    setSelectedOrder(order);
    setShowReturnModal(true);
  };

  // 🔹 Submit Review
  const submitReview = async () => {

    try {

      const { data } = await axios.post("/Customer-Rating", {
        product: selectedOrder,
        rating,
        comment,
      });

      if (data.success) {

        toast.success("Review Submitted ✅");

        setShowModal(false);
        setRating(0);
        setComment("");

      }

    } catch (error) {

      toast.error("Error submitting review ❌");

    }

  };

  // 🔹 Submit Return Request
const submitReturnRequest = async () => {

  try {

    const {data} = await axios.post("/returnRequest",
      {
        productId: selectedOrder?._id,
        reason: returnReason,
        comment: returnComment,
      }
    );

    if (data.success) {

      alert(data.message);

      setShowReturnModal(false);

      // reset fields
      setReturnReason("");
      setReturnComment("");

    }

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

};

  // 🔹 Cancel Order
  const cancelOrder = async (id) => {

    try {

      const { data } = await axios.put(`/cancelOrder/${id}`);

      if (data.success) {

        toast.success(data.message);
        CustomHook();

      } else {

        toast.warning(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  const reasons = [
    "Damaged Product",
    "Wrong Product",
    "Missing Accessories",
    "Quality Issue",
    "Other",
  ];

  return (
    <div className="orders-container">

      <h2>My Orders</h2>

      {Data?.map((order, orderIndex) =>
        order.products.map((item, productIndex) => {

          const orderDate = new Date(order.orderDate);

          const today = new Date();

          const diffTime = today - orderDate;

          const diffDays =
            diffTime / (1000 * 60 * 60 * 24);

          const canReturn = diffDays <= 7;

          return (
            <div
              className="order-card"
              key={`${orderIndex}-${productIndex}`}
            >

              {/* Product Image */}
              <img
                src={
                  item.productId?.file?.[0] ||
                  "https://via.placeholder.com/120"
                }
                alt="product"
              />

              {/* Product Info */}
              <div className="order-info">

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <span
                  className={`status ${order.status?.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>

              {/* Actions */}
              <div className="actions">

                {/* Delivered */}
                {order.status === "Delivered" && (
                  <>

                    <button
                      className="review"
                      onClick={() =>
                        openReview(item.productId)
                      }
                    >
                      Review
                    </button>

                    {canReturn && (
                      <button
                        className="return"
                        onClick={() =>
                          openReturnModal(item.productId)
                        }
                      >
                        Return
                      </button>
                    )}

                  </>
                )}

                {/* Pending */}
                {order.status === "Pending" && (
                  <button
                    className="cancel"
                    onClick={() =>
                      cancelOrder(order._id)
                    }
                  >
                    Cancel
                  </button>
                )}

              </div>

            </div>
          );
        })
      )}

      {/* ⭐ Review Modal */}
      {showModal && (
        <div className="modal">

          <div className="modal-content">

            <h3>Write Review</h3>

            <div className="stars">

              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating ? "active" : ""
                  }
                >
                  ★
                </span>
              ))}

            </div>

            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <div className="modal-buttons">

              <button
                className="submit"
                onClick={submitReview}
              >
                Submit
              </button>

              <button
                className="cancel"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* 🔥 Return Request Modal */}
      {showReturnModal && (
        <div className="return-modal-overlay">

          <div className="return-modal">

            {/* Header */}
            <div className="return-header">

              <h2>Return Request</h2>

              <button
                className="close-btn"
                onClick={() =>
                  setShowReturnModal(false)
                }
              >
                ✕
              </button>

            </div>

            {/* Product */}
            <div className="return-product">

              <img
                src={
                  selectedOrder?.file?.[0] ||
                  "https://via.placeholder.com/120"
                }
                alt="product"
              />

              <div>

                <h3>{selectedOrder?.name}</h3>

                <p>
                  Please select reason for return
                </p>

              </div>

            </div>

            {/* Reasons */}
            <div className="return-section">

              <label>Return Reason</label>

              <div className="reason-grid">

                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className={`reason-box ${
                      returnReason === reason
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setReturnReason(reason)
                    }
                  >
                    {reason}
                  </div>
                ))}

              </div>

            </div>

            {/* Comment */}
            <div className="return-section">

              <label>Additional Details</label>

              <textarea
                placeholder="Explain your issue..."
                value={returnComment}
                onChange={(e) =>
                  setReturnComment(
                    e.target.value
                  )
                }
              />

            </div>

            {/* Buttons */}
            <div className="return-buttons">

              <button
                className="cancel-return"
                onClick={() =>
                  setShowReturnModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="submit-return"
                onClick={submitReturnRequest}
              >
                Submit Request
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default OrderDetails;