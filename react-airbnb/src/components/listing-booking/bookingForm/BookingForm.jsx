import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

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

        // getting the startDate and endDate and push into array
        const datesBetween = require("dates-between");
        const dates = Array.from(
            datesBetween(ranges.selection.startDate, ranges.selection.endDate)
        );

        // getting number of nights between startDate and endDate
        const noOfNights = dates.length - 1;

        // calculation of total price based on no. of nights
        const pricePerNight =
            props.data.price["$numberDecimal"].toLocaleString();

        const totalPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(noOfNights * pricePerNight);

        setTotalCost(noOfNights * Number(pricePerNight));
    };

    // to set no of guests state upon selecting the no of guests
    const handleGuests = (e) => {
        setNoOfGuests(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/user/listing",
                e
            );
            console.log(response);
            toast.success("Reserve is successful", {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate(`/users/trips`);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        console.log({
            checkin_date: startDate,
            checkout_date: endDate,
            total_guests: noOfGuests,
            total_costs: totalCost,
        });
    };

    return (
        <form onSubmit={handleSubmit} className={"container-fluid p-0"}>
            <div className={"container-xxl mt-4"}>
                <h4>BookingForm</h4>

                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            Description
                            <p>{props.data.description}</p>
                        </div>
                        <div className="col">
                            <div className="pricing">
                                <label>
                                    <p>
                                        $
                                        {props.data.price[
                                            "$numberDecimal"
                                        ].toLocaleString()}{" "}
                                        / Night
                                    </p>
                                    <p>Total price: ${totalCost}</p>
                                </label>
                            </div>
                            No of Guests:
                            <input
                                type="number"
                                value={noOfGuests}
                                onChange={handleGuests}
                                min={1}
                                max={props.data.accommodates}
                            ></input>
                            <button className="reserve" type="submit">
                                Reserve
                            </button>
                            <br />
                        </div>
                    </div>
                </div>

                <div className="container text-center data-picker">
                    <h4>Select your Dates:</h4>

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
        </form>
    );
};

export default BookingForm;
