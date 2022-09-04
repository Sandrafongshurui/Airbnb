import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import Listing from "./components/listing/Listing";

function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="/listings/:listingId" element={<Listing />} />
            </Routes>
        </div>
    );
}

export default App;
