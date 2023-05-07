import React from "react";
import "./message.scss";

function Message() {
  return (
    <div className="message">
      <div className="message-info">
        <img
          src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
      </div>
      <div className="message-content">
        <p>Hello</p>
        <img
          src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
      </div>
    </div>
  );
}

export default Message;
