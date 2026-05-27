import React, { useContext } from "react";
import "./Adminprofil.css";
import Customhook from "@/components/Customhook";
import axios from '@/Config/axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from '@/App';
 function Adminprofil() {
    const{isLoggedIn,tokencheck}=useContext(AppContext);
    const {Data}=Customhook("/profile");
      const navigate = useNavigate();
    console.log(Data);
      const LogOut=async()=>{
        
    try {
      const {data}=await axios.post("/logout");
      if(data.success){
        toast.success(data.message);
        console.log("success")
        tokencheck();
        // setProfileOpen(false);
        navigate("/");
      }else{
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
        <div className="profile-container">

      {/* LEFT SIDE */}
      <div className="profile-left">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
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
        <div className="info-box">
          {/* <span>Role:</span> */}
          <button className="modal-btn logout" onClick={LogOut}>
              Logout
            </button>
        </div>

      </div>

    </div>
      
    </>
  )
}
export default Adminprofil