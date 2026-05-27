import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Product.css";
import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Product() {
  const { Data, Loading, Error } = Customhook("/FetchProduct");
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  if (Loading) {
    return (
      <div className="productss">
        {[...Array(8)].map((_, index) => (
          <div className="card" key={index}>
            <Skeleton height={220} />
            <Skeleton height={30} style={{ marginTop: "10px" }} />
            <Skeleton height={20} width="70%" />
            <Skeleton height={25} width="50%" />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {/* <Skeleton height={40} width={120} /> */}
              <Skeleton height={40} width={120} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (Error) return <h2>Error...</h2>;

  // CART
  const addToCart = async (id, price) => {
    try {
      const { data } = await axios.post("/Cart", {
        productId: id,
        totalPrice: price,
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

  // VIEW PRODUCT
  const handleImage = (id) => {
    navigate(`/View/${id}`);
  };

  // WISHLIST
  const toggleWishlist = async (id) => {
    try {
      const { data } = await axios.post("/favourite", {
        favouriteId: id,
      });

      if (data.success) {
        toast.success(data.message);
        setWishlist(true);
        navigate("/WishList");
      } else {
        toast.warning(data.message);
        setWishlist(false);
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/signup");
    }
  };

  // FILTER OPTIONS
  const categories = [...new Set(Data?.map((i) => i.category?.categoryName))];
  const brands = [...new Set(Data?.map((i) => i.Brand?.BrandName))];

  // FILTER DATA
  let filteredData = Data?.filter((item) => {
    const matchSearch = item.productname
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "" ||
      item.category?.categoryName === selectedCategory;

    const matchBrand =
      selectedBrand === "" || item.Brand?.BrandName === selectedBrand;

    const matchDiscount = !showDiscountOnly || item.discount;

    return matchSearch && matchCategory && matchBrand && matchDiscount;
  });

  // SORT
  if (sort === "low") {
    filteredData = [...filteredData].sort(
      (a, b) => a.finalPrice - b.finalPrice
    );
  }

  if (sort === "high") {
    filteredData = [...filteredData].sort(
      (a, b) => b.finalPrice - a.finalPrice
    );
  }

  return (
    <div className="shop-container">
      {/* BANNER */}
      {/* <Banner /> */}

      <h1 className="title">🛒 Power House Shop</h1>

      {/* MOBILE FILTER BUTTON */}
      <button className="filter-btn" onClick={() => setOpenFilter(true)}>
        ☰ Filters
      </button>

      <div className="layout">

        {/* SIDEBAR FILTER */}
        <div className={`sidebar ${openFilter ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setOpenFilter(false)}>
            ✖
          </button>

          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <h3>Sort</h3>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

          <h3>Category</h3>
          {categories.map((cat, i) => (
            <label key={i}>
              <input
                type="radio"
                name="category"
                onChange={() => setSelectedCategory(cat)}
              />
              {cat}
            </label>
          ))}
          <button onClick={() => setSelectedCategory("")}>
            Clear Category
          </button>

          <h3>Brand</h3>
          {brands.map((br, i) => (
            <label key={i}>
              <input
                type="radio"
                name="brand"
                onChange={() => setSelectedBrand(br)}
              />
              {br}
            </label>
          ))}
          <button onClick={() => setSelectedBrand("")}>
            Clear Brand
          </button>

          <h3>Offers</h3>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setShowDiscountOnly(e.target.checked)}
            />
            Discount Only
          </label>
        </div>

        {/* PRODUCTS */}
        <div className="products">
          {filteredData?.map((item) => (
            <div className="card" key={item._id}>
              <div className="imgBox">
                <img
                  src={item.file[0]}
                  alt={item.productname}
                  onClick={() => handleImage(item._id)}
                />

                {item.discount && (
                  <span className="badge">
                    -{item.discount.discountName}%
                  </span>
                )}
              </div>

              <h3>{item.productname}</h3>

              <p>
                {item.Brand?.BrandName} • {item.category?.categoryName}
              </p>

              <div className="price">
                <span>₹{item.finalPrice}</span>
                <del>₹{item.Mrp}</del>
              </div>

              <div className="btns">
                {/* <button onClick={() => addToCart(item._id, item.finalPrice)}>
                  Add to Cart
                </button> */}

                <button
                  className="wish"
                  onClick={() => toggleWishlist(item._id)}
                >
                  {wishlist ? "❤️ Saved" : "🤍 Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;