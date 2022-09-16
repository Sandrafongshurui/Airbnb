import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DelTrip = () => {
    const params = useParams();
    const [booking, setBooking] = useState(null);
    console.log("params: ", params);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/user/trip/${params.booking_id}`
            );

            console.log(response);
            // toast.success("Reserve is successful", {
            //     position: toast.POSITION.TOP_CENTER,
            // });
            // navigate(`/user/trips`);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return <div>Test</div>;
};

export default DelTrip;
