import React, { useEffect, useState } from "react";
import "./Viewproduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/Config/axios";
import { toast } from "react-toastify";

const Viewproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productView, setProductView] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
const [images, setImages] = useState([]);
const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Product
  const fetchSingleProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/SingleProduect", { id });
      console.log(data.data[0].file[0])

     if (data.success) {
        const files = data.data[0]?.file || [];

        setProductView(data.data[0]);
        setRelated(data.Related || []);
        setReviews(data.reviews || []);

        setImages(files);              // all images
        setSelectedImage(files[0]);    // default main image
      }else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setProductView(null); // ✅ clear old data
      fetchSingleProduct(id);
      window.scrollTo(0, 0); // ✅ UX
    }
  }, [id]);

  // 🔹 Add to Cart
const addToCart = async () => {

  /* ✅ Size Validation */
  if (!selectedSize) {
    toast.warning("Please select a size");
    return;
  }

  try {

    const { data } = await axios.post("/Cart", {

      productId: productView._id,

      totalPrice: productView.finalPrice,

      /* ✅ Pass Selected Size */
      Size: selectedSize,

    });

    if (data.success) {

      toast.success(data.message);

    } else {

      toast.warning(data.message);

      navigate("/signup");

    }

  } catch (err) {

    toast.error(err.message);

    navigate("/signup");

  }

};

  // 🔹 Loading UI
if (loading) {
  return (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>

      <div className="skeleton-details">
        <div className="skeleton-line w-70"></div>
        <div className="skeleton-line w-40"></div>
        <div className="skeleton-line w-90"></div>
        <div className="skeleton-line w-60"></div>
      </div>
    </div>
  );
}

  // 🔹 Safety check
  if (!productView) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <>
      {/* 🔥 Product Section */}
      <section className="productt-page">
        <div className="product-container">

          {/* Images */}
          <div className="product-images">
    <div className="image-wrapper">
    <img
      id="mainImage"
      src={selectedImage || images[0] || "https://via.placeholder.com/600"}
      alt="Product"
    />
  </div>

            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Details */}
        <div className="product-details">
          <h1 className="itemsviewname">{productView.productname}</h1>

          <p className="price">₹{productView.finalPrice}</p>

          {/* ✅ Size Section */}
          <div className="size-section">
            <h4 className="size-title">Select Size</h4>

            <div className="size-options">
              {[ "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSize === size ? "active-size" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="description">
            {productView.about || "No description available"}
          </p>

        <button
          className={`add-to-cartt ${
            !selectedSize ? "disabled-cart" : ""
          }`}
          onClick={addToCart}
          disabled={!selectedSize}
        >
          Add to Cart
        </button>

          {/* 🔥 Related Products */}
          <div className="related-products">
            <h3 className="relatedpro">Related Products</h3>

            <div className="related-grid">
              {related.map((item, index) => (
                <div
                  key={index}
                  className="related-card"
                  onClick={() => navigate(`/View/${item._id}`)}
                >
                  <img src={item.file} alt={item.productname} />
                  <p>{item.productname}</p>
                  <span>₹{item.finalPrice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 🔥 Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>

        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"className="user-img"
                    alt="user"
                  />
                  <div>
                    <h4>{review.UserId?.Name || "User"}</h4>
                    <div className="stars">
                      {"⭐".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>  

                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Viewproduct;