import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = (props) => {
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

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            checkin_date: "",
            checkout_date: "",
            total_price: 0,
            total_guest: 1,
        },
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    // handles on click of reserve button

    // const handleReserve = () => {
    //     navigate(`/users/trips`);
    // };

    // console.log("selectionRange.endDate: ", selectionRange.endDate);
    // console.log("selectionRange.startDate: ", selectionRange.startDate);

    const datesBetween = require("dates-between");
    const dates = Array.from(datesBetween(startDate, endDate));
    const noOfNights = dates.length - 1;
    const pricePerNight = props.data.price["$numberDecimal"].toLocaleString();
    const totalCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(noOfNights * pricePerNight);
    // const totalPrice = totalCost.format(noOfNights * pricePerNight);
    console.log("test: ", totalCost);

    return (
        <form
            onSubmit={handleSubmit(totalCost)}
            className={"container-fluid p-0"}
        >
            <div className={"container-xxl mt-4"}>
                <h3>BookingForm</h3>

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
                            <p>Total cost: {totalCost} </p>
                            <button className="reserve" type={"submit"}>
                                Reserve
                            </button>
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
        </form>
    );
};

export default BookingForm;
