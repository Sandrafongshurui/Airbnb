import React from "react";
import "./BookingHostInfo.css";

const BookingHostInfo = (props) => {
    // pass in props here for hosting info
    const{firstname, lastname, about_me, email} = props.data.created_by

    return (
        <section>
            <div className={"container-fluid mt-4 pb-6"}>

                <div className="bookingHostInfo">

                        <div className="mt-3">
                            <h2>Hosted By: {`${firstname + lastname}`}</h2>
                        </div>

                        <div className="container-fluid mt-4 mb-1">
                            <div className="row">
                                <div className="col">
                                    <p>Contact: {email}</p>
                                </div>
                            </div>

                            <div className="row">
                                <p>About Host: {about_me}</p>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default BookingHostInfo;
