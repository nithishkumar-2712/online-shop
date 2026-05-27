import React from "react";
import "./Home.css";
import Men from"../assets/Men.jpg"
import Kids from"../assets/Kids.jpg"
import Formals from"../assets/Formals.jpg"
import Casuals from"../assets/Casuals.jpg"
import Party from"../assets/Party.jpg"
import Women from"../assets/Women.jpg"
function Home() {

  const categories = [
    {
      name: "Men Wear",
      img:Men
    },
    {
      name: "Women Wear",
      img: Women
    },
    {
      name: "Kids Wear",
      img: Kids
    },
    {
      name: "Casuals",
      img: Casuals
    },
    {
      name: "Formals",
      img: Formals
    },
    {
      name: "Party Wear",
      img: Party
    }
  ];

  return (
    <>
      {/* HERO BANNER */}
      <div className="banner">
        <div className="banner-left">
          <h1 className="titlee">Power House</h1>
          <h3 className="banner-text">
            Discover Trendy Fashion for Every Occasion. Big Discounts Available. Shop Now!
          </h3>

          <div className="btn-group">
            <button className="shop-btn">Shop Now</button>
            <button className="explore-btnn">Explore</button>
          </div>
        </div>

        <div className="banner-right">
          <img 
            src={Casuals}
            alt="Fashion" 
          />
        </div>
      </div>

      {/* CATEGORY HEADER */}
      <div className="category-header">
        <h2 className="categorename">Shop by Categories</h2>
        <p>Find your perfect style</p>
      </div>

      {/* CATEGORIES */}
      <div className="Categories">
        <div className="row">
          {categories.map((item, index) => (
            <div className="Categoriess" key={index}>
              <div className="categorebox">
                <div>
                  <h2 className="categoreisname">{item.name}</h2>
                  <p className="categoreispara">
                    Explore latest trends and stylish collections.
                  </p>
                </div>

                <div className="categoreisimag">
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;