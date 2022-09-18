import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";
import { DateRangePicker } from "react-date-range";

const LoginForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);

    console.log("props.data: ", props.data);

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

    // form validation rules
    const validationSchema = yup.object().shape({
        email: yup.string().email("Valid email is required").required(),
    });

    //actual input names
    const defaultValues = {
        email: "",
    };
    const {
        control,
        handleSubmit,
        // formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

    const onSubmit = async (data) => {
        console.log("From loginform:", data);
        props.data(data);
    };

    return (
        <div>
            <div>
                <h1 className="text-center pb-3 m-0 mb-3">Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                    <Controller
                        name="email" //actual input
                        control={control} //take place of the register RHF
                        render={({
                            //takes a function and rturn a react element
                            field,
                            fieldState: { error }, //this error will be displyed takes over form state errors
                        }) => (
                            <TextField
                                label={"email"} //label in the box
                                variant="outlined"
                                fullWidth
                                autoComplete="email"
                                autoFocus
                                error={!!error} //convert obj into a bool
                                helperText={error ? error.message : null}
                                {...field}
                            />
                        )}
                    />
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

export default LoginForm;
