import style from "./listing-card.module.css";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from 'swiper/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";

SwiperCore.use([Pagination]);


function ListingCard({ listing }) {

    const navigate = useNavigate();

    const handleClickListing = (listing_id = 1) => {
        navigate(`/listing/1`)
    }

    const renderImages = () => {
        if (listing) {
            return listing.images_url.map(url => {
                return (
                    <SwiperSlide key={url} className={style.listingImagesBox}>
                        <img className={style.listingImages} src={url} alt="" />
                    </SwiperSlide>
                )
            })
        }
    }

        if (!listing) {
            return <></>;
        }

    return (
        <div className={style.listingCard} onClick={handleClickListing}>

            <FavoriteBorderIcon className={style.like}/>

            <div>
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                >
                    {renderImages()}
                </Swiper>
            </div>

            <div className={'ms-2 mt-2 d-flex justify-content-between'}>
                <strong>{listing.name}</strong>
            </div>

            <div>
                <strong className={'ms-2 me-2'}>${listing.price.$numberDecimal} SGD</strong>
                <span>night</span>
            </div>

        </div>
    )
  }

export default ListingCard;