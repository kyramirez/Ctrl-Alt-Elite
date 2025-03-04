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
    <>
      <h1 style={{ fontSize: "100PX" }}>
        <b>Hello, Welcome to FreebieFinder!</b>
      </h1>
      <p style={{ fontSize: "50PX" }}>
        Discover a variety of items, all for free!
      </p>
      <button
        style={{
          borderRadius: "15PX",
          margin: "10PX",
          backgroundColor: "Blue",
          fontSize: "20PX",
          boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
        }}
        onClick={handleSignUpClick}
      >
        <b>Sign Up</b>
      </button>
      <button
        style={{
          borderRadius: "15PX",
          margin: "10PX",
          backgroundColor: "Blue",
          fontSize: "20PX",
          boxShadow: "4PX 4PX 10PX RGBA(0, 0, 0, 0.2)",
        }}
        onClick={handleLoginClick}
      >
        <b>Already have an account</b>
      </button>
    </>
  );
}

export default LandingPage;
