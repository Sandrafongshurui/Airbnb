import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap";

const EditForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);
    const [editData, setEditData] = useState(null);
    const [noOfGuests, setNoOfGuests] = useState(1);
    const params = useParams();

    // console.log("props.data: ", props.data);

    // useEffect(() => {
    //     const onEdit = async (data) => {
    //         console.log("from edit:", data);
    //         // setCatchError(null);
    //         try {
    //             const res = await axios.post(
    //                 `http://localhost:8000/api/v1/user/trip/${params._bookingId}`,
    //                 data
    //             );
    //             console.log("res.data: ", res.data);
    //             setEditData(res.data);
    //             toast.success("Successfully edited", {
    //                 position: toast.POSITION.TOP_CENTER,
    //             });
    //         } catch (error) {
    //             toast.error(error.message, {
    //                 position: toast.POSITION.TOP_CENTER,
    //             });
    //         }
    //     };
    //     onEdit();
    // }, []);

    // an variable obj to store the start and end date
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

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
        const pricePerNight = checkPriceType(); //sandra

        setTotalPrice(noOfNights * Number(pricePerNight));
    };

    //sandra
    const checkPriceType = () => {
        return props.data.price.$numberDecimal
            ? props.data.price["$numberDecimal"].toLocaleString()
            : props.data.price.toLocaleString();
    };

    //actual input names
    const defaultValues = {
        checkin_date: "",
        checkout_date: "",
        total_guests: "",
        total_price: "",
    };

    const onSubmit = async (data) => {
        console.log("From loginform:", data);
        props.data(data);
    };

    // set no of guests state upon selecting the no of guests
    const handleGuests = (e) => {
        setNoOfGuests(e.target.value);
    };

    return (
        <div>
            <div>
                <h1 className="text-center pb-3 m-0 mb-3">Edit Trip</h1>
            </div>
            <form onSubmit={onSubmit}>
                <Box mb={3}>
                    <div className="col">
                        <div className="pricing">
                            <label>
                                {/* sandra */}
                                {/* <p>${checkPriceType()} / Night</p> */}
                                <p>$100 / Night</p>
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
                    </div>
                </Box>
                <Box mb={3}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                        months={2}
                        direction="horizontal"
                        inputRanges={[]}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
