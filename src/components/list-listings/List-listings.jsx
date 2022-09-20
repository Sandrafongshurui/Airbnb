import ListingCard from "../listing-card/Listing-Card";
import style from "./list-listings.module.css";
import Pagination from "../pagination/Pagination";
import React, { useState, useEffect } from "react";

function ListListings({ isHost }) {
    const [listings, setListings] = useState([]);

    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch("http://localhost:8000/api/v1", {
                // https://ourairbnb.herokuapp.com/api/v1
                headers: headerOptions,
            });
            const data = await res.json();
            console.log(data);
            setListings(data);
        };
        fetchApi();
    }, []);

    const renderListings = listings.map((listing) => (
        <ListingCard key={listing._id} data={listing} isHost={isHost} />
    ));

    return (
        <div className={"mt-2 me-3"}>
            <div className={"d-flex flex-wrap"}>{renderListings}</div>
            {/* <Pagination data={listings} /> */}
        </div>
    );
}

export default ListListings;
