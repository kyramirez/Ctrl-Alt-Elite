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
      const response = fetch(
        "https://freebiefinders-h3dtdeacb5gtc8b0.westus3-01.azurewebsites.net/listings",
        {
          method: "POST",
          headers: props.addAuthHeader({
            "Content-type": "application/json",
          }),
          body: JSON.stringify(newListing),
        },
      );

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

      <h1 classname="titleHeader">Create a New Listing</h1>

      <form onSubmit={handleSubmit}>
      <h3 className="label">Listing Title</h3>
        <input className ="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <h3 className="label">Category</h3>
        <input className="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <h3 className="label">Location</h3>
        <input classNmae="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <h3 className="label">Image Url</h3>
        <input className="image-url"
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          required
        />
        <h3 className="label">Description</h3>
        <input className="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
      </form>
      <div className="bottom-div">
      <button className="back-button" onClick={() => navigate("/account")}>
          Cancel
        </button>
        <button type="submit" onClick={() => navigate("/account")}>
          Submit Listing
        </button>
      </div>
    </div>
  );
}

export default CreateListingPage;
