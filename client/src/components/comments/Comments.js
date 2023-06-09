import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/authContext";
import Loading from "../loading/Loading";
import "./comments.scss";
import Image from "../image/Image";

function Comments({ postId }) {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <Image src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <Image src={comment.profilePic} alt="" />
            <div className="uinfo">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;
