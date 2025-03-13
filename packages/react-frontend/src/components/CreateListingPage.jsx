import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateListingPage.css";

function CreateListingPage(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.creds !== "") {
      setPostedBy(props.creds);
    }
  }, [props.creds]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newListing = {
      title,
      description,
      category,
      location,
      images,
      postedBy,
    };

    try {
      console.log("Sending data: ", newListing);
      const response = fetch("http://localhost:8000/listings", {
        method: "POST",
        headers: props.addAuthHeader({
          "Content-type": "application/json",
        }),
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error(`Failed to create listing: ${(await response).status}`);
      }

      const data = await response.json();
      console.log("New listing created: ", data);
      navigate("/account");
    } catch (err) {
      console.error("Error: ", err);
      setError(err.message);
    }
  };

  return (
    <div className="create-container">
      <h1>Create a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Listing title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit" onClick={() => navigate("/account")}>
          Submit Listing
        </button>
      </form>
      <button className="back-button" onClick={() => navigate("/account")}>
        Cancel
      </button>
    </div>
  );
}

export default CreateListingPage;
