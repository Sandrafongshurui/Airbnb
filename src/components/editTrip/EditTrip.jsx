import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
import { Box } from "@mui/material";
import EditForm from "./EditForm";
import axios from "axios";
import style from "./EditTrip.css";

const EditTrip = (props) => {
    const [catchError, setCatchError] = useState(null);
    const [open, setOpen] = useState(true);

    const onEdit = async (data) => {
        console.log("from login:", data);
        setCatchError(null);
        try {
            // const res = await axios.post(
            //     "http://localhost:8000/api/v1/user/login",
            //     data
            // );
            // console.log("response: ", res);
            toast.success("Successfully edited", {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
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
                    <EditForm data={onEdit} />
                </div>
            </Box>
        </Modal>
    );
};

export default EditTrip;
