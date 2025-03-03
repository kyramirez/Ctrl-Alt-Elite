import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListingsPage.css";

const sampleListings = [
  {
    title: "Smartphone",
    imageUrl: "https://source.unsplash.com/300x200/?smartphone",
  },
  { title: "Laptop", imageUrl: "https://source.unsplash.com/300x200/?laptop" },
  {
    title: "Gaming Console",
    imageUrl: "https://source.unsplash.com/300x200/?gaming",
  },
  {
    title: "Bicycle",
    imageUrl: "https://source.unsplash.com/300x200/?bicycle",
  },
  {
    title: "Sneakers",
    imageUrl: "https://source.unsplash.com/300x200/?sneakers",
  },
  {
    title: "Furniture",
    imageUrl: "https://source.unsplash.com/300x200/?furniture",
  },
];

function ListingsPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <button className="profile-button" onClick={() => navigate("/account")}>
          <img src="/assets/profile-icon.png" alt="Profile" />
        </button>
      </header>

      <h1>All Listings</h1>
      <div className="listingsGrid">
        {sampleListings.map((listing, index) => (
          <div key={index} className="listingCard">
            <img src={listing.imageUrl} alt={listing.title} />
            <div className="listingTitle">{listing.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;
