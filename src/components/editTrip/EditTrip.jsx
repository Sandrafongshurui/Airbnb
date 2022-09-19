import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { Box } from "@mui/material";
import EditForm from "./EditForm";
import style from "./EditTrip.css";

const EditTrip = (props) => {
    const [catchError, setCatchError] = useState(null);
    const [open, setOpen] = useState(true);
    const [editTrips, setEditTrips] = useState([]);

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
