import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404"
        className="notfound-image"
      />

      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>

      <p className="notfound-text">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="notfound-button">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;