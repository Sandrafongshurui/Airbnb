import ListingCard from '../listing-card/Listing-Card'
import style from './list-listings.module.css'
import React, { useState, useEffect } from "react" 
import axios from "axios"

function ListListings ({isHost}) {
    const [listings, setListings] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch('http://localhost:8000/api/v1')
            const data = await res.json()
            setListings(data)
            console.log(data)
        }
        fetchApi()
    }, [])

    const renderListings = () => {
        return listings.slice(0, 15).map(listing => {
            return (
                <div className={'mt-2 me-3'}>
                     <ListingCard isHost={ isHost } data = { listing }/>
                </div>
            )
        })
    }

    return (
        
        <div className={'d-flex flex-wrap'}>
            {renderListings()}
        </div>
    )
}

export default ListListings