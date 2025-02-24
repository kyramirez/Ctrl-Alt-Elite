// ListingsPage.jsx
import React, { useEffect, useState } from 'react';
import './ListingsPage.css'; 

function ListingsPage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/listings')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setListings(data);
            })
            .catch(error => {
                console.error('Failed to load listings:', error);
            });
    }, []);

    return (
        <div className="container">
            <h1>All Listings</h1>
            <div className="listingsGrid">
                {listings.map(listing => (
                    <div key={listing.id} className="listingCard">
                        <img src={listing.imageUrl || '/assets/default-listing.jpg'} alt={listing.title} />
                        <h3>{listing.title}</h3>
                        <p>{listing.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListingsPage;
