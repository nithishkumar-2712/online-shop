import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";
import { AppContext } from '@/App';
function AdminNavbar() {
  const{isLoggedIn,tokencheck}=useContext(AppContext);
  return (
    <>
    /* TOP NAVBAR */

<div className="top-navbar">

  <div className="top-left">
    <h2>Admin Panel</h2>
  </div>

  <div className="top-right">

    <i className="fa-solid fa-bell"></i>

    <i className="fa-solid fa-gear"></i>

    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="admin"
      className="top-profile"
    />

  </div>

</div>
    {isLoggedIn ?(
          <div className="admin-sidebar">

      {/* TITLE */}

      <h2 className="admin-title">ADMIN PANEL</h2>

      {/* MENU */}

      <div className="admin-menu">

        <Link to="/DashboardHome" className="admin-item">
          <i className="fa-solid fa-chart-line"></i>
          <span>Dashboard</span>
        </Link>

        <Link to="/ProductManagement" className="admin-item">
          <i className="fa-solid fa-box"></i>
          <span>Products</span>
        </Link>

        <Link to="/OrdersManagement" className="admin-item">
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Orders</span>
        </Link>

        <Link to="/UsersManagement" className="admin-item">
          <i className="fa-solid fa-users"></i>
          <span>Users</span>
        </Link>

        <Link to="/InventoryManagement" className="admin-item">
          <i className="fa-solid fa-warehouse"></i>
          <span>Inventory</span>
        </Link>

        <Link to="/AdminReviews" className="admin-item">
          <i className="fa-solid fa-star"></i>
          <span>Reviews</span>
        </Link>
        <Link to="/Orderreturn" className="admin-item">
          <i className="fa-solid fa-star"></i>
          <span>return</span>
        </Link>
        <Link to="/MasterManagement" className="admin-item">
          <i className="fa-solid fa-star"></i>
          <span>MasterManagement</span>
        </Link>

      </div>

      {/* ADMIN PROFILE */}

      <div className="admin-profile">
        <Link to="/Adminprofil">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="admin"
          className="admin-profile-img"
        />
        </Link>
        <div className="admin-profile-info">
          
            <h4>Admin</h4>
            <p>Administrator</p>
          
        </div>

      </div>

    </div>):(<></>)}
    </>

  );
}

export default AdminNavbar;