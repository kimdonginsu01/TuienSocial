import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/authContext";
import Image from "../image/Image";
import Loading from "../loading/Loading";
import "./RightBar.scss";

function RightBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["friends"],
    queryFn: () =>
      makeRequest
        .get("users/friends/" + currentUser.id)
        .then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <div className="userImg">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <div className="userImg">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
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
            data.map((user) => (
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
