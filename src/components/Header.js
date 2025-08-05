import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/userContext";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();
  const onlineStatus = useOnlineStatus();

  const handleClick = (path) => {
    navigate(path);
  };

  const { loggedInUser } = useContext(userContext);

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <img className="ml-12 h-36" src={LOGO_URL} />
      </div>
      <div className="w-3/4 flex items-center justify-around mr-3.5">
        <ul className=" mx-auto p-2 flex gap-20 cursor-pointer">
          <li>{onlineStatus ? "Online Status : ✅" : "Online Status : ❌"}</li>
          <li onClick={() => handleClick("/")}>Home</li>
          <li>Menu</li>
          <li onClick={() => handleClick("/contact")}>Contact Us</li>
          <li onClick={() => handleClick("/about")}>About Us</li>
          <li>{loggedInUser}</li>
        </ul>
        <button
          className="px-5 py-2 bg-[#ff6b6b] text-white border-none rounded-full cursor-pointer font-medium transition-colors duration-300 ease-in-out hover:bg-[#ff5252]"
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
