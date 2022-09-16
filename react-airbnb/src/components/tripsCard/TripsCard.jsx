import style from "./TripsCard.module.css";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useState } from "react";
import EditTrip from "../editTrip/EditTrip";
import DelTrip from "../delTrip/DelTrip";
import { Link } from "react-router-dom";

const TripsCard = (props) => {
    // const { _id, name, price, images_url } = props.data;
    console.log("props.data: ", props.data);

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
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className="edit">
                            <button onClick={EditTrip}>Edit trip</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="delete">
                            <button onClick={DelTrip}>Delete trip</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"ms-2 mt-2 d-flex justify-content-between"}>
                <strong>{props.data.listing.name}</strong>
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
                    ${props.data.listing.total_price} SGD
                </strong>
            </div>
        </div>
    );
};

export default TripsCard;
