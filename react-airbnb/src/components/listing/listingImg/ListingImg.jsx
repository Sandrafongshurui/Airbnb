import React from "react";
import "./ListingImg.css";

const ListingImg = () => {
    return (
        <div className="listingImg">
            ListingImg
            <img
                src="http://cdn.home-designing.com/wp-content/uploads/2016/04/luxury-art-deco-apartment-interior.jpg"
                layout="fill"
                alt="Listing"
                objectFit="cover"
            />
        </div>
    );
};

export default ListingImg;
