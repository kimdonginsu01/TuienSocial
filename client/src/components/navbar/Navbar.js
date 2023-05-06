import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import useDebounce from "../../hooks/useDebounce";
import Image from "../image/Image";
import "./Navbar.scss";

function Navbar() {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const debouncedValue = useDebounce(search, 600);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setUsersList([]);
      return;
    }

    const fetchApi = async () => {
      const result = await makeRequest
        .get("/users?q=" + debouncedValue)
        .then((res) => res.data);

      setUsersList(result);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleChange = async (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearch(searchValue);
    }
  };

  const handleUserClick = (id) => {
    navigate("/profile/" + id);
    setShowResult(false);
    setSearch("");
  };

  const handleLogout = () => {
    navigate("/login");
    setCurrentUser({});
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>tuensocial</span>
        </Link>
        <HomeOutlinedIcon className="icon" />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="icon" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="icon" />
        )}
        <GridViewOutlinedIcon className="icon" />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            value={search}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {showResult && usersList.length > 0 && (
            <ul className="searchResult">
              {usersList.map((user) => (
                <li onClick={() => handleUserClick(user.id)} key={user.id}>
                  <img src={"/upload/" + user.profilePic} alt="" />
                  <span>
                    <p>{user.name}</p>
                    <span>{user.username}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="icon" />
        <EmailOutlinedIcon className="icon" />
        <NotificationsOutlinedIcon className="icon" />
        <div
          className="user"
          onMouseOver={() => setShowAction(true)}
          onMouseLeave={() => setShowAction(false)}
        >
          <Image src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          {showAction && (
            <div className="user-action">
              <p>
                <SettingsOutlinedIcon />
                Settings
              </p>
              <p className="logout" onClick={handleLogout}>
                <LogoutOutlinedIcon />
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
