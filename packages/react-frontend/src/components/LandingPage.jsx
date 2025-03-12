import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signUp");
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "100PX", color: "#fff" }}>
        <b>Hello, Welcome to FreebieFinder!</b>
      </h1>
      <p style={{ fontSize: "50PX", color: "#fff" }}>
        Discover a variety of items, all for free!
      </p>
      <button
        style={{
          borderRadius: "15PX",
          margin: "10PX",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "20PX",
          boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleSignUpClick}
      >
        <b>Sign Up</b>
      </button>
      <button
        style={{
          borderRadius: "15PX",
          margin: "10PX",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "20PX",
          boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleLoginClick}
      >
        <b>Already have an account</b>
      </button>
    </div>
  );
}

export default LandingPage;
