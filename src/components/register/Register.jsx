import React, { useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";
import { Box } from "@mui/material";
import "bootstrap";
import RegisterForm from "./register-form/RegisterForm";

const Register = (props) => {
    const [open, setOpen] = useState(true);
    const [catchError, setCatchError] = useState(null);

    const onSubmit = async (data) => {
        console.log("send data:", data);
        setCatchError(null);
        try {
            const res = await axios.post(
                "https://ourairbnb.herokuapp.com/api/v1/user/register",
                data
            );
            console.log("Server Respond:", res);

            if (res.status === 200 || res.status === 201) {
                //close the portal, site header change to token bearer name
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            // display an error
            console.log(error.response.data.error);
            setCatchError(error.response.data.error);
        }
    };

    return (
        <div className="Register">
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
                        <RegisterForm data={onSubmit} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Register;
