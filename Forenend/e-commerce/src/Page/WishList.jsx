import Customhook from '@/components/Customhook'
import axios from '@/Config/axios'
import React, { useState } from 'react'
import"./WishList.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function WishList() {
  const { Data, Loading, Error, setData,CustomHook} = Customhook("/Fethufavourite");
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);

  // console.log(Data)
  
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");
    if (Loading) {
  return (
    <div className="wishlist-container">

      {[...Array(4)].map((_, index) => (

        <div className="wishlist-card" key={index}>

          <div className="wishlist-img-box">
            <Skeleton height={220} />
          </div>

          <div className="wishlist-body">

            <Skeleton height={25} width="80%" />

            <Skeleton
              height={20}
              width="50%"
              style={{ marginTop: "10px" }}
            />

            <Skeleton
              height={20}
              width="40%"
              style={{ marginTop: "10px" }}
            />

            <Skeleton
              height={40}
              width="100%"
              style={{ marginTop: "15px" }}
            />

          </div>

        </div>

      ))}

    </div>
  );
}
    
    const removeWishlist=async(id)=>{
        console.log(id)
        try {
            const {data}=await axios.delete("/removeWishlist",{data:{id}});
            if(data.success){
                toast.success(data.message);
                CustomHook();
            }else{
                toast.success(data.message);
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const addToCart = async (id, size, price) => {

  console.log(id);
  console.log(size);
  console.log(price);

  if (!size) {
    toast.warning("Please select a size");
    return;
  }

  try {

    const { data } = await axios.post("/Cart", {
      productId: id,
      totalPrice: price,
      Size: size,
    });

    if (data.success) {
      toast.success(data.message);
      navigate("/Bag");
    } else {
      toast.warning(data.message);
      navigate("/signup");
    }

  } catch (err) {
    toast.error(err.message);
    navigate("/signup");
  }
};
  if (Loading) return <h2>Loading...</h2>;
  if (Error) return <h2>Error: {Error}</h2>;

    // Addtocart POST method

  return (
    <>
      <div className="wishlist-container">
        {Data.length === 0 ? (
          <h2>No Wishlist Items</h2>
        ) : (
          Data.map((items,index) => (
            <div className="wishlist-card" key={index+1}>

              {/* Image */}
              <div className="wishlist-img-box">
                <img src={items.favouriteId.file[0]} alt="product" />

                <span
                  className="wishlist-remove"
                  onClick={() => removeWishlist(items._id)}
                >
                  ❤️
                </span>
              </div>

              {/* Body */}
              <div className="wishlist-body">
                <h3>{items.productname}</h3>

                <p className="wishlist-price">₹{items.favouriteId.sellingCost}</p>

                <p className={`stock ${items.stock > 0 ? "in" : "out"}`}>
                  {items.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* <button
                  className="add-cart-btn"
                  onClick={() => addToCart(items.favouriteId,items.finalPrice)}
                  disabled={items.stock === 0}
                >
                  Add to Cart
                </button> */}
                <button
                  className="add-cart-btn"
                  onClick={() => {
                    setSelectedProduct(items);
                    setShowModal(true);
                  }}
                >
                  Move to Bag
                </button>
              </div>

            </div>
          ))
        )}
        {showModal && selectedProduct && (
  <div className="bag-modal-overlay">

    <div className="bag-modal">

      {/* Close Button */}
      <button
        className="close-modal"
        onClick={() => setShowModal(false)}
      >
        ✕
      </button>

      {/* Product Image */}
      <div className="bag-top">

        <img
          src={selectedProduct.favouriteId.file[0]}
          alt="product"
          className="bag-img"
        />

        <div className="bag-details">

          <h2>
            {selectedProduct.favouriteId.productname}
          </h2>

          <p className="bag-price">
            ₹{selectedProduct.favouriteId.sellingCost}
          </p>

          {/* Size */}
          <div className="size-section">

            <h4>Select Size</h4>

            <div className="size-options">

              {["S", "M", "L", "XL"].map((size) => (

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

          {/* Add To Cart */}
          <button
        
            onClick={() =>
              addToCart(
                selectedProduct.favouriteId,
                selectedSize,
                selectedProduct.favouriteId.finalPrice
              )
            }
            className={`add-to-cartt ${
            !selectedSize ? "disabled-cart" : ""
          }`}
          // onClick={addToCart}
          disabled={!selectedSize}
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>

  </div>
)}
      </div>  
    </>
  );
}

export default WishList;