import React from "react";
import "./Orderreturn.css";
import Customhook from "@/components/Customhook";

const AdminReturns = () => {
  const { Data = [], Loading, Error,CustomHook, } = Customhook("/return");
  console.log(Data)
  if (Loading) {

    return (

      <div className="return-container">

        <div className="return-skeleton-title"></div>

        <div className="return-skeleton-table">

          {[...Array(6)].map((_, index) => (

            <div
              className="return-skeleton-row"
              key={index}
            >

              <div className="sk-box small"></div>

              <div className="sk-box"></div>

              <div className="sk-img"></div>

              <div className="sk-box large"></div>

              <div className="sk-box"></div>

              <div className="sk-status"></div>

            </div>

          ))}

        </div>

      </div>

    );

  }

  // =========================
  // ERROR UI
  // =========================

  if (Error) {

    return (

      <div className="return-container">

        <div className="return-error">

          <h2>
            ⚠️ Failed to Load Returns
          </h2>

          <p>
            Something went wrong while fetching
            return orders.
          </p>

          <button onClick={CustomHook}>
            Retry Again
          </button>

        </div>

      </div>

    );

  }

  return (
    <div className="return-container">
      <h2 className="return-title">Return Orders</h2>

      <table className="return-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>User</th>
            <th>Product</th>
            <th>Comment</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {Data.map((item,index) => (
            <tr key={item._id}>
              <td>{index+1}</td>
              <td>{item.UserId?.Name}</td>

              <td><img src={item.productId?.file[0]} className="product-imgg"/></td>

              <td>{item.comment}</td>

              <td>{item.reason}</td>

              <td>
                <span
                  className={`status ${
                    item.status === "approved"
                      ? "approved"
                      : item.status === "rejected"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReturns;