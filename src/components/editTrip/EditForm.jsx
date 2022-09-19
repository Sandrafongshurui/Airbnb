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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);
    const [editData, setEditData] = useState(null);
    // const [noOfGuests, setNoOfGuests] = useState(1);
    const params = useParams();

    // TODO: convert date format here
    const [formData, setFormData] = useState({
        checkin_date: DateTime.now(props.data[0].checkin_date).toJSDate(),
        checkout_date: props.data[0].checkout_date,
        total_guests: props.data[0].total_guests,
        total_price: props.data[0].total_price,
    });

    console.log("formData: ", formData);

    console.log("props.data[0]: ", props.data[0]);

    // an variable obj to store the start and end date
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onEdit = async (data) => {
        // setCatchError(null);
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/user/trip/${props.data[0]._id}`,
                data
            );
            console.log("res.data: ", res.data);
            setEditData(res.data);
            toast.success("Successfully edited", {
                position: toast.POSITION.TOP_CENTER,
            });
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
            <form onSubmit={onEdit}>
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
                            onChange={handleInputChange}
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
                        // onChange={handleInputChange}
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
