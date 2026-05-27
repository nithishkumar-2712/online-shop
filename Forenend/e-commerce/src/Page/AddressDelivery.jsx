import React, { useEffect, useState } from "react";
import"./AddressDelivery.css"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/Config/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
 function AddressDelivery() {
  const [orderData, setOrderData] = useState([]);
  console.log(orderData)
  // console.log(orderData)
 const location=useLocation();
 const navigate=useNavigate()
 const {Subtotal,totalAmount,Discount,CartItems}=location.state||{};
//  console.log(CartItems)
//  console.log(Subtotal)
 const {register,handleSubmit,formState: { errors }}=useForm()
  const onSubmit=async(send)=>{
      console.log("Form Data:", send);           // form values
  // console.log("Cart Items:", CartItems);     // from useLocation
  // console.log("Subtotal:", Subtotal);       // from useLocation

  // Prepare payload to send to backend
    const payload = {
      fullName: send.name,
      mobile: send.mobile,
      address: `${send.address}, ${send.city}`,
      pincode: send.pincode,
      expectedDelivery: send.expectedDelivery,
      paymentMode: send.payment,
      products: CartItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.productname,
        qty: item.qty,
        price: item.totalPrice
      })),
      subtotal: Subtotal,
      discount: Discount, // example 10%
      total: Subtotal-Discount,
    };
    // console.log(payload)
    try {
      const{data}=await axios.post("/orders",payload);
      if(data.success){
        toast.success(data.message);
        // console.log(data.data)
        const orderId=data.data._id;
        console.log(orderId);
        setOrderData([data.data]);
        navigate(`/OrderSuccess/${orderId}`, {
          state: { orderData:orderData }
        });
        Deletecart();

      }else{
        toast.warning(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const Deletecart=async()=>{
  console.log("delert cart")
  try {
    const {data}= await axios.delete("/AllDeletecart");
    if(data.success){
      toast.success(data.message);
    }else{
      toast.warning(data.message);
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  return (
    <div className="container">
      {/* Form */}
      <div className="form-section">
        <h2 className="Shippingtitle">Shipping Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
          <label>Full Name</label>
          <input 
            {...register("name", { required: true })}
            placeholder="Full Name"
          />
          {errors.name && <span className="error">Full Name is required</span>}
          <label>Mobile</label>
          <input 
            {...register("mobile", { required: true })}
            placeholder="Mobile Number"
          />
          {errors.mobile && <span className="error">Mobile is required</span>}
          <label>Address</label>
          <textarea 
            {...register("address", { required: true })}
            placeholder="Address"
          ></textarea>
          {errors.address && <span className="error">Address is required</span>}
          <label>City</label>
          <input 
            {...register("city", { required: true })}
            placeholder="City"
          />
          {errors.city && <span className="error">City is required</span>}
          <label>pincode</label>
          <input 
            {...register("pincode", { required: true })}
            placeholder="Pincode"
          />
          {errors.pincode && <span className="error">Pincode is required</span>}
          <label>expectedDelivery</label>
          <input  type="Date"
            {...register("expectedDelivery", { required: true })}
            placeholder="expectedDelivery"
          />
          {errors.expectedDelivery && <span className="error">expectedDelivery is required</span>}

          <div className="payment">
            <h2 className="Paymenttitle">Payment Method</h2>

            <label>
              <input 
                {...register("payment", { required: true })}
                type="radio" 
                value="UPI"  
              /> UPI
            </label>

            <label>
              <input 
                {...register("payment", { required: true })}
                type="radio" 
                value="Card"  
              /> Card
            </label>

            <label>
              <input 
                {...register("payment", { required: true })}
                type="radio" 
                value="COD"  
              /> COD
            </label>
            {errors.payment && <span className="error">Select payment method</span>}
          </div>

          <button type="submit" className="Orderbutton">
            Place Order
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="summary">
        <h2 className="OrderSummary" >Order Summary</h2>

        {CartItems.map((item, index) => (
          <div key={index}>
            <span>{item.productId.productname} x{item.qty}</span>
            <span>₹{item.totalPrice * item.qty}</span>
          </div>
        ))}

        <div>
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>

        <div>
          <span>Discount (10%)</span>
          <span>-₹{Discount}</span>
        </div>

        <div className="total">
          <span>Total</span>
          <span>₹{Subtotal}</span>
        </div>
      </div>
    </div>
  );
}
export default AddressDelivery