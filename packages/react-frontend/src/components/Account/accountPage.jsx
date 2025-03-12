import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accountPage.css";

const sampleImages = [
  {
    title: "Smartphone",
    imageUrl:
      "https://images.unsplash.com/photo-1634403665481-74948d815f03?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Laptop",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fHwy",
  },
  {
    title: "Gaming Console",
    imageUrl:
      "https://images.unsplash.com/photo-1588689115724-a624efec3c93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZSUyMGNvbnNvbGV8ZW58MHx8MHx8fDI%3D",
  },
  {
    title: "Bicycle",
    imageUrl:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlrZXxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    title: "Sneakers",
    imageUrl:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c25lYWtlcnxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    title: "Furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHwy",
  },
];

function AccountPage(props) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!props.creds) return;

    fetch(`http://localhost:8000/listings/user/${props.creds}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user listings");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User Listings: ", data);
        setListings(data);
      })
      .catch((error) => {
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
        <button
          className="add-item-btn"
          onClick={() => navigate("/create-listing")}
        >
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
            boxShadow: "2PX 2PX 5PX RGBA(0,0,0,0.2)",
          }}
        >
          ← Back
        </button>
        {/* Avatar and Full Name in the same row */}
        <div className="profile-header">
          <h2 className="profile-info">Username: {props.creds}</h2>
        </div>

        {/* Centered Bio & Edit Profile Button */}
        <div className="profile-actions"></div>
      </div>

      {/* Listings Grid */}
      <div className="listingsGrid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="listingCard"
              onClick={() => navigate(`/listings/${listing._id}`)}
            >
              <img
                src={listing.images[0] || "default-image-url.jpg"}
                alt={listing.title}
              />
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
