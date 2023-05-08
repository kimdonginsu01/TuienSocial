import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import makeRequest from "../../axios/axios";
import { ChatContext } from "../../context/chatContext";
import "./chats.scss";
import UserChat from "./UserChat/UserChat";

function Chats({ showChats, handleShowChats, userId }) {
  const { setShowChatbox } = useContext(ChatContext);
  const handleShowChatbox = () => {
    setShowChatbox(true);
    handleShowChats(!showChats);
  };

  const { data } = useQuery({
    queryKey: ["chats", userId],
    queryFn: () => makeRequest.get("/chats").then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="chats-list">
      {data?.map((user, index) => (
        <UserChat
          key={index}
          handleShowChatbox={handleShowChatbox}
          messages={user}
          receipient={
            user.senderId === userId ? user.receipientId : user.senderId
          }
        />
      ))}
    </div>
  );
}

export default Chats;
