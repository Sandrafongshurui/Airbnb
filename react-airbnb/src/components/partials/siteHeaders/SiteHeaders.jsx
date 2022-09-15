
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import logo from "../../../assets/images/house.png";
import "./siteHeader.css";
import { useNavigate, useLocation } from "react-router-dom";

const SiteHeader = () => {
  let username = "username"
  const location = useLocation();
  const navigate = useNavigate();
  const [navState, setNavState] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  console.log("open siteheader ")
  const checkAuth = () => {
    const token = localStorage.getItem("user_token");
    if(token){
        setIsAuth(true)
        console.log(token)
    }else{
        setIsAuth(false);
    }
  };

  // useEffect(() => {
  //   checkAuth() 
  //   console.log("use effect, check auth")
  // }, []);

  const navStateToggle = () => {
    setNavState((prevState) => !prevState);
    checkAuth();
  };
  const handleLoginToggle = (value) => {
    setOpenLogin(value);
  };
  const handleRegisterToggle = (value) => {
    setOpenRegister(value);
  };
  const handleOpenRegister = () => {
    if(location.pathname !== "/register")
    {
        setOpenRegister(true);
        setOpenLogin(false);      
    }else{
      navigate("/register")
    }
    navStateToggle();
    
  };
  const handleOpenLogin = () => {
    if(location.pathname !== "/login")
    {
        setOpenLogin(true);
        setOpenRegister(false);       
    }else{
      navigate("/login")
    }
    navStateToggle();
    
  };

 

  const handleLogout = () => {
    const token = localStorage.getItem("user_token");
    if (token) {
      localStorage.removeItem("user_token");
      console.log("log out");
      navStateToggle()
      navigate("/");
    }
  };


  return (
    <div>
      <div className="header">
        <Link to="/">
          <img className="header__icon" src={logo} alt=" Airbnb" />
        </Link>

        <div className="header__center">
          <input type="text" />
        </div>

        <div className="header__right">
           {isAuth && (<p style={{marginRight: "2em", marginBottom: "0"}}> {username} </p>)}
          <span className="material-symbols-outlined" onClick={navStateToggle}>
            {" "}
            account_circle{" "}
          </span>
          {navState &&
            (isAuth ? (
              <div className="rightPop">
                <p className="rightPopText" onClick={()=>{navigate("users/my/trips")}}>
                  My trips
                </p>
                <p className="rightPopText" onClick={()=>{navigate("users/my/listings")}}>
                  My listings
                </p>
                <p className="rightPopText" onClick={()=>{navigate("/users/my/profile")}}>
                  My Profile
                </p>
                <p className="rightPopText" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            ) : (
              <div className="rightPop">
                <p className="rightPopText" onClick={handleOpenRegister}>
                  Register
                </p>
                <p className="rightPopText" onClick={handleOpenLogin}>
                  Login
                </p>
              </div>
            ))}
        </div>
      </div>
      {openLogin && <Login toggle={handleLoginToggle} />}
      {openRegister && <Register toggle={handleRegisterToggle} />}    
    </div>
  );
};

export default SiteHeader;
