import { Routes, Route, Navigate } from "react-router-dom";
import React,{createContext, useState} from "react";
import "./App.css";
import Home from "./pages/home/home";
import HostListings from "./pages/hostListings/hostListings";
import CreateListings from "./pages/createListings/createListings";
import BookingHistory from "./pages/bookingHistory/bookingHistory";
<<<<<<< HEAD
import SiteHeader from "./components/partials/siteHeaders/SiteHeaders"
import Auth from './components/auth/Auth';
import Protected from "./pages/protected/protected";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

const App = () => {

=======
import EditListing from "./pages/editListings/editListings";
import ListingBooking from "./components/listing-booking/ListingBooking";
import Trips from "./components/trips/Trips";

import "bootstrap/dist/css/bootstrap.min.css";
import ListingBookingHistory from "./pages/bookingHistory/bookingHistory";

function App() {
>>>>>>> 6d3183e33cc3350c6ea751c7639ca2442e500723
    return (
        <div className="app">   
            <SiteHeader/>

            <Routes>
<<<<<<< HEAD
                {/* <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateListings />} />
                <Route path="/listings" element={<HostListings />} />
                {/* <Route
                    path="/listings/:listingID"
                    element={<BookingHistory />}
                /> */}
                 {/* <Route
                    path="/listing-details/:listingID"
                    element={<Listing />}
                />  */}
                  
                

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/protected" element={<Auth component={Protected}/>}/>   
=======
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

>>>>>>> 6d3183e33cc3350c6ea751c7639ca2442e500723
            </Routes>
           
        </div>
    );
}

export default App;
