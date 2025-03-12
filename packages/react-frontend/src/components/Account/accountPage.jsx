import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

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

function AccountPage() {
  const navigate = useNavigate();
  return (
    <div className="account-container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Plus Button for Uploading Items */}
        <button className="add-item-btn" onClick={() => navigate("/create-listing")}>
        +
      </button>
        {/* Avatar and Full Name in the same row */}
        <div className="profile-header">
          <div className="avatar"></div>
          <h2 className="profile-info">Full Name</h2>
        </div>

        {/* Centered Bio & Edit Profile Button */}
        <div className="profile-actions">
          <p className="bio">Space for bio</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="listingsGrid">
        {sampleImages.map((item, index) => (
          <div key={index} className="listingCard">
            <img src={item.imageUrl} alt={item.title} />
            <h3 className="listing-title">{item.title}</h3>{" "}
            {/* Move title below image */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountPage;
