import React from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const navigate = useNavigate();

  const user = {
    name: "Arun",
    profile: "https://i.pravatar.cc/100?img=1",
    lastMessage: "Hi எப்படி இருக்கீங்க?",
    unread: 3,
    online: true
  };

  return (
    <div className="chat-card" onClick={() => navigate("/Singlechat")}>
      
      {/* Profile */}
      <div className="profile-wrapper">
        <img src={user.profile} alt="profile" className="profile-img" />

        {user.online && <span className="online-dot"></span>}
      </div>

      {/* Info */}
      <div className="chat-info">
        <div className="chat-name">{user.name}</div>
        <div className="chat-message">{user.lastMessage}</div>
      </div>

      {/* Unread */}
      {user.unread > 0 && (
        <div className="unread-badge">{user.unread}</div>
      )}
    </div>
  );
}

export default Chat;