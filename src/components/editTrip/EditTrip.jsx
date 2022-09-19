import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
import { Box } from "@mui/material";
import EditForm from "./EditForm";
import axios from "axios";
import style from "./EditTrip.css";

const EditTrip = (props) => {
    const [catchError, setCatchError] = useState(null);
    const [open, setOpen] = useState(true);
    const [editTrips, setEditTrips] = useState([]);

    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const response = await axios.get(
    //             "http://localhost:8000/api/v1/user/trips/63286e6046ad1dfff1b8a3bc",
    //             // `http://localhost:8000/api/v1/user/trips/${props.bookingId}`,
    //             { headers: headerOptions }
    //         );
    //         const data = await response.data;
    //         console.log("data: ", data);
    //         setEditTrips(data);
    //     };
    //     fetchApi();
    // }, []);

    const fetchApi = async () => {
        const response = await axios.get(
            "http://localhost:8000/api/v1/user/trips/63286e6046ad1dfff1b8a3bc",
            // `http://localhost:8000/api/v1/user/trips/${props.bookingId}`,
            { headers: headerOptions }
        );
        const data = await response.data;
        console.log("data: ", data);
        setEditTrips(data);
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
                    <EditForm data={editTrips} />
                </div>
            </Box>
        </Modal>
    );
};

export default EditTrip;
