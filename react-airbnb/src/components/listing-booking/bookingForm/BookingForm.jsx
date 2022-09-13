import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";

const BookingForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
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
        console.log("props.data.price: ", props.data.price);
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
        console.log("errors: ", errors);
    }, [errors]);

    // handles on click of reserve button

    // const handleReserve = () => {
    //     navigate(`/users/trips`);
    // };

    // console.log("selectionRange.endDate: ", selectionRange.endDate);
    // console.log("selectionRange.startDate: ", selectionRange.startDate);

    // // getting the startDate and endDate and push into array
    // const datesBetween = require("dates-between");
    // const dates = Array.from(datesBetween(startDate, endDate));

    // // getting number of nights between startDate and endDate
    // const noOfNights = dates.length - 1;

    // // calculation of total price based on no. of nights
    // const pricePerNight = props.data.price["$numberDecimal"].toLocaleString();
    // const totalPrice = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //     maximumFractionDigits: 2,
    // }).format(noOfNights * pricePerNight);

    return (
        <form
            onSubmit={handleSubmit((booking) =>
                console.log("booking: ", booking)
            )}
            className={"container-fluid p-0"}
        >
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
                                <input
                                    {...register("total_price")}
                                    type="hidden"
                                    value={totalCost}
                                ></input>
                                <label>
                                    <p>
                                        $
                                        {props.data.price[
                                            "$numberDecimal"
                                        ].toLocaleString()}{" "}
                                        / Night
                                    </p>
                                    {/* <p>Total price: {totalPrice}</p>
                                    <Controller
                                        name="total_price"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                name={"total_price"}
                                                value={totalPrice}
                                            />
                                        )}
                                    /> */}
                                </label>
                            </div>
                            No of Guests:
                            <input
                                {...register("total_guest")}
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
                    {/* <Controller
                        // name="checkin_date"
                        control={control}
                        render={({ onChange, value }) => ( */}
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                        months={2}
                        direction="horizontal"
                        inputRanges={[]}
                    />
                    {/* )}
                    /> */}
                    {/* <div>
                        <TextField
                            variant="standard"
                            type="date"
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => {
                                setCheckOut(e.target.value);
                            }}
                            value={checkOut}
                        />
                    </div> */}
                </div>
            </div>
        </form>
    );
};

export default BookingForm;
