import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListingImg from "./listingImg/ListingImg";
import ListingDesNReserve from "./listingDesNReserve/ListingDesNReserve";
import ListingHostInfo from "./listingHostInfo/ListingHostInfo";
import ListingCal from "./listingCal/ListingCal";
import ListingMap from "./listingMap/ListingMap";

const Listing = () => {
    // const params = useParams();

    // // calling the backend API
    // const fetchApi = async () => {
    //     // MAKE API CALL TO BACKEND HERE
    //     const data = await axios.get("");
    //     return data;
    // };

    // // Backend API is called upon component mounting
    // useEffect(() => {
    //     (async () => {
    //         const data = await fetchApi();
    //     })();
    // }, []);

    return (
        <div>
            Main Listing
            <ListingImg />
            <ListingDesNReserve />
            <ListingCal />
            <ListingHostInfo />
            <ListingMap />
        </div>
    );
};

export default Listing;
