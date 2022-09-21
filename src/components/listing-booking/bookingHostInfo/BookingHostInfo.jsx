import React from "react";
import "./BookingHostInfo.css";

const BookingHostInfo = (props) => {
    const{firstname, lastname, about_me, email} = props.data.created_by

    return (
        <section>
            <div className={"container-fluid mt-4 pb-6"}>

                <div className="container">

                    <div className="bookingHostInfo">

                            <div className="hostedBy">
                                <h2>Hosted By: {`${firstname + lastname}`}</h2>
                            </div>

                            <div className="container-fluid mt-4 mb-1">
                                <div className="row">
                                        <p className="ps-0">Contact: {email}</p>
                                </div>

                                <div className="row">
                                    <p className="ps-0">About Host: {about_me}</p>
                                </div>
                            </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default BookingHostInfo;
