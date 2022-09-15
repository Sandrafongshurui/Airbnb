import style from "./listing-card.module.css";
import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Pagination]);

function ListingCard(props) {
    const { _id, name, price, images_url } = props.data;
    console.log(props.data);
    const navigate = useNavigate();

    const handleClickListing = () => {
        if(props.isHost) {
            navigate(`/users/my/listings/${ _id }`)
        } else {
            navigate(`/listing-details/${_id}`);
        }
    };

    const checkPriceType = () => {
        if(props.data){
            return price.$numberDecimal
            ? price["$numberDecimal"].toLocaleString()
            : price.toLocaleString();
        }
    }
    const renderImages = () => {
        if (props.data) {
            return images_url.map((url) => {
                return (
                    <SwiperSlide key={url} className={style.listingImagesBox}>
                        <img className={style.listingImages} src={url} alt="" />
                    </SwiperSlide>
                );
            });
        }
    };
    if (!props.data) {
        return <>
        </>;
    }

    return (
        <div className={style.listingCard} onClick={handleClickListing}>
            <FavoriteBorderIcon className={style.like} />

            <div>
                <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                    {renderImages()}
                </Swiper>
            </div>

            <div className={"ms-2 mt-2 d-flex justify-content-between"}>
                <strong>{name}</strong>
            </div>

            <div>
                <strong className={"ms-2 me-2"}>
                    ${checkPriceType(price)} SGD
                </strong>
                <span>night</span>
            </div>
        </div>
    );
}
export default ListingCard;
