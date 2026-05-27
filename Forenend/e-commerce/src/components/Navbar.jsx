import React, { useContext, useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import "../App.css"
import axios from '@/Config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Customhook from './Customhook';
import { AppContext } from '@/App';
import { Flag } from 'lucide-react';
function Navbar() {
  const navigate = useNavigate();
  const{isLoggedIn,tokencheck}=useContext(AppContext);
  const LogOut=async()=>{
    try {
      const {data}=await axios.post("/logout");
      if(data.success){
        toast.success(data.message);
        tokencheck();
        setProfileOpen(false);
        navigate("/");
      }else{
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const [menuOpen, setMenuOpen] = useState(false);
  // const [Useadmin, setUseadmin] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {Data}=Customhook("/Cartcount");
  console.log(Data);
  // const {Data:adminData }=Customhook("/Admin");
  // console.log(adminData);
  // if(adminData.role==='Admin'){
  //   console.log('true');
  //   setUseadmin(true)
  // }else{
  //   setUseadmin(false)
  //   console.log(adminData)
  // }
  return (
    <nav className='navbar'>

      {/* Logo */}
      <div className='logo'>
        <img 
          src='https://cdn-icons-png.flaticon.com/512/1048/1048946.png' 
          alt="logo"
        />
        <h2 className='nameshop'>POWER HOUSE</h2>
      </div>

      {/* Hamburger */}
      <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* Menu */}
      <ul className={`menu ${menuOpen ? "active" : ""}`}>
        {/* {Useadmin?(<> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/Bag">Bag</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        {/* </>):(<> */}
        {/* <li><Link to="/DashboardHome">DashboardHome</Link></li>
        <li><Link to="/ProductManagement">ProductManagement</Link></li>
        <li><Link to="/OrdersManagement">OrdersManagement</Link></li>
        <li><Link to="/UsersManagement">UsersManagement</Link></li>
        <li><Link to="/InventoryManagement">InventoryManagement</Link></li>
        <li><Link to="/AdminReviews">AdminReviews</Link></li> */}
        {/* </>)} */}

        
      </ul>

      {/* Right Section */}
      <div className='icons'>

        {/* Wishlist */}
        {isLoggedIn ?(
        <div className='icon-box'onClick={() => navigate("/WishList")}>
          <i className='fa-regular fa-heart'></i>
          <span >Wishlist</span>
        </div>):(
          <div className='icon-box'onClick={() => navigate("/signup")}>
          <i className='fa-regular fa-heart'></i>
          <span >Wishlist</span>
        </div>

        )}

        {/* Cart */}
        <div className='icon-box cart' onClick={()=>{navigate("/Bag")}}>
          <i className='fa-solid fa-cart-shopping'></i>
          <span>Bag</span>
          <span className='cart-count' >{Data}</span>
        </div>

        {/* Profile */}
      <div className='icon-box profile-box' onClick={() => setProfileOpen(true)}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    className="user-img" alt='profile'/>
        <span>Profile</span>
      </div>

      </div>
      {profileOpen && (
        <div className="modal-overlay" onClick={() => setProfileOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
             alt="user" className="modal-img"/>

            <h3>John Doe</h3>
            {isLoggedIn ?(
              <>
                <button className="modal-btn view"  onClick={() =>{navigate("/profile"),setProfileOpen(false)}}>View Profile</button>
                <button className="modal-btn order"  onClick={() =>{navigate("/OrderDetails"),setProfileOpen(false)}}>OrderDetails</button>
              </>
            ):(
              <button className="modal-btn view"onClick={() => {  navigate("/signin");  setProfileOpen(false);}}>Login </button>
            )}
            {isLoggedIn ?(<button className="modal-btn logout" onClick={LogOut}>
              Logout
            </button>
            ) : (
            <button className="modal-btn logout" onClick={() => {navigate("/signup"),setProfileOpen(false)}}>
              Signup
            </button>)} 

          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar