import React, { useState, useEffect } from "react";
import "./OrderConfirmation.css";
import { toast } from "react-toastify";
import Customhook from "@/components/Customhook";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";   

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || [];
  console.log(orderData)
  // const [orderData, setOrderData] = useState([]);
  const { Data } = Customhook("/orders-fetch");
  const navigate = useNavigate();

  useEffect(() => {
    if (!Data) return;

    if (Data.success) {
      toast.success(Data.message);
      alert(Data.message)
      // setOrderData(Data.data); // ✅ correct
    } else {
      toast.error(Data.message);
    }
  }, [Data]);

  const ContinueShopping = () => {
    navigate("/product");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="icon">✔</div>
          <div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for shopping with us 🎉</p>
          </div>
        </div>

        <div className="order-info">
          <div className="products">
            {orderData.map((order, idx) => (
              <div key={idx}>
                {order.products.map((prod, i) => (
                  <div key={i} className="product-row">
                    <img src={prod.img} alt={prod.name} />
                    <div className="product-details">
                      <p className="name">{prod.name}</p>
                      <p className="qty">Quantity: {prod.qty}</p>
                    </div>
                    <p className="price">₹ {prod.price}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {orderData.length > 0 && (
            <h3 className="total">Total: ₹ {orderData[0].total}</h3>
          )}
        </div>

        <div className="address">
          <h2>Delivery Address</h2>
          {orderData.length > 0 && <p>{orderData[0].address}</p>}
        </div>

        <div className="buttons">
          <button className="primary" onClick={()=>navigate("/OrderDetails")}>Track Order</button>
          <button className="secondary" onClick={ContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;