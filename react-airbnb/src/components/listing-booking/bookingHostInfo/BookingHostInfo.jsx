import React from "react";
import "./BookingHostInfo.css";

const BookingHostInfo = (props) => {
    // pass in props here for hosting info

    return (
        <div className="BookingHostInfo">
            <h3>BookingHostInfo</h3>
            <p>{props.data.created_by}</p>
        </div>
    );
};

export default BookingHostInfo;
