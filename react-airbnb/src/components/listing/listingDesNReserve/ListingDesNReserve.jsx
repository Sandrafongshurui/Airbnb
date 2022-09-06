import React, { useState } from "react";
import "./ListingDesNReserve.css";
import { DateRangePicker } from "react-date-range";

const ListingDesNReserve = (props) => {
    // pass in props for description and price / night

    return (
        <div className="ListingDesNReserve">
            <h3>ListingDesNReserve</h3>

            <div className="sticky grid grid-cols-2">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">Description</div>
                        <div className="col">Price / Night</div>

                        <button>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDesNReserve;
