import React from "react"
import ListingCard from '../listing-card/Listing-Card'
import listings from "../../../src/listings.json"
import style from './list-listings.module.css'

function ListListings () {
    const renderListings = () => {
        return listings.slice(0, 10).map(listing => {
            return (
                <div className={'mt-2 me-3'}>
                    <ListingCard listing={listing}/>
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