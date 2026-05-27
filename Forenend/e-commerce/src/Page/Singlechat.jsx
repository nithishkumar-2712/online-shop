import React, { useState } from "react";
import "./Singlechat.css";

function Singlechat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi எப்படி இருக்கீங்க?", sender: "other" },
    { text: "நல்லா இருக்கேன் 👍", sender: "me" }
  ]);

  const user = {
    name: "Arun",
    profile: "https://i.pravatar.cc/100?img=1",
    online: true
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    setMessages([...messages, { text: message, sender: "me" }]);
    setMessage("");
  };

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <img src={user.profile} alt="profile" className="header-img" />
        <div>
          <div className="header-name">{user.name}</div>
          <div className="header-status">
            {user.online ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "me" ? "me" : "other"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Singlechat;