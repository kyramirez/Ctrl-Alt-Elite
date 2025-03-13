import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleListingPage({ addAuthHeader, creds }) {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerUsername, setOwnerUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/listings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listing");
        }
        return response.json();
      })
      .then((data) => {
        setListing(data);
        setLoading(false);

        return fetch(`http://localhost:8000/users/${data.postedBy}`);
      })
      .then((response) => response.json())
      .then((userData) => {
        setOwnerUsername(userData.username);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!listing) return <p>No listing found.</p>;

  function handleDelete() {
    fetch(`http://localhost:8000/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postedBy: creds }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete listing");
        }
        navigate("/listings");
      })
      .catch((err) => console.error("Error deleting listing:", err));
  }

  return (
    <div style={{ display: "Flex", gap: "20PX" }}>
      <div style={{ display: "Flex", flexDirection: "Column", gap: "10PX" }}>
        <button
          onClick={() => navigate(-1)}
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
        {creds === ownerUsername && (
          <button
            onClick={handleDelete}
            style={{
              padding: "10PX 20PX",
              fontSize: "16PX",
              backgroundColor: "Red",
              color: "White",
              border: "None",
              borderRadius: "5PX",
              cursor: "Pointer",
              marginBottom: "20PX",
              boxShadow: "2PX 2PX 5PX RGBA(0,0,0,0.2)",
            }}>
            Delete Posting
          </button>
        )}
      </div>
      <div style={{ color: "White" }}>Spacing</div>
      <div>
        <h1>
          <b>{listing.title}</b>
        </h1>
        <img
          src={listing.images}
          alt={listing.title}
          style={{
            margin: "10PX",
            borderRadius: "10PX",
            boxShadow: "2PX 2PX 5PX RGBA(0, 0, 0, 0.2)",
            border: "2PX Solid Black",
            maxHeight: "500PX",
            maxWidth: "500PX",
          }}
        ></img>
        <p style={{ margin: "10PX", maxWidth: "500PX" }}>
          <b>Description: </b>
          {listing.description}
        </p>
      </div>

      <div
        style={{
          display: "Flex",
          flexDirection: "Column",
          gap: "10PX",
          textAlign: "Left",
        }}
      >
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Posted: </b>
          {new Date(listing.createdAt).toLocaleString()}
        </p>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Location: </b>
          {listing.location}
        </p>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Category: </b>
          {listing.category}
        </p>
      </div>
    </div>
  );
}

export default SingleListingPage;
