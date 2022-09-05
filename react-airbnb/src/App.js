import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./pages/home/home";
import HostListings from './pages/hostListings/hostListings';
import CreateListings from "./pages/createListings/createListings"
import BookingHistory from "./pages/bookingHistory/bookingHistory"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <div className="app">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateListings />} />
        <Route path="/listings" element={<HostListings />} />
        <Route path="/listings/:listingID" element={<BookingHistory />} />
      </Routes>

    </div>


  );
}

export default App;
