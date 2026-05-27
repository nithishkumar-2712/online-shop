import { useEffect, useState } from "react";
import "./InventoryManagement.css";
import axios from "@/Config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {

  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);
  const [products, setproducts] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");

  const totalPages = Math.ceil(total / 10);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const Adminproduect = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(`/Adminproduct/${page}`);

      if (data.success) {

        setproducts(data.data);

        settotal(data.total);

      } else {

        toast.warning(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    Adminproduect();

  }, [page]);

  // =========================
  // LOW STOCK ALERT
  // =========================

  useEffect(() => {

    const lowStockProducts = products.filter(
      (p) => p.Stock <= 10
    );

    lowStockProducts.forEach((p) => {

      toast.warning(
        `⚠️ Low stock: ${p.productname} (${p.Stock})`,
        {
          toastId: p._id,
        }
      );

    });

  }, [products]);

  // =========================
  // LOADING UI
  // =========================

  if (loading) {

    return (

      <div className="admin-skeleton-page">

        <div className="sk-header"></div>

        <div className="sk-grid">

          {[...Array(8)].map((_, i) => (

            <div className="sk-card" key={i}>

              <div className="sk-title"></div>

              <div className="sk-price"></div>

              <div className="sk-stock"></div>

              <div className="sk-btn"></div>

            </div>

          ))}

        </div>

      </div>

    );

  }

  // =========================
  // UPDATE STOCK
  // =========================

  const updateStock = async () => {

    try {

      const { data } = await axios.put(
        `/updateStock/${selectedProduct._id}`,
        {
          stock: Number(newStock),
        }
      );

      if (data.success) {

        toast.success("Stock Updated Successfully");

        setSelectedProduct(null);

        Adminproduect();

      } else {

        toast.warning(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  // Low stock items
  const lowStockItems = products.filter(
    (p) => p.Stock <= 10
  );

  return (
    <div className="luxury-container">
      <div className="luxury-main">

        {/* Header */}
        <div className="luxury-header">
          {/* <h1>Inventory Overview</h1> */}
          <input type="text" placeholder="Search products..." />
        </div>

        {/* 🔴 Low Stock Section */}
        {lowStockItems.length > 0 && (
          <div className="low-stock-alert">
            <h3>⚠️ Low Stock Products</h3>
            {lowStockItems.map((p) => (
              <p key={p._id}>
                {p.productname} - {p.Stock} left
              </p>
            ))}
          </div>
        )}

        {/* Product Cards */}
        <div className="luxury-grid">
          {products.map((p) => (
            <div className="luxury-card" key={p._id}>
              <h3>{p.productname}</h3>
              <p className="price">₹{p.sellingCost}</p>

              <div className="stock-box">
                <span>Stock: {p.Stock}</span>
                <span className={p.Stock <= 10 ? "status low" : "status ok"}>
                  {p.Stock <= 10 ? "Low Stock" : "In Stock"}
                </span>
              </div>

              <button
                className="action-btn"
                onClick={() => {
                  setSelectedProduct(p);
                  setNewStock(p.Stock);
                }}
              >
                Manage
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setpage(index + 1)}
              className={`page-btn ${page === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

      </div>

      {/* 🔥 Modal */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Update Stock</h2>

            <p><b>{selectedProduct.productname}</b></p>
            <p>Current Stock: {selectedProduct.Stock}</p>

            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={updateStock}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;