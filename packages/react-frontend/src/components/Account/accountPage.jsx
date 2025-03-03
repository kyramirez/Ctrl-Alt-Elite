import React from "react";
import "./accountPage.css";

const sampleImages = [
  "https://source.unsplash.com/300x200/?electronics",
  "https://source.unsplash.com/300x200/?furniture",
  "https://source.unsplash.com/300x200/?bike",
  "https://source.unsplash.com/300x200/?shoes",
  "https://source.unsplash.com/300x200/?books",
  "https://source.unsplash.com/300x200/?watch",
];

function AccountPage() {
  return (
    <div className="account-container">
      <div className="profile-section">
        <div className="avatar"></div>
        <h2 className="profile-info">Full Name</h2>
        <p className="profile-stats">
          Number of Items Listed - Number of Items Sold
        </p>
        <p className="bio">Space for bio</p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="listingsGrid">
        {sampleImages.map((image, index) => (
          <div key={index} className="listingCard">
            <img src={image} alt={`Item ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountPage;
