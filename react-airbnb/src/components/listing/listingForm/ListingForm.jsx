import React, { useState, useNavigate } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import "./ListingForm.css";

const ListingForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    // const navigate = useNavigate();

    // an variable obj to store the start and end date
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    // to update the start and end date state upon selecting the dates
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    // to set no of guests state upon selecting the no of guests
    const handleGuests = (e) => {
        setNoOfGuests(e.target.value);
    };

    // handles on click of reserve button

    // const handleReserve = () => {
    //     navigate(`/users/trips`);
    // };

    // console.log("selectionRange.endDate: ", selectionRange.endDate);
    // console.log("selectionRange.startDate: ", selectionRange.startDate);

    const datesBetween = require("dates-between");
    const dates = Array.from(datesBetween(startDate, endDate));
    console.log("dates.length: ", dates.length);
    const noOfNights = dates.length - 1;
    console.log("noOfNights: ", noOfNights);
    const pricePerNight = props.data.price["$numberDecimal"].toLocaleString();
    console.log("pricePerNight: ", pricePerNight);
    const totalCost = noOfNights * pricePerNight;
    console.log("totalCost: ", totalCost);
    const test = new Intl.NumberFormat().format(totalCost);
    console.log("test: ", test);

    return (
        <div className="listing-form">
            <h3>ListingForm</h3>

            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        Description
                        <p>{props.data.description}</p>
                    </div>
                    <div className="col">
                        <div className="pricing"></div>
                        <p>
                            $
                            {props.data.price[
                                "$numberDecimal"
                            ].toLocaleString()}{" "}
                            / Night
                        </p>
                        <p>Total cost: ${test} </p>
                        <button className="reserve">Reserve</button>
                        <br />
                        No of Guests:
                        <input
                            type="number"
                            value={noOfGuests}
                            onChange={handleGuests}
                            min={1}
                            max={props.data.accommodates}
                        ></input>
                    </div>
                </div>
            </div>

            <div className="container text-center data-picker">
                <h3>Select your Dates:</h3>
                <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]}
                    onChange={handleSelect}
                    months={2}
                    direction="horizontal"
                    inputRanges={[]}
                />
            </div>
        </div>
    );
};

export default ListingForm;
