import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "80px", color: "#fff", marginBottom: "20px" }}>
        <b>Hello, Welcome to FreebieFinder!</b>
      </h1>
      <p style={{ fontSize: "30px", color: "#fff", marginBottom: "30px" }}>
        Discover a variety of items, all for free!
      </p>
      <button
        style={{
          borderRadius: "10px",
          margin: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "18px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          padding: "12px 24px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={handleSignUpClick}
      >
        Sign Up
      </button>
      <button
        style={{
          borderRadius: "10px",
          margin: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "18px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          padding: "12px 24px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={handleLoginClick}
      >
        Already have an account
      </button>
    </div>
  );
}

export default LandingPage;
