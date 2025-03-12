import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  }

  function submitForm() {
    if (!creds.username || !creds.pwd) {
      alert("Please fill in both username and password.");
      return;
    }
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
    navigate("/listings");
  }
  

  const formStyle = {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const formGroupStyle = {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333", // Ensuring label text is visible
  };

  const inputStyle = {
    width: "80%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color: "#000", // Setting text color to black
    backgroundColor: "#fff", // Ensuring background contrast
  };

  const buttonStyle = {
    width: "85%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  };

  return (
    <form style={formStyle}>
      <div style={formGroupStyle}>
        <label htmlFor="username" style={labelStyle}>
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <input
          type="password"
          name="pwd"
          id="password"
          value={creds.pwd}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
        style={buttonStyle}
      />
    </form>
  );
}

export default Login;
