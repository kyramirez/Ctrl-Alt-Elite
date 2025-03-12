import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

function AccountPage(props) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!props.creds) return;

    fetch(`http://localhost:8000/listings/user/${props.creds}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch user listings");
        }
        return response.json();
      })
      .then(data => {
        console.log("User Listings: ", data);
        setListings(data);
      })
      .catch(error => {
        console.error("Error fetching listings: ", error);
        setError(error.message);
      });

  }, [props.creds]);

  console.log("Account page received creds: ", props.creds);

  return (
    <div className="account-container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Plus Button for Uploading Items */}
        <button className="add-item-btn" onClick={() => navigate("/create-listing")}>
        +
        </button>
        <button 
            onClick={() => navigate("/listings")}
            style={{
                padding: "10PX 20PX",
                fontSize: "16PX",
                backgroundColor: "#007bff",
                color: "White",
                border: "None",
                borderRadius: "5PX",
                cursor: "Pointer",
                marginBottom: "20PX",
                boxShadow: "2PX 2PX 5PX RGBA(0,0,0,0.2)"
              }}
        >
            ← Back
        </button>
        {/* Avatar and Full Name in the same row */}
        <div className="profile-header">
          <h2 className="profile-info">Username: {props.creds}</h2>
        </div>

        {/* Centered Bio & Edit Profile Button */}
        <div className="profile-actions">
        </div>
      </div>

      {/* Listings Grid */}
      <div className="listingsGrid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="listingCard" onClick={() => navigate(`/listings/${listing._id}`)}>
              <img src={listing.images[0] || "default-image-url.jpg"} alt={listing.title} />
              <h3 className="listing-title">{listing.title}</h3>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
