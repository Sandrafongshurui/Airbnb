import React from "react";
import "./BookingImg.css";

const BookingImg = (props) => {
    return (
        <div className="BookingImg">
            <h3>BookingImg</h3>
            <img
                src={props.data.images_url[0]}
                layout="fill"
                alt="Listing"
                objectFit="cover"
            />
        </div>
    );
};

export default BookingImg;
