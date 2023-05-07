import React, { useContext } from "react";
import "./chats.scss";
import { ChatContext } from "../../context/chatContext";

function Chats({ showChats, handleShowChats }) {
  const { setShowChatbox } = useContext(ChatContext);
  const handleShowChatbox = () => {
    setShowChatbox(true);
    handleShowChats(!showChats);
  };

  return (
    <div className="chats-list">
      <div className="userInfo" onClick={handleShowChatbox}>
        <div className="userImg">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="online"></div>
        <div className="info">
          <span>Jone Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userInfo" onClick={handleShowChatbox}>
        <div className="userImg">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="online"></div>
        <div className="info">
          <span>Jone Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userInfo" onClick={handleShowChatbox}>
        <div className="userImg">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="online"></div>
        <div className="info">
          <span>Jone Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userInfo" onClick={handleShowChatbox}>
        <div className="userImg">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="online"></div>
        <div className="info">
          <span>Jone Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userInfo" onClick={handleShowChatbox}>
        <div className="userImg">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="online"></div>
        <div className="info">
          <span>Jone Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;
