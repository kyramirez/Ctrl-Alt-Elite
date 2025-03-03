import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListingsPage.css";
import logo from "../../assets/logo.jfif";

const sampleListings = [
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

function ListingsPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <button className="logo-button" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
        <button className="profile-button" onClick={() => navigate("/account")}>
          <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDI%3D"
            alt="Profile"
          />
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
