import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListingImg from "./listingImg/ListingImg";
import ListingHostInfo from "./listingHostInfo/ListingHostInfo";
import ListingForm from "./listingForm/ListingForm";
import ListingMap from "./listingMap/ListingMap";
import SiteHeader from "../partials/siteHeaders/SiteHeaders";
import Footer from "../partials/footer/Footer";

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
            <SiteHeader />
            {listing && <ListingImg data={listing} />}
            {listing && <ListingForm data={listing} />}
            {listing && <ListingHostInfo data={listing} />}
            <ListingMap />
            <Footer />
        </div>
    );
};

export default Listing;
