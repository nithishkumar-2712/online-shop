import React from "react";
import "./About.css";
import "animate.css";

function About() {
  const customers = [
    {
      name: "Priya",
      review: "Amazing quality and fast delivery. Loved the collection!",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Karthik",
      review: "Best place to buy trendy dresses at affordable price.",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
      name: "Meena",
      review: "Super designs! Will definitely shop again.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Rahul",
      review: "Fast delivery and amazing quality. Highly recommend!",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/75.jpg"
    },
  ];

  return (
    <>
      {/* ABOUT SECTION */}
<div className="about">

  {/* LEFT CONTENT */}

  <div className="About-contant">

    <h1 className="companyname animate__animated animate__fadeInLeft">
      Power House
    </h1>

    <p className="animate__animated animate__fadeInLeft">
      <strong>Who We Are</strong><br />

      Power House is your go-to fashion destination
      for trendy and affordable clothing.
    </p>

    <p className="animate__animated animate__fadeInRight">
      <strong>What We Offer</strong><br />

      Casual wear to party wear for Men,
      Women & Kids.
    </p>

    <p>
      <strong>Why Choose Us</strong><br />

      ✔ High Quality Products <br />

      ✔ Affordable Prices <br />

      ✔ Latest Trends <br />

      ✔ Customer Satisfaction Guaranteed
    </p>

    <h2 className="companyititle">
      Save Money & Save Time
    </h2>

  </div>

  {/* RIGHT IMAGE */}

  <div className="about-image">

    <img
      src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
      alt="fashion"
    />

  </div>

</div>

      {/* CUSTOMER REVIEW SLIDER */}
      <div className="review-section">
        <h2>What Our Customers Say 💬</h2>

        <div className="slider">
          <div className="slide-track">
            {customers.map((c, i) => (
              <div className="card" key={i}>
                <img src={c.img} alt={c.name} className="profile" />
                <h3>{c.name}</h3>
                <div className="stars">{"⭐".repeat(c.rating)}</div>
                <p>{c.review}</p>
              </div>
            ))}

            {/* Duplicate for infinite scroll */}
            {customers.map((c, i) => (
              <div className="card" key={"dup" + i}>
                <img src={c.img} alt={c.name} className="profile" />
                <h3>{c.name}</h3>
                <div className="stars">{"⭐".repeat(c.rating)}</div>
                <p>{c.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="address">
        <div className="about-footer">
          <p>🛒 Power House Fashion Store</p>
          <p>New Collections Launching Soon 🔥</p>
          <p><strong className="stong">Stay Tuned!</strong></p>
        </div>
      </div>
    </>
  );
}

export default About;