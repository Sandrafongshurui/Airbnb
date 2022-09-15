import ListingCard from '../listing-card/Listing-Card'
import style from './list-listings.module.css'
import React, { useState, useEffect } from "react" 


function ListListings ({isHost}) {
    const [listings, setListings] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch('http://localhost:8000/api/v1')
            const data = await res.json()
            setListings(data)
        }
        fetchApi()
    }, [])

    const renderListings = listings.map((listing) => (<ListingCard key={ listing._id } data={ listing }  isHost={ isHost }/>))

    return (
        <div className={'mt-2 me-3'}>

            <div className={'d-flex flex-wrap'}>
                { renderListings }
            </div>
            
        </div>
    )
}

export default ListListings