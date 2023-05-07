import CloseIcon from "@mui/icons-material/Close";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";
import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import "./chat.scss";
import Input from "../input/Input";
import Messages from "../messages/Messages";

function Chat() {
  const { setShowChatbox } = useContext(ChatContext);

  const handleClose = () => {
    setShowChatbox(false);
  };

  return (
    <div className="chat-box">
      <div className="chat-info">
        <div className="user-info">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <span>John Doe</span>
        </div>
        <div className="chat-icons">
          <LocalPhoneOutlinedIcon
            sx={{
              padding: "4px",
              cursor: "pointer",
            }}
          />
          <VideoChatOutlinedIcon
            sx={{
              padding: "4px",
              cursor: "pointer",
            }}
          />
          <CloseIcon
            onClick={handleClose}
            sx={{
              padding: "4px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
