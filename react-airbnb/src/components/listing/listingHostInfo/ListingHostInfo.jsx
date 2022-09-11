import React from "react";
import "./ListingHostInfo.css";

const ListingHostInfo = (props) => {
    // pass in props here for hosting info

    return (
        <div className="ListingHostInfo">
            <h3>ListingHostInfo</h3>
            <p>{props.data.created_by}</p>
        </div>
    );
};

export default ListingHostInfo;
