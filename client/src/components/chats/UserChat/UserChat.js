import { useQuery } from "@tanstack/react-query";
import React from "react";
import makeRequest from "../../../axios/axios";
import Image from "../../image/Image";
import moment from "moment";

const UserChat = ({ handleShowChatbox, receipient, messages }) => {
  const { data } = useQuery({
    queryKey: ["userchat", receipient],
    queryFn: () =>
      makeRequest.get("/users/find/" + receipient).then((res) => res.data),
  });

  console.log(data, messages);

  return (
    <div className="userInfo" onClick={handleShowChatbox}>
      <div className="userImg">
        <Image src={data?.profilePic} alt="" />
      </div>
      <div className="online"></div>
      <div className="info">
        <span>{data?.name}</span>
        <p>{messages?.lastMessage}</p>
      </div>
      <p className="sent-at">
        {moment(messages?.updated_at).format("MM-DD-YYYY")}
      </p>
    </div>
  );
};

export default UserChat;
