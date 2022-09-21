import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingImg from "./bookingImg/BookingImg";
import BookingHostInfo from "./bookingHostInfo/BookingHostInfo";
import BookingForm from "./bookingForm/BookingForm";
import BookingMap from "./bookingMap/BookingMap";
import SiteHeader from "../partials/siteHeaders/SiteHeaders";
import Footer from "../partials/footer/Footer";

const ListingBooking = () => {
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
            {/* <SiteHeader /> */}
            {listing && <BookingImg data={listing} />}
            {listing && <BookingForm data={listing} />}
            {listing && <BookingHostInfo data={listing} />}
            <BookingMap />
            <Footer />
        </div>
    );
};

export default ListingBooking;
