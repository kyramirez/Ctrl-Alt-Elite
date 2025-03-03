import React from "react";
import "./AccountPage.css";

function AccountPage() {
  return (
    <div className="account-container">
      <h1>Owner's Account</h1>
      <div className="profile-section">
        <div className="avatar"></div>
        <h2>Full Name</h2>
        <p>Number of Items Listed - Number of Items Sold</p>
        <p>Space for Bio</p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
      <div className="listingsGrid">
        <h2>Your Listings</h2>
        {/* Placeholder for the user's listings */}
        <div className="listingCard">Item 1</div>
        <div className="listingCard">Item 2</div>
        <div className="listingCard">Item 3</div>
      </div>
    </div>
  );
}

export default AccountPage;