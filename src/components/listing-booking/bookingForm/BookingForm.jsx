import React, { useState, useEffect } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./BookingForm.css";

const BookingForm = (props) => {
    const unavailableDates = props.data.unavailable_dates
    // const getDates = (datesArray) => {
    //     const structuredDates= []
    //     datesArray.forEach(element => {
    //         structuredDates.push([new Date(element[0]), new Date(element.slice(-1))])
    //     });
    //     console.log(structuredDates)
    //     return structuredDates
    // }
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [unavailableDates, setUnavailableDates] = useState[[]]
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
            // console.log(token);
        } else {
            isAuth = false;
            // console.log("no token");
        }
    };
    checkAuth();
    const loginHandler = () => {
        navigate("/login");
    };

    // an variable obj to store the checkin date and checkout date
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
        // console.log("submit token---->", localStorage.getItem("user_token")); //sandra
        // console.log("handleSubmit: ", handleSubmit);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/user/book/${params.listingID}`,
                {
                    checkin_date: startDate,
                    checkout_date: endDate,
                    total_guests: noOfGuests,
                    total_price: totalPrice,
                },
                { headers: headerOptions }
            );
            // console.log(response);
            toast.success("Successfully reserved!", {
                position: toast.POSITION.TOP_CENTER,
            });
            // navigate(`/users/my/trips`);
        } catch (error) {
            // console.log(error.response); //sandra
            // console.log(error.response.data.message); //sandra
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

            <div className={"container-fluid mt-4 mb-1"}>

                <div className="container">
                    <div className="row">

                        <div className="col descriptionBox">
                            <h2>Description</h2>
                            <p>{props.data.description}</p>
                        </div>

                        <div className="col reserveBox">

                            <div className="pricingBox">

                                <div className="row mt-2">

                                    <label className="col-5">
                                        <p className="priceFont">Price/night: ${checkPriceType()} SGD</p>
                                    </label>

                                    <label className="col-5">
                                        <p className="priceFont">Total price:${totalPrice} SGD</p>
                                    </label>

                                </div>

                                <div className="row">

                                    <div className="col-5">

                                        <TextField
                                            fullWidth
                                            label="Number of guests"
                                            type="number"
                                            InputProps={{ inputProps:
                                                {
                                                    min: 1,
                                                    max: props.data.accommodates
                                                }
                                            }}
                                            variant="standard"
                                            onChange={handleGuests}
                                            value={ noOfGuests }
                                        />

                                    </div>

                                </div>

                            </div>

                            <div>
                            {isAuth ? (
                                <button className="reserve" type="submit">
                                    Reserve
                                </button>
                            ) : (
                                <button disabled 
                                    //className="dreserve"
                                    // onClick={loginHandler}
                                >
                                    Login to Reserve
                                </button>
                            )}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="container ">

                    <div className="date-title">
                        <h2>Select your Dates:</h2>
                    </div>

                    <div className="date-picker">
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
            </div>
        </form>
    );
};

export default BookingForm;
