import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import HostListings from "./pages/hostListings/hostListings";
import CreateListings from "./pages/createListings/createListings";
import BookingHistory from "./pages/bookingHistory/bookingHistory";
import Listing from "./components/listing/Listing";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/user/listing/create" element={<CreateListings />} />
                <Route path="/user/listing" element={<HostListings />} />
                <Route
                    path="/users/listings/:listingID"
                    element={<BookingHistory />}
                />

                <Route
                    path="/listing-details/:listingID"
                    element={<Listing />}
                />
            </Routes>
        </div>
    );

}

export default App;
