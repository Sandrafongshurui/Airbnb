import { Routes, Route, Navigate } from "react-router-dom";
import React,{createContext, useState} from "react";
import "./App.css";
import Home from "./pages/home/home";
import HostListings from "./pages/hostListings/hostListings";
import CreateListings from "./pages/createListings/createListings";
import BookingHistory from "./pages/bookingHistory/bookingHistory";
import EditListing from "./pages/editListings/editListings";
import ListingBooking from "./components/listing-booking/ListingBooking";
import Trips from "./components/trips/Trips";
import SiteHeader from "./components/partials/siteHeaders/SiteHeaders"
import Auth from './components/auth/Auth';
import Protected from "./pages/protected/protected";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
    return (
        <div className="app">   
            <SiteHeader/>

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

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                
                <Route path="/protected" element={<Auth component={Protected}/>}/>   

            </Routes>
           
        </div>
    );
}

export default App;
