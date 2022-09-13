import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import logo from "../../../assets/images/house.png";

const NavBar = () => {
  const [navState, setNavState] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  console.log(openLogin);

  const navStateToggle = () => {
    setNavState((prevState) => !prevState);
  };
  const handleLoginToggle = (value) => {
    setOpenLogin(value);
  };
  const handleRegisterToggle = (value) => {
    setOpenRegister(value);
  };
  const handleOpenRegister = () => {
    setOpenRegister(true);
    navStateToggle();
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
    navStateToggle();
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
          <span className="material-symbols-outlined" onClick={navStateToggle}>
            {" "}
            account_circle{" "}
          </span>
          {navState && (
            <div className="rightPop">
              <p className="rightPopText" onClick={handleOpenRegister}>
                Register
              </p>
              <p className="rightPopText" onClick={handleOpenLogin}>
                Login
              </p>
            </div>
          )}
        </div>
      </div>
      {openLogin && <Login toggle={handleLoginToggle} />}
      {openRegister && <Register toggle={handleRegisterToggle} />}
    </div>
  );
};

export default NavBar;
