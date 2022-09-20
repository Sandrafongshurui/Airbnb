import LoginForm from "../../components/login/login-form/LoginForm";
import "../../components/modal/Modal.css";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [catchError, setCatchError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log("from loginpage:", data);
    setCatchError(null);
    try {
      const res = await axios.post(
        "https://ourairbnb.herokuapp.com/api/v1/user/login",
        data
      );
      console.log("Server Respond:", res);
      console.log("token", res.data.token);

      if (res.status === 200 || res.status === 201) {
        // store the token into localstorage / cookie
        localStorage.setItem("user_token", res.data.token);
        //navigate to home
        if (location.pathname === "/login") {
          history.length > 0 ? history.goBack() : navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      // display an error
      console.log(error.response.data.error);
      setCatchError(error.response.data.error);
    }
  };
  return (
    <div className="login-page-div">
      <div className="login-modal-body">
        <div className="p-3 mb-2">
          {catchError && (
            <div>
              <p style={{ color: "red", textAlign: "center", marginBottom: "1em" }}>
                {catchError}
              </p>
            </div>
          )}
          {/* --------insert component here------------- */}
          <LoginForm data={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
