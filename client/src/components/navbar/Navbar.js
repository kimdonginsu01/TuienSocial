import { useContext, useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import makeRequest from "../../axios/axios";
import useDebounce from "../../hooks/useDebounce";

function Navbar() {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

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

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>tuensocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
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
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
