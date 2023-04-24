import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../axios/axios";
import Loading from "../loading/Loading";

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      userId
        ? makeRequest.get("/posts?userId=" + userId).then((res) => res.data)
        : makeRequest.get("/posts").then((res) => res.data),
  });

  return (
    <div className="posts">
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
        <Loading />
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
}

export default Posts;
