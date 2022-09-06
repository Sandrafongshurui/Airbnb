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
    const params = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(
                `http://localhost:8000/api/v1/listings/${params.listingID}`
            );
            const data = await res.json();
            setListing(data);
        };
        fetchApi();
    }, []);

    return (
        <div>
            {listing && <ListingImg data={listing} />}
            <ListingDesNReserve />
            <ListingCal />
            <ListingHostInfo />
            <ListingMap />
        </div>
    );
};

export default Listing;
