import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateListingPage.css";




function CreateListingPage() {


  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Listing Created:", { title, imageUrl });

    // Redirect back to account page
    navigate("/account");
  };


  return (
    <div className="create-container">
      <h1>Create a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Listing Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Submit Listing</button>
      </form>
      <button className="back-button" onClick={() => navigate("/account")}>
        Cancel
      </button>
    </div>
  );
}



export default CreateListingPage;
