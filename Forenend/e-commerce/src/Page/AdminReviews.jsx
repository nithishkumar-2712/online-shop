import React, { useState } from "react";
import "./AdminReviews.css";
import {
  FaStar,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";
import { toast } from "react-toastify";

function AdminReviews() {

 const{Data,Loading, Error,CustomHook}=Customhook("/fetch-Customer-Rating");
 console.log(Data);

  if (Loading) {

    return (

      <div className="reviews-page">

        <div className="review-header">

          <div className="sk-title"></div>

          <div className="sk-subtitle"></div>

        </div>

        <div className="review-grid">

          {[...Array(6)].map((_, index) => (

            <div className="review-skeleton-card" key={index}>

              <div className="sk-user"></div>

              <div className="sk-status"></div>

              <div className="sk-rating"></div>

              <div className="sk-comment"></div>

              <div className="sk-comment small"></div>

              <div className="sk-btn-group">

                <div className="sk-btn"></div>

                <div className="sk-btn"></div>

                <div className="sk-btn"></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    );

  }

  // =========================
  // ERROR UI
  // =========================

  if (Error) {

    return (

      <div className="reviews-page">

        <div className="review-error">

          <h2>⚠️ Failed to Load Reviews</h2>

          <p>
            Something went wrong while fetching
            customer reviews.
          </p>

          <button onClick={CustomHook}>
            Retry Again
          </button>

        </div>

      </div>

    );

  }
  // DELETE REVIEW
const deleteReview = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this review?"
  );

  if (confirmDelete) {

    try {

      const { data } = await axios.delete(
        `/deleteReview/${id}`
      );

      if (data.success) {

        toast.success("Review Deleted Successfully");

        // setReviews(
        //   reviews.filter((review) => review._id !== id)
        // );

      } else {
        toast.warning(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }
};

  // HIDE / SHOW REVIEW
  const toggleVisibility = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              visible: !review.visible,
            }
          : review
      )
    );
  };

  // APPROVE REVIEW
const approveReview = async (id) => {
  console.log(id)
  try {

    const { data } = await axios.put(
      `/approveReview/${id}`,
      { status: "Approved" }
    );

    if (data.success) {

      toast.success("Review Approved Successfully");

      // setReviews(
      //   reviews.map((review) =>
      //     review._id === id
      //       ? { ...review, status: "Approved" }
      //       : review
      //   )
      // );

    } else {
      toast.warning(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className="reviews-page">
      {/* HEADER */}
      <div className="review-header">
        <h1>Customer Reviews</h1>

        <p>
          Manage customer ratings, feedback and
          approvals
        </p>
      </div>

      {/* REVIEW GRID */}
      <div className="review-grid">
        {Data.map((review,index) => (
          <div className="review-card" key={index+1}>
            {/* TOP */}
            <div className="review-top">
              <div>
                <h3>{review.UserId.Username}</h3>

                <span className="product-name">
                  {review.product.productname}
                </span>
              </div>

              <div
                className={
                  review.status === "Approved"
                    ? "status approved"
                    : "status pending"
                }
              >
                {review.status}
              </div>
            </div>

            {/* RATING */}
            <div className="rating">
              {[...Array(review.rating)].map(
                (_, index) => (
                  <FaStar key={index} />
                )
              )}
            </div>

            {/* COMMENT */}
            <p className="comment">
              {review.comment}
            </p>

            {/* DATE */}
            <p className="date">
              Posted On : {review.date}
            </p>

            {/* ACTIONS */}
            <div className="review-actions">
              {/* APPROVE */}
              <button
                className="approve-btn"
                onClick={() =>
                  approveReview(review._id  )
                }
              >
                <FaCheckCircle />
                Approve
              </button>

              {/* HIDE */}
              <button
                className="hide-btn"
                onClick={() =>
                  toggleVisibility(review.id)
                }
              >
                {review.visible ? (
                  <>
                    <FaEyeSlash />
                    Hide
                  </>
                ) : (
                  <>
                    <FaEye />
                    Show
                  </>
                )}
              </button>

              {/* DELETE */}
              <button
                className="delete-btn"
                onClick={() =>
                  deleteReview(review._id)
                }
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;