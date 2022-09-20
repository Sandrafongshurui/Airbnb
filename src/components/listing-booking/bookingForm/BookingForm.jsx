import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./BookingForm.css";

const BookingForm = (props) => {
    // const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    // console.log("tomorrow: ", tomorrow);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        checkin_date: "",
        checkout_date: "",
        total_guests: "",
        total_price: "",
    });

    const navigate = useNavigate();
    const params = useParams();

    //sandra
    let isAuth = false;
    const checkAuth = () => {
        const token = localStorage.getItem("user_token");
        if (token) {
            isAuth = true;
            console.log(token);
        } else {
            isAuth = false;
            console.log("no token");
        }
    };
    checkAuth();
    const loginHandler = () => {
        navigate("/login");
    };

    // an variable obj to store the start and end date
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    console.log("selectionRange: ", selectionRange);

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
            //props.data.price["$numberDecimal"].toLocaleString();
            checkPriceType(); //sandra

        // const totalPrice = new Intl.NumberFormat("en-US", {
        //     style: "currency",
        //     currency: "USD",
        //     maximumFractionDigits: 2,
        // }).format(noOfNights * pricePerNight);

        setTotalPrice(noOfNights * Number(pricePerNight));
    };

    // set no of guests state upon selecting the no of guests
    const handleGuests = (e) => {
        setNoOfGuests(e.target.value);
    };

    //sandra
    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit token---->", localStorage.getItem("user_token")); //sandra
        console.log("handleSubmit: ", handleSubmit);

        try {
            const response = await axios.post(
                `https://ourairbnb.herokuapp.com/api/v1/user/book/${params.listingID}`,
                {
                    checkin_date: startDate,
                    checkout_date: endDate,
                    total_guests: noOfGuests,
                    total_price: totalPrice,
                },
                { headers: headerOptions }
            );

            console.log("startDate: ", startDate);
            console.log("endDate: ", endDate);

            toast.success("Successfully reserved!", {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate(`/users/my/trips`);
        } catch (error) {
            console.log(error.response); //sandra
            console.log(error.response.data.message); //sandra
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    //sandra
    const checkPriceType = () => {
        return props.data.price.$numberDecimal
            ? props.data.price["$numberDecimal"].toLocaleString()
            : props.data.price.toLocaleString();
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
                                    {/* sandra */}
                                    <p>${checkPriceType()} / Night</p>
                                    <p>Total price: ${totalPrice} SGD</p>
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
                            <br />
                            {isAuth ? (
                                <button className="reserve" type="submit">
                                    Reserve
                                </button>
                            ) : (
                                <button
                                    className="reserve"
                                    onClick={loginHandler}
                                >
                                    Login to Reserve
                                </button>
                            )}
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
