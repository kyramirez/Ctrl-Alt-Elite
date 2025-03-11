function SingleListingPage() {
  return (
    <div style={{ display: "Flex", gap: "20PX" }}>
      <div>
        <h1>
          <b>Work Desk</b>
        </h1>
        <img
          src="https://tinyurl.com/y2fxfudz"
          alt="Work Desk"
          style={{
            margin: "10PX",
            borderRadius: "10PX",
            boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
            border: "2PX Solid Black",
          }}
        ></img>
        <p style={{ margin: "10PX", maxWidth: "500PX" }}>
          <b>Description: </b>My name is Brady. Looking to sell a one-year-old
          desk that has minimal scratches. Perfect for remote work or studying.
          Contact me if you are interested.
        </p>
      </div>

      <div style={{ display: "Flex", flexDirection: "Column", gap: "10PX" }}>
        <button
          style={{
            maxHeight: "100PX",
            minWidth: "100PX",
            margin: "10PX",
            backgroundColor: "Grey",
            boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
            borderRadius: "10PX",
          }}
        >
          Favorite
        </button>
        <button
          style={{
            maxHeight: "100PX",
            minWidth: "100PX",
            margin: "10PX",
            backgroundColor: "Grey",
            boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
            borderRadius: "10PX",
          }}
        >
          Share
        </button>
        <button
          style={{
            maxHeight: "100PX",
            minWidth: "100PX",
            margin: "10PX",
            backgroundColor: "Grey",
            boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
            borderRadius: "10PX",
          }}
        >
          Flag
        </button>
      </div>

      <div
        style={{
          display: "Flex",
          flexDirection: "Column",
          gap: "10PX",
          textAlign: "Left",
        }}
      >
        <img
          src="https://tinyurl.com/y4kj9y3m"
          alt="Google Map"
          style={{
            margin: "10PX",
            borderRadius: "10PX",
            boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
            border: "2PX Solid Black",
            maxHeight: "400PX",
            maxWidth: "400PX",
          }}
        ></img>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Posted: </b>13 Minutes Ago
        </p>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Condition: </b>Excellent
        </p>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Make/Manufacturer: </b>KKL
        </p>
        <p style={{ margin: "10PX", fontSize: "20PX" }}>
          <b>Size/Dimensions: </b>98.00 x 38.70 x 66.10 Centimeters
        </p>
      </div>
    </div>
  );
}

export default SingleListingPage;
