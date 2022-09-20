import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import "bootstrap";

const EditForm = (props) => {
    const [totalPrice, setTotalPrice] = useState(0);
    // const [editData, setEditData] = useState(null);
    const params = useParams();

    const isoStrCheckIn = props.data[0].checkin_date;
    const isoStrCheckOut = props.data[0].checkout_date;

    // TODO: convert date format here
    const [formData, setFormData] = useState({
        checkin_date: new Date(isoStrCheckIn),
        checkout_date: new Date(isoStrCheckOut),
        total_guests: props.data[0].total_guests,
        total_price: props.data[0].total_price,
    });

    const selectionRange = {
        startDate: formData.checkin_date,
        endDate: formData.checkout_date,
        key: "selection",
    };

    // const handleSelect = (ranges) => {
    //     setStartDate(ranges.selection.startDate);
    //     setEndDate(ranges.selection.endDate);

    //     // getting the startDate and endDate and push into array
    //     const datesBetween = require("dates-between");
    //     const dates = Array.from(
    //         datesBetween(ranges.selection.startDate, ranges.selection.endDate)
    //     );

    //     // getting number of nights between startDate and endDate
    //     const noOfNights = dates.length - 1;

    //     // calculation of total price based on no. of nights
    //     const pricePerNight = checkPriceType(); //sandra

    //     setTotalPrice(noOfNights * Number(pricePerNight));
    // };

    //sandra
    const checkPriceType = () => {
        return props.data.price.$numberDecimal
            ? props.data.price["$numberDecimal"].toLocaleString()
            : props.data.price.toLocaleString();
    };

    //sandra
    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    //on calendar change
    const onCalChange = (e) => {
        setFormData({
            ...formData,
            checkin_date: e.selection.startDate,
            checkout_date: e.selection.endDate,
        });
    };

    const onTotalGuestChange = (e) => {
        setFormData({
            ...formData,
            total_guests: Number(e.target.value),
        });
    };

    const onSubmit = async (evnt) => {
        evnt.preventDefault();
        console.log("formData: ", formData);
        try {
            const res = await axios.patch(
                `http://localhost:8000/api/v1/user/trip/${props.data[0]._id}`,
                {
                    checkin_date: formData.checkin_date,
                    checkout_date: formData.checkout_date,
                    total_guests: formData.total_guests,
                    total_price: formData.total_price,
                },
                { headers: headerOptions }
            );

            toast.success("Successfully edited", {
                position: toast.POSITION.TOP_CENTER,
            });
            window.location.reload();
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-center pb-3 m-0 mb-3">Edit Trip</h1>
            </div>
            <form onSubmit={onSubmit}>
                <Box mb={3}>
                    <div className="col">
                        <div>
                            <label htmlFor="total_price" className="form-label">
                                <p>
                                    Total price: ${props.data[0].total_price}{" "}
                                    SGD
                                </p>
                            </label>
                        </div>
                        <label htmlFor="total_guests" className="form-label">
                            No of Guests:
                        </label>
                        <input
                            id="total_guests"
                            name="total_guests"
                            type="number"
                            onChange={onTotalGuestChange}
                            min={1}
                            max={props.data[0].listing.accommodates}
                            value={formData.total_guests}
                        ></input>
                    </div>
                </Box>
                <Box mb={3}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={onCalChange}
                        months={2}
                        direction="horizontal"
                        inputRanges={[]}
                        staticRanges={[]}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
