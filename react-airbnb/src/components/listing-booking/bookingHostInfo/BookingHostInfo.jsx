import React from "react";
import "./BookingHostInfo.css";

const BookingHostInfo = (props) => {
    // pass in props here for hosting info
    const{firstname, lastname, about_me, email} = props.data.created_by

    return (
        <div className="BookingHostInfo">
            <h3>BookingHostInfo</h3>
            <p>Hosted By: {`${firstname + lastname}`}</p>
            <p>About Host: {about_me}</p>
            <p>Contact: {email}</p>
        </div>
    );
};

export default BookingHostInfo;
