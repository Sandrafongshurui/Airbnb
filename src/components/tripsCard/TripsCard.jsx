import React, { useState } from "react";
import { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import EditTrip from "../editTrip/EditTrip";
import { toast } from "react-toastify";
import axios from "axios";
import style from "./TripsCard.module.css";
import { format } from "date-fns";

const TripsCard = (props) => {
    const [catchError, setCatchError] = useState(null);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editTrip, setEditTrip] = useState([]);

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

    // to handle delete of booking
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/user/trip/${props.data._id}`,
                { headers: headerOptions }
            );

            console.log("response: ", response);
            toast.success("Successfully deleted", {
                position: toast.POSITION.TOP_CENTER,
            });

            window.location.reload(false);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    // to window confirmation of delete
    const delConfirmation = (e) => {
        if (window.confirm("Are you sure you want to delete the listing?")) {
            e.preventDefault();
            handleDelete();
        } else {
            return false;
        }
    };

    if (!props.data) {
        return <></>;
    }

    const handleToggle = (value) => {
        setAddModalShow(value);
    };

    const handleEdit = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/user/trip/${props.data._id}`,
            { headers: headerOptions }
        );
        const data = await response.data;

        setAddModalShow(true);
        setEditTrip(data);
    };

    return (
        <div className={style.tripsCard}>
            <div>
                <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                    {renderTrips()}
                </Swiper>
            </div>

            {!checkDate ? (
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="edit">
                                <button onClick={handleEdit}>Edit trip</button>
                                {addModalShow && (
                                    <EditTrip
                                        toggle={handleToggle}
                                        data={editTrip}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col">
                            <div className="delete">
                                <button onClick={delConfirmation}>
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
                    {format(new Date(props.data.checkin_date), "dd-MM-yyyy")}
                </strong>
            </div>
            <div>
                <span>Checkout date: </span>
                <strong className={"ms-2 me-2"}>
                    {format(new Date(props.data.checkout_date), "dd-MM-yyyy")}
                </strong>
            </div>
            <div>
                <span>No of Guest: </span>
                <strong className={"ms-2 me-2"}>
                    {props.data.total_guests}
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
