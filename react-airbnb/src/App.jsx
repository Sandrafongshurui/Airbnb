import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import HostListings from "./pages/hostListings/hostListings";
import CreateListings from "./pages/createListings/createListings";
import BookingHistory from "./pages/bookingHistory/bookingHistory";
import EditListing from "./pages/editListings/editListings";
import ListingBooking from "./components/listing-booking/ListingBooking";
import Trips from "./components/trips/Trips";

import "bootstrap/dist/css/bootstrap.min.css";
import ListingBookingHistory from "./pages/bookingHistory/bookingHistory";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route 
                    path="/" 
                    element={<Home />} 
                />

                <Route 
                    path="/users/my/listings" 
                    element={<HostListings />} 
                />

                <Route 
                    path="/users/my/listings/create" 
                    element={<CreateListings />} 
                />

                <Route
                    path="/users/my/listings/:listingID"
                    element={<BookingHistory />}
                />

                <Route
                    path="/users/my/listings/:listingID/edit"
                    element={<EditListing />}
                />

                <Route
                    path="/listing-details/:listingID"
                    element={<ListingBooking />}
                />

                <Route path="/user/trips" element={<Trips />} />

            </Routes>
        </div>
    );
}

export default App;
