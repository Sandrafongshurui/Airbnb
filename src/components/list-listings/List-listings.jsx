import ListingCard from "../listing-card/Listing-Card";
import React, { useState, useEffect } from "react";
import noData from "../../assets/images/empty.png";
import style from "./list-listings.module.css";

function ListListings({ isHost }) {
    const [listings, setListings] = useState(null);

    // const userUrl = "http://localhost:8000/api/v1";
    // const hostUrl = "http://localhost:8000/api/v1/user/listings"
    const userUrl = "https://ourairbnb.herokuapp.com/api/v1";
    const hostUrl = "https://ourairbnb.herokuapp.com/api/v1/user/listings";

    const headerOptions = {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(isHost ? hostUrl : userUrl, {
                headers: headerOptions,
            });
            const data = await res.json();
            setListings(data);
        };
        fetchApi();
    }, []);

    const renderListings = () => {
        if (listings.length) {
            return listings.map((item) => (
                <ListingCard key={item._id} data={item} isHost={isHost} />
            ));
        }
        if (!listings.length) {
            return (
                <div className={style.showImg}>
                    <div className={style.imgHolder}>
                        <img src={noData} className={style.img} alt="..." />
                        <p className="text-center">
                            {" "}
                            You have not create any listing yet!
                        </p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={"mt-2 me-3"}>
            {listings && (
                <div className={"d-flex flex-wrap"}> {renderListings()} </div>
            )}
        </div>
    );
}

export default ListListings;
