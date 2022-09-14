import React, { useState, useEffect } from "react";
import SiteHeader from "../partials/siteHeaders/SiteHeaders";
import Footer from "../partials/footer/Footer";
import axios from "axios";
import style from "./Trips.module.css";
import TripsCard from "../tripsCard/TripsCard";

const Trips = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get(
                "http://localhost:8000/api/v1/user/trips"
            );
            const data = await response.data;
            setTrips(data);
            console.log(data);
        };
        fetchApi();
    }, []);

    const renderTrips = trips.map((trip) => (
        <TripsCard key={trip._id} data={trip} />
    ));

    return (
        <div className={"mt-2 me-3"}>
            <SiteHeader />
            <div className={"d-flex flex-wrap"}>{renderTrips}</div>
            <Footer />
        </div>
    );
};

export default Trips;
