import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookingImg from "./bookingImg/BookingImg";
import BookingHostInfo from "./bookingHostInfo/BookingHostInfo";
import BookingForm from "./bookingForm/BookingForm";
import BookingMap from "./bookingMap/BookingMap";
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
            console.log("listing", listing)
        };
        fetchApi();
    }, []);

    return (
        <div>
            {listing && <BookingImg data={listing} />}
            {listing && <BookingForm data={listing} />}
            {listing && <BookingHostInfo data={listing} />}

            <Footer />
        </div>
    );
};

export default ListingBooking;
