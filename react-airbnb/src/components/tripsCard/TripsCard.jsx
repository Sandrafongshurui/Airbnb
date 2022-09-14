import style from "./TripsCard.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TripsCard = (props) => {
    // const { _id, name, price, images_url } = props.data;
    console.log("props.data: ", props.data);

    // const navigate = useNavigate();

    // const handleClickListing = () => {
    //     if (props.isHost) {
    //         navigate(`/user/listings/${_id}`);
    //     } else {
    //         navigate(`/listing-details/${_id}`);
    //     }
    // };

    // const renderImages = () => {
    //     if (props.data) {
    //         return images_url.map((url) => {
    //             return (
    //                 <SwiperSlide key={url} className={style.listingImagesBox}>
    //                     <img className={style.listingImages} src={url} alt="" />
    //                 </SwiperSlide>
    //             );
    //         });
    //     }
    // };

    // if (!props.data) {
    //     return <></>;
    // }

    return <div>Tests</div>;
};

export default TripsCard;
