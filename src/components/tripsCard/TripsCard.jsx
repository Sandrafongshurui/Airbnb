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
    // const { _id, name, price, images_url } = props.data;
    console.log("props.data: ", props.data);
    const navigate = useNavigate();
    const params = useParams();
    // const [booking, setBooking] = useState(null);
    console.log("props.data._id: ", props.data._id);
    console.log("params: ", params);
    console.log("params.booking_id: ", params.booking_id);

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

    // to handle delete of booking
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/user/trip/${params.booking_id}`
            );

            console.log(response);
            toast.success("Successfully deleted", {
                position: toast.POSITION.TOP_CENTER,
            });
            // navigate(`/user/trips`);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

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
