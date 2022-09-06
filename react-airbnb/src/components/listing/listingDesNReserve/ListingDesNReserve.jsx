import React, { useState } from "react";
import "./ListingDesNReserve.css";
import { DateRangePicker } from "react-date-range";

const ListingDesNReserve = (props) => {
    const [noOfGuests, setNoOfGuests] = useState(1);
    // pass in props for description and price / night

    const handleGuests = (e) => {
        setNoOfGuests(e.target.value);
    };

    return (
        <div className="ListingDesNReserve">
            <h3>ListingDesNReserve</h3>

            <div className="container text-center">
                <div className="row">
                    <div className="col">Description</div>
                    <div className="col">
                        Price / Night
                        <button>Reserve</button>
                        <br />
                        No of Guests:
                        <input
                            type="number"
                            value={noOfGuests}
                            onChange={handleGuests}
                            min={1}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDesNReserve;
