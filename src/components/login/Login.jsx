import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal/Modal";
import { Box } from "@mui/material";
import "bootstrap";
import axios from "axios";
import LoginForm from "./login-form/LoginForm";
import { toast } from "react-toastify";

const Login = (props) => {
    const location = useLocation();
    const [open, setOpen] = useState(true);
    const [catchError, setCatchError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("from login:", data);
        setCatchError(null);
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/login",
                data
            );
            console.log("Server Respond:", res);
            console.log("token", res.data.token);

            if (res.status === 200 || res.status === 201) {
                // store the token into localstorage / cookie
                localStorage.setItem("user_token", res.data.token);
                //close the portal, site header change to token bearer name
                setOpen(false);
                // window.location.reload(true);
                toast.success("Login successfullly", {
                    position: toast.POSITION.TOP_CENTER,
                });
               
                navigate(location.pathname);
            }
        } catch (error) {
            console.log(error);
            // display an error
            console.log(error.response.data.error);
            setCatchError(error.response.data.error);
        }
    };
    return (
        <div className="Login">
            <Modal open={open}>
                <Box justifyContent="center" alignItems="center">
                    <div>
                        <button
                            className="close-button"
                            onClick={() => props.toggle(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-3 mb-2">
                        {catchError && (
                            <div>
                                <h4
                                    style={{
                                        color: "red",
                                        textAlign: "center",
                                    }}
                                >
                                    {catchError}
                                </h4>
                            </div>
                        )}
                        {/* --------insert component here------------- */}
                        <LoginForm data={onSubmit} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Login;
