import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-container">
        <ul className="nav-items">
          <li onClick={() => handleClick("/")}>Home</li>
          <li>Menu</li>
          <li onClick={() => handleClick("/contact")}>Contact Us</li>
          <li onClick={() => handleClick("/about")}>About Us</li>
        </ul>
        <button
          className="login-button"
          onClick={() => {
            setLoginStatus(!loginStatus);
          }}
        >
          {loginStatus ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
