import React from "react";
import "./BookingImg.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Pagination, Navigation} from "swiper/core";

// import required modules
SwiperCore.use([Pagination,Navigation]);

const BookingImg = (props) => {
    const{name, images_url}=props.data
    // console.log(props.data)

    const renderImages = () => {
        if (images_url) {
            return images_url.map((url) => {
                return (
                    <SwiperSlide key={ url }>
                        <img 
                            src={ url } 
                            alt="" 
                            layout="fill"
                        />
                    </SwiperSlide>
                );
            });
        }
    };

    return (
        <div className={"container-fluid mt-4 mb-1"}>
            <div className="container ">
                <div className="row">
                    <h2>{name}</h2>
                </div>

                <div className="row align-item-center">
                
                    <div className="bookImg">

                        <Swiper 
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                                }}
                            navigation={true}
                            modules={[Pagination,Navigation]}
                            className="mySwiper"
                        >
                            {renderImages()}
                        </Swiper>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default BookingImg;
