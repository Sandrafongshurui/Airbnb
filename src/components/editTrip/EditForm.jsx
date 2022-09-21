import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap";
import "./EditForm.css";

const EditForm = (props) => {
    const datesBetween = require("dates-between");

    // setting a constant to the date props to convert the date format
    const isoStrCheckIn = props.data[0].checkin_date;
    const isoStrCheckOut = props.data[0].checkout_date;

    // setting the state of the form data
    const [formData, setFormData] = useState({
        checkin_date: new Date(isoStrCheckIn),
        checkout_date: new Date(isoStrCheckOut),
        total_guests: props.data[0].total_guests,
        total_price: props.data[0].total_price,
    });

    // an variable obj to store the checkin date and checkout date
    const selectionRange = {
        startDate: formData.checkin_date,
        endDate: formData.checkout_date,
        key: "selection",
    };

    //sandra
    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    // on calendar change
    const onCalChange = (e) => {
        const dates = Array.from(
            datesBetween(e.selection.startDate, e.selection.endDate)
        );

        // getting number of nights between startDate and endDate
        let noOfNights = dates.length - 1;
        let pricePerNight = checkPriceType();

        setFormData({
            ...formData,
            checkin_date: e.selection.startDate,
            checkout_date: e.selection.endDate,
            total_price: noOfNights * Number(pricePerNight),
        });
    };

    // on total guest change
    const onTotalGuestChange = (e) => {
        setFormData({
            ...formData,
            total_guests: Number(e.target.value),
        });
    };

    //sandra
    const checkPriceType = () => {
        return props.data[0].listing.price.$numberDecimal
            ? props.data[0].listing.price["$numberDecimal"]
            : props.data[0].listing.price;
    };

    const onSubmit = async (evnt) => {
        evnt.preventDefault();

        try {
            const res = await axios.patch(
                `https://ourairbnb.herokuapp.com/api/v1/user/trip/${props.data[0]._id}`,
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
                <h3 className="text-center pb-3 m-0 mb-3">Edit Trip</h3>
            </div>
            <form onSubmit={onSubmit}>
                <Box mb={3}>
                    <div className="col">
                        <div>
                            <label htmlFor="total_price" className="form-label">
                                <p>
                                    Total price:{" "}
                                    <strong>${formData.total_price} SGD</strong>
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
                    Select your Dates:
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
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            color: "white",
                            backgroundColor: "#FD5B61",
                            fontWeight: "600",
                            "&:hover": {
                                backgroundColor: "#FD5B61",
                            },
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default EditForm;
