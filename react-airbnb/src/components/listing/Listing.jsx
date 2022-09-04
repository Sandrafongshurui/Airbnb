import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Listing = () => {
    const params = useParams();

    // calling the backend API
    const fetchApi = async () => {
        // MAKE API CALL TO BACKEND HERE
        const data = await axios.get("");
        return data;
    };

    // Backend API is called upon component mounting
    useEffect(() => {
        (async () => {
            const data = await fetchApi();
        })();
    }, []);

    return <div>Listing</div>;
};

export default Listing;
