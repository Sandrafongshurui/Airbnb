import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import EditTrip from "../editTrip/EditTrip";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import style from "./TripsCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const TripsCard = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [trip, setTrip] = useState(null);

    const renderTrips = () => {
        if (props.data) {
            return props.data.listing.images_url.map((url) => {
                return (
                    <SwiperSlide key={url} className={style.listingImagesBox}>
                        <img className={style.listingImages} src={url} alt="" />
                    </SwiperSlide>
                );
            });
        }
    };

    // compare dates to determine if its past trip or not
    const currentDate = new Date();
    const isCurrentDate = currentDate.toISOString();
    const checkIn = props.data.checkin_date;
    const checkDate = isCurrentDate > checkIn;

    //sandra
    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    const refreshPage = () => {
        window.location.reload(false);
    };

    // to handle delete of booking
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/user/trip/${props.data._id}`,
                { headers: headerOptions }
            );

            console.log("response: ", response);
            toast.success("Successfully deleted", {
                position: toast.POSITION.TOP_CENTER,
            });
            refreshPage();
            // navigate(`/users/my/trips`);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    // const handleReply = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const reply = await axios.get(
    //             "http://localhost:8000/api/v1/user/trips",
    //             { headers: headerOptions }
    //         );
    //         console.log("reply: ", reply);
    //     } catch (error) {
    //         toast.error(error.message, {
    //             position: toast.POSITION.TOP_CENTER,
    //         });
    //     }
    // };

    if (!props.data) {
        return <></>;
    }

    return (
        <div className={style.tripsCard}>
            <div>
                <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                    {renderTrips()}
                </Swiper>
            </div>

            {/* TO FIX THIS PART */}
            {!checkDate ? (
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="edit">
                                <button onClick={EditTrip}>Edit trip</button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="delete">
                                <button onClick={handleDelete}>
                                    Delete trip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <strong>Past trip</strong>
            )}

            <div className={"ms-2 mt-2 d-flex justify-content-between"}>
                <span>Listing: </span>
                <strong>{props.data.listing.name}</strong>
            </div>

            <div>
                <span>Location: </span>
                <strong className={"ms-2 me-2"}>
                    {props.data.listing.state}
                </strong>
            </div>

            <div>
                <span>Checkin date: </span>
                <strong className={"ms-2 me-2"}>
                    {props.data.checkin_date}
                </strong>
            </div>
            <div>
                <span>Checkout date: </span>
                <strong className={"ms-2 me-2"}>
                    {props.data.checkout_date}
                </strong>
            </div>
            <div>
                <span>Total Price: </span>
                <strong className={"ms-2 me-2"}>
                    ${props.data.total_price} SGD
                </strong>
            </div>
        </div>
    );
};

export default TripsCard;
