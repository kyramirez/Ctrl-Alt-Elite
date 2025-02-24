// ListingsPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './ListingsPage.module.css';

function ListingsPage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/listings')
            .then(response => response.json())
            .then(data => setListings(data))
            .catch(error => console.error('Failed to load listings:', error));
    }, []);

    return (
        <div className={styles.container}>
            <h1>All Listings</h1>
            <div className={styles.listingsGrid}>
                {listings.map(listing => (
                    <div key={listing.id} className={styles.listingCard}>
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
