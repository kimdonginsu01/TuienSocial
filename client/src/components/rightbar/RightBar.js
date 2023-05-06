import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/authContext";
import Image from "../image/Image";
import Loading from "../loading/Loading";
import "./RightBar.scss";

function RightBar() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data: friendsData } = useQuery({
    queryKey: ["friends"],
    queryFn: () =>
      makeRequest
        .get("users/friends/" + currentUser.id)
        .then((res) => res.data),
  });

  const { data: potentialFriendsData } = useQuery({
    queryKey: ["potential-friends"],
    queryFn: () =>
      makeRequest
        .get("users/potential-friends/" + currentUser.id)
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["potential-friends"] });
    },
  });

  const handleFollow = async (userId) => {
    await mutation.mutate(userId);
  };

  const potentialFriends = potentialFriendsData?.filter(
    (user) => !friendsData?.some((friend) => friend.id === user.id)
  );

  console.log(potentialFriends);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {potentialFriends?.map((user) => (
            <div className="user" key={user.id}>
              <div className="userInfo">
                <div className="userImg">
                  <Image src={user.profilePic} alt="" />
                </div>
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleFollow(user.id)}>follow</button>
                <button>dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <div className="userImg">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <div className="userImg">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <div className="userImg">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          {isLoading ? (
            <Loading />
          ) : (
            friendsData.map((user) => (
              <Link to={"profile/" + user.id} className="user" key={user.id}>
                <div className="userInfo">
                  <div className="userImg">
                    <Image src={user.profilePic} alt="" />
                  </div>
                  <div className="online"></div>
                  <span>{user.name}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
