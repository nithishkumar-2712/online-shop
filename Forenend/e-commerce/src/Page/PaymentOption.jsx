import React, { useState } from "react";

function PaymentOptions() {
    const totalAmount= "180"
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePayment = () => {
    if (paymentMethod === "COD") {
      alert("✅ Order placed with Cash on Delivery");
    }

    if (paymentMethod === "ONLINE") {
      alert("🔄 Redirecting to payment gateway...");
      // Razorpay / Stripe / PhonePe integration later
    }

    if (paymentMethod === "WALLET") {
      alert("💰 Wallet payment successful");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5>Select Payment Method</h5>

      {/* COD */}
      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="form-check-label">
          Cash on Delivery
        </label>
      </div>

      {/* ONLINE */}
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          value="ONLINE"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="form-check-label">
          Pay Now (UPI / Card)
        </label>
      </div>

      {/* WALLET */}
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          value="WALLET"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="form-check-label">
          Wallet / EMI
        </label>
      </div>

      <hr />

      <h6>Total Amount: ₹{totalAmount}</h6>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={handlePayment}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default PaymentOptions;
