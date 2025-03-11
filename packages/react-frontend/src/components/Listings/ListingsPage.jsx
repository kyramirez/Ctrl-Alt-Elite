import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListingsPage.css";

function ListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/listings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        return response.json();
      })
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container">
      <header className="header">
        <button className="logoButton" onClick={() => navigate("/")}>
          <img src="https://files.oaiusercontent.com/file-P9PjxQMzdT7DTBq2Bwyoyk?se=2025-03-11T00%3A08%3A06Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D52b88db3-2250-4d71-97e8-e066924c714e.webp&sig=pl63OSF5zCRekmTWWr2EVOtuA2bAE56g4uDA58S7tDE%3D" alt="Logo" className="logo" />
        </button>
        <button className="profileButton" onClick={() => navigate("/account")}>
          <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDI%3D"
            alt="Profile"
          />
        </button>
      </header>

      <h1><b>All Listings</b></h1>
      <div className="listingsGrid">
        {listings.map((listing) => (
          <div
            key={listing._id} 
            className="listingCard"
            onClick={() => navigate(`/listings/${listing._id}`)}
            style={{ cursor: "Pointer"}}
          >
            <img src={listing.images} alt={listing.title} />
            <div className="listingTitle">{listing.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;
