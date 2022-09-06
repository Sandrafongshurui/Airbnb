import React from "react";
import "./ListingImg.css";

const ListingImg = (props) => {
    // const displayView = props.showViewButton ? true : false

    return (
        <div className="listingImg">
            <h3>ListingImg</h3>
            <img
                src={props.data.images_url[0]}
                layout="fill"
                alt="Listing"
                objectFit="cover"
            />
        </div>
    );
};

export default ListingImg;
