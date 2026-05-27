import React, { useEffect, useState } from "react";
import "./OredersManagement.css";
// import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";
import { toast } from "react-toastify";

function OrdersManagement() {
  const [FilterStatus, setFilterStatus] = useState("All");
  console.log(FilterStatus);
  const[Data,setData]=useState([])
  // const { Data, CustomHook } = Customhook("/AllOrderfetch");
// const [FilterStatus, setFilterStatus] = useState("");
// const [data, setData] = useState([]);

const CustomHook = async () => {
  try {

    let url = "/AllOrderfetch";

    // status இருந்தா மட்டும் add பண்ணு
    if (FilterStatus) {
      url = `/AllOrderfetch/${FilterStatus}`;
    }

    const { data } = await axios.get(url);

    if (data.success) {
      setData(data.data);
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  CustomHook();
}, [FilterStatus]);
  // useEffect(()=>{
  //   Fethuorder();
  // },[FilterStatus])

  const [updateOrder, setUpdateOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Invoice State
  const [invoiceData, setInvoiceData] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // View Order
  const handleView = (item) => {
    setSelectedOrder(item);
    setShowModal(true);
  };

  // Update Order
  const handleUpdateClick = (id, status) => {
    setUpdateOrder(id);
    setNewStatus(status);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Update Status API
  const updateStatus = async () => {
    try {
      const { data } = await axios.put(`/update-order/${updateOrder}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message);

        CustomHook();

        setUpdateOrder(null);
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Open Invoice
  const handleInvoice = (item) => {
    setInvoiceData(item);
    setShowInvoice(true);
  };

  // Print Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <>
      <div className="orders-page">
      <div className="filter-box">
        <label>Filter Orders</label>

        <select
          className="filter-select"
          value={FilterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
        <h2>All Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Data.length === 0 ? (
              <tr>
                <td colSpan="12" className="empty-order">
                  Orders Not Found 😔
                </td>
              </tr>
            ) : (
              Data.map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{items.orderId}</td>

                  <td>{items.fullName}</td>

                  <td>₹{items.total}</td>

                  <td>
                    <span
                      className={
                        items.status === "Cancelled"
                          ? "status Cancelled"
                          : items.status === "Delivered"
                          ? "status delivered"
                          : "status pending"
                      }
                    >
                      {items.status}
                    </span>
                  </td>

                  <td>{items.orderDate}</td>

                  <td className="action-buttons">
                    {/* VIEW */}
                    <button
                      className="view"
                      onClick={() => handleView(items)}
                    >
                      View
                    </button>

                    {/* UPDATE */}
                    <button
                      className="update"
                      onClick={() =>
                        handleUpdateClick(items._id, items.status)
                      }
                    >
                      Update
                    </button>

                    {/* INVOICE */}
                    {items.status === "Shipped" && (
                      <button
                        className="invoice"
                        onClick={() => handleInvoice(items)}
                      >
                        Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="order-modal">
            <div className="modal-header">
              <h3>Order Details</h3>

              <button className="close" onClick={closeModal}>
                ✖
              </button>
            </div>

            <div className="modal-grid">
              <div className="card">
                <h4>Products Info</h4>

                <p>Order ID: {selectedOrder.orderId}</p>

                <p>Status: {selectedOrder.status}</p>

                <p>Date: {selectedOrder.orderDate}</p>
              </div>

              <div className="card">
                <h4>User Info</h4>

                <p>Name: {selectedOrder.fullName}</p>

                <p>Phone: {selectedOrder.mobile}</p>

                <p>Address: {selectedOrder.address}</p>
              </div>

              <div className="card">
                <h4>Payment Info</h4>

                <p>Amount: ₹{selectedOrder.total}</p>

                <p>Payment Mode: {selectedOrder.paymentMode}</p>

                <p>
                  Expected Date: {selectedOrder.expectedDelivery}
                </p>
              </div>

              <div className="card">
                <h4>Order Info</h4>

                <p>Order ID: {selectedOrder.orderId}</p>

                <p>Status: {selectedOrder.status}</p>

                <p>Date: {selectedOrder.orderDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {updateOrder && (
        <div className="modal-overlay">
          <div className="order-modal">
            <h3>Update Order Status</h3>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>

              <option value="Shipped">Shipped</option>

              <option value="Delivered">Delivered</option>

              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="update-buttons">
              <button className="update" onClick={updateStatus}>
                Save
              </button>

              <button
                className="delete"
                onClick={() => setUpdateOrder(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {showInvoice && invoiceData && (
        <div className="modal-overlay">
          <div className="order-modal invoice-section">
            <div className="modal-header">
              <h2>Invoice</h2>

              <button
                className="close"
                onClick={() => setShowInvoice(false)}
              >
                ✖
              </button>
            </div>

            <div id="invoice-content">
              <div className="invoice-header">
                <h1>INVOICE</h1>

                <p>
                  <b>Order ID:</b> {invoiceData.orderId}
                </p>

                <p>
                  <b>Order Date:</b> {invoiceData.orderDate}
                </p>
              </div>

              <hr />

              <div className="invoice-user">
                <h3>Customer Details</h3>

                <p>
                  <b>Name:</b> {invoiceData.fullName}
                </p>

                <p>
                  <b>Phone:</b> {invoiceData.mobile}
                </p>

                <p>
                  <b>Address:</b> {invoiceData.address}
                </p>
              </div>

              <hr />

              <div className="invoice-payment">
                <h3>Payment Details</h3>

                <p>
                  <b>Payment Mode:</b>{" "}
                  {invoiceData.paymentMode}
                </p>

                <p>
                  <b>Status:</b> {invoiceData.status}
                </p>

                <p>
                  <b>Expected Delivery:</b>{" "}
                  {invoiceData.expectedDelivery}
                </p>
              </div>

              {/* PRODUCTS TABLE */}
              <h3 style={{ marginTop: "20px" }}>
                Products
              </h3>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceData.products?.map(
                    (product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          {product.name ||
                            product.productName}
                        </td>

                        <td>₹{product.price}</td>

                        <td>
                          {product.quantity || product.qty}
                        </td>

                        <td>
                          ₹
                          {product.price *
                            (product.quantity ||
                              product.qty)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              {/* TOTAL */}
              <div className="invoice-total">
                <h2>
                  Grand Total : ₹{invoiceData.total}
                </h2>
              </div>
            </div>

            <button
              className="invoice print-btn"
              onClick={printInvoice}
            >
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersManagement;