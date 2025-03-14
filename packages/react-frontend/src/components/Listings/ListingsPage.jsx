import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListingsPage.css";

function ListingsPage({ addAuthHeader, resetToken }) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://freebiefinders-h3dtdeacb5gtc8b0.westus3-01.azurewebsites.net/listings",
      {
        headers: addAuthHeader(),
      },
    )
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
  }, [addAuthHeader]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function handleLogout() {
    resetToken("INVALID_TOKEN");
    navigate("/");
  }

  return (
    <div className="container">
      <header className="header">
        <button
          onClick={handleLogout}
          style={{
            padding: "10PX 20PX",
            fontSize: "16PX",
            backgroundColor: "#007bff",
            color: "White",
            border: "None",
            borderRadius: "5PX",
            cursor: "Pointer",
            marginBottom: "20PX",
            boxShadow: "2PX 2PX 5PX RGBA(0,0,0,0.2)",
          }}
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/account")}
          style={{
            padding: "10PX 20PX",
            fontSize: "16PX",
            backgroundColor: "#007bff",
            color: "White",
            border: "None",
            borderRadius: "5PX",
            cursor: "Pointer",
            marginBottom: "20PX",
            boxShadow: "2PX 2PX 5PX RGBA(0,0,0,0.2)",
          }}
        >
          Account
        </button>
      </header>

      <div className="listingsGrid">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="listingCard"
            onClick={() => navigate(`/listings/${listing._id}`)}
            style={{ cursor: "Pointer" }}
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
