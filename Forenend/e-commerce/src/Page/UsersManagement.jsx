import React, { useState } from 'react'
import "./UsersManagement.css"
import Customhook from '@/components/Customhook'
import axios from '@/Config/axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

function UsersManagement() {
  const { Data, CustomHook, Loading, Error } = Customhook("/getUser");
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log(selectedUser);
  const [showModal, setShowModal] = useState(false);

  const DeleteUser = async (id) => {
    // if (!confirmAction) return;
    try {
      const { data } = await axios.delete(`/DeleteUser/${id}`);
      if (data.success) {
        toast.success(data.message);
        CustomHook();
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUpdate = async (id, isBlocked) => {
    console.log(id, isBlocked)
    const confirmAction = window.confirm(
      isBlocked ? "Are you sure you want to Unblock?" : "Are you sure you want to Block?"
    );
    if (!confirmAction) return;
    try {
      const { data } = await axios.put(`/updateuser/${id}`, {
        isBlocked: !isBlocked,
      });

      if (data.success) {
        toast.success(data.message);
        CustomHook();
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleView = (user) => {
    // console.log("Selected User:", user); // 🔥 log
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  if (Loading) {
    return (
      <div className="users-page">

        <div className="users-header">
          <div className="sk-title"></div>
        </div>

        <div className="users-skeleton-table">

          {[...Array(6)].map((_, i) => (
            <div className="sk-row" key={i}>

              <div className="sk-box sm"></div>

              <div className="sk-user">
                <div className="sk-avatar"></div>
                <div className="sk-line"></div>
              </div>

              <div className="sk-line lg"></div>

              <div className="sk-badge"></div>

              <div className="sk-actions">
                <div className="sk-btn"></div>
                <div className="sk-btn"></div>
                <div className="sk-btn"></div>
              </div>

            </div>
          ))}

        </div>
      </div>
    );
  }

  /* =========================
     ERROR DESIGN
  ========================= */

  if (Error) {
    return (
      <div className="users-page">

        <div className="error-box">

          <h2>⚠ Failed to Load Users</h2>

          <p>Please check server connection...</p>

          <button onClick={() => window.location.reload()}>
            Retry
          </button>

        </div>

      </div>
    );
  }
  return (
    <>
      <div className="users-page">

        <div className="users-header">
          <h2>Users</h2>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Data.map((items, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <img
    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    className="user-img"
  />
                </td>
                <td>{items.Name}</td>
                <td>{items.Email}</td>
                <td><span className={items.isBlocked?"active":"inactive"}>{items.isBlocked?"Active":"inActive"}</span></td>
                <td>
                  <button className="view-btn" onClick={() => handleView(items)}>View</button>
                  <button
                    className="block-btn"
                    onClick={() => handleUpdate(items._id, items.isBlocked)}
                  >
                    {items.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button onClick={() => DeleteUser(items._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="user-modal">

            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close" onClick={closeModal}>✖</button>
            </div>

            <div className="modal-body">

              <p><b>Name:</b> {selectedUser.Name}</p>
              <p><b>Username:</b> {selectedUser.Username || "nithish"}</p>
              <p><b>Number:</b> {selectedUser.Number || "1234567890"}</p>
              <p><b>Status:</b> {selectedUser.isBlocked?"Active":"inActive"}</p>
              <p><b>Email:</b> {selectedUser.Email}</p>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default UsersManagement;