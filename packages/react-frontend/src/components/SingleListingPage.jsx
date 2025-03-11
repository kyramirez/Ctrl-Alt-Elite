import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function SingleListingPage() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/listings/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch listing");
                }
                return response.json();
            })
            .then(data => {
                setListing(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!listing) return <p>No listing found.</p>;

    return (
        <div style={{ display: "Flex", gap: "20PX" }}>
            <div>
                <h1><b>{listing.title}</b></h1>
                <img 
                    src={listing.images} 
                    alt={listing.title}
                    style={{ margin: "10PX", borderRadius: "10PX", boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)", border: "2PX Solid Black", maxHeight: "500PX", maxWidth: "500PX" }}>
                </img>
                <p style={{ margin: "10PX", maxWidth: "500PX" }}>
                    <b>Description: </b>{listing.description}
                </p>
            </div>

            <div style={{ display: "Flex", flexDirection: "Column", gap: "10PX" }}>
                <button style={{ maxHeight: "100PX", minWidth: "100PX", margin: "10PX", backgroundColor: "Grey", boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
                    Favorite
                </button>
                <button style={{ maxHeight: "100PX", minWidth: "100PX", margin: "10PX", backgroundColor: "Grey", boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
                    Share
                </button>
                <button style={{ maxHeight: "100PX", minWidth: "100PX", margin: "10PX", backgroundColor: "Grey", boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)", borderRadius: "10PX" }}>
                    Flag
                </button>
            </div>

            <div style={{ display: "Flex", flexDirection: "Column", gap: "10PX", textAlign: "Left" }}>
                <p style={{ margin: "10PX", fontSize: "20PX" }}><b>Posted: </b>{new Date(listing.createdAt).toLocaleString()}</p>
                <p style={{ margin: "10PX", fontSize: "20PX" }}><b>Location: </b>{listing.location}</p>
                <p style={{ margin: "10PX", fontSize: "20PX" }}><b>Category: </b>{listing.category}</p>
            </div>
        </div>
    );
}


export default SingleListingPage;