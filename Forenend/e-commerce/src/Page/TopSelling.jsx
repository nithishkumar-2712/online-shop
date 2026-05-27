import React from "react";
import "./TopSelling.css";

function TopSelling() {
  const products = [
    {
      name: "iPhone 15 Pro",
      sold: 220,
      revenue: 264000,
      profit: 88000,
      stock: 6,
    },
    {
      name: "Nike Air Max",
      sold: 180,
      revenue: 180000,
      profit: 62000,
      stock: 12,
    },
    {
      name: "Samsung S24 Ultra",
      sold: 140,
      revenue: 168000,
      profit: 54000,
      stock: 4,
    },
    {
      name: "JBL Speaker",
      sold: 260,
      revenue: 78000,
      profit: 30000,
      stock: 18,
    },
  ];

  return (
    <div className="pro-container">
      {/* HEADER */}
      <div className="pro-header">
        <h1>🔥 Top Selling Products</h1>
        <p>Real-time sales performance analytics dashboard</p>
      </div>

      {/* CARD */}
      <div className="pro-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sold</th>
              <th>Revenue</th>
              <th>Profit</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td className="name">{p.name}</td>

                <td>{p.sold}</td>

                <td className="revenue">
                  ₹{p.revenue}
                </td>

                <td className="profit">
                  ₹{p.profit}
                </td>

                <td>
                  <span
                    className={
                      p.stock < 10
                        ? "stock low"
                        : "stock good"
                    }
                  >
                    {p.stock}
                  </span>
                </td>

                <td>
                  {p.sold > 200 ? (
                    <span className="badge hot">
                      🔥 Top Seller
                    </span>
                  ) : (
                    <span className="badge normal">
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary">
        <div className="box">
          <h3>Total Revenue</h3>
          <p>₹690000</p>
        </div>

        <div className="box">
          <h3>Total Profit</h3>
          <p>₹234000</p>
        </div>

        <div className="box">
          <h3>Top Product</h3>
          <p>JBL Speaker</p>
        </div>
      </div>
    </div>
  );
}

export default TopSelling;