import React from "react";
import "./Profile.css";
import Customhook from "@/components/Customhook";

function Profile() {

  const {Data}=Customhook("/profile")
  console.log(Data);
  return (
    <div className="profile-containerr">

      {/* LEFT SIDE */}
      <div className="profile-left">
        <img     src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    className="user-img" alt="user" />
        <h2>{Data.Name}</h2>
        <p>{Data.Email}</p>

      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">

        <h2>User Details</h2>

        <div className="info-box">
          <span>Name:</span>
          <p>{Data.Name}</p>
        </div>
        <div className="info-box">
          <span>Username:</span>
          <p>{Data.Username}</p>
        </div>

        <div className="info-box">
          <span>Email:</span>
          <p>{Data.Email}</p>
        </div>

        <div className="info-box">
          <span>Phone:</span>
          <p>{Data.Number}</p>
        </div>

        <div className="info-box">
          <span>Role:</span>
          <p>{Data.role}</p>
        </div>

      </div>

    </div>
  );
}

export default Profile;