import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

//acts like a middle ware...its wrapped in side this...so must go through this first
const Auth = (props) => {
  console.log("auth component triggered");
  // write our auth checking logic here in a single place

  // retreive token from localstorage
  // if not exist, redirect to login page
  const token = localStorage.getItem("user_token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // check if token expired, in unit 2 is like the max time thing in session yes?
  // if expired, purge localstorage, redirect to login
  const user = jwt_decode(token);
  console.log(user)
  const now = DateTime.now().toUnixInteger();

  //check expire date with luxon...why not just purge it and make ne wone?
  //this exp is issued with the token.....so we cant change it?
  if (user.exp < now) {
    localStorage.removeItem("user_token");
    return <Navigate to={"/login"} />;
  }

  // render props.component
  return <props.component />;
};

export default Auth;
