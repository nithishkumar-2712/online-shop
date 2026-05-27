import React from 'react';
import "./AddtoCart.css";
import Customhook from '../components/Customhook';
import axios from '@/Config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AddtoCart() {
  const { Data,CustomHook, Loading, Error} = Customhook("/getCart");
    const navigate=useNavigate()
  if (Loading) {
  return (
    <div className="cart-container">
      <div className="cart-items">

        {[...Array(3)].map((_, index) => (
          <div className="cart-item" key={index}>

            <Skeleton height={120} width={120} />

            <div className="item-details">
              <Skeleton height={25} width={200} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={80} />
            </div>

            <div className="item-qty">
              <Skeleton height={40} width={120} />
            </div>

          </div>
        ))}

      </div>

      <div className="order-summary">
        <Skeleton height={30} width={180} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={50} />
      </div>
    </div>
  );
}
  
  console.log(Data);

  // console.log(Data);

const handlesize = async (id, size) => {
  console.log(id,size)
  try {
    const { data } = await axios.post("/Updatasize", {
      id,
      size
    });

    if (data.success) {
      CustomHook();
    }
  } catch (error) {
    alert(error.message);
  }
};
   const handleQty = async (id, type) => {
    try {
      const { data } = await axios.post("/Updata", { id, type });
      if(data.success){
        CustomHook();
      }else{
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const deleteCart = async (id) => {
    // console.log(id);
    try {
      const { data } = await axios.delete(`/deleteCart/${id}`);
      if(data.success){
        CustomHook();
        toast.success(data.message);
      }else{
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Subtotal = Data.reduce((acc, cur) => {
    const price =cur.productId.sellingCost
    const qty = cur.qty;
    return acc + (price) * qty;
  }, 0);
  console.log(Subtotal)
  console.log(Data)
  const Discount = Data.reduce((acc, cur) => {
    const original = cur.productId.sellingCost;
    const final = cur.productId.finalPrice;
    const qty = cur.qty;

    return acc + (original - final) * qty;
  }, 0);
  // console.log(Discount)
  const totalAmount = Subtotal - Discount;
  const Checkoutpage=(Subtotal,totalAmount,Discount)=>{
    navigate(`/AddressDelivery/${Data[0]._id}`,{state:{totalAmount:totalAmount,Subtotal:Subtotal,Discount:Discount,CartItems:Data}});
  }

  return (
    <>
      {/* DELIVERY BAR */}
      <div className="delivery-bar">
        <p>🚚 Home Delivery available within 15km of Madurai</p>
      </div>

      <h2 className='cart-title'>🛒 Your Cart</h2>
      {Data.length>0?(
        <div className="cart-container">
          {/* CART ITEMS */}
          <div className="cart-items">
            {Data.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.productId.file[0]} alt={item.productId.productname} />

                <div className="item-details">
                  <p className="item-name">{item.productId.productname}</p>
                  <p className="item-oldprice">₹{item.productId.Mrp}</p>
                  <b className="item-finalprice">₹{item.productId.finalPrice}</b>
                  <div className="option">
                    <label>Size:</label>
                  <b className="item-finalprice">{item.Size}</b>
                  </div>
                </div>
                <div className="item-qty">
                  <button onClick={() => handleQty(item._id, "decrement")}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleQty(item._id, "increment")}>+</button>
                  <button className="delete-btn" onClick={() => deleteCart(item._id)}>Delete</button>
                </div>

                <div className="item-total">₹{Math.floor(item.totalPrice)}</div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{Subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="discount">{Discount > 0 ? `- ₹${Discount}` : "No Discount"}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
            <button className="checkout-btn" onClick={()=>Checkoutpage(totalAmount,Subtotal,Discount)}>Proceed to Checkout</button>
          </div>
        </div>):(<h2 className='cartempty'> Cart is Empty...</h2>)}
    </>
  );
}

export default AddtoCart;