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

  // Styles
  const containerStyle = {
    background: "linear-gradient(to right, #a1c4fd, #c2e9fb)", 
    height: "100vh",
    width: "80vw", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    width: "350px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.2)", 
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
    color: "#333",
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#fff",
  };

  const buttonStyle = {
    width: "95%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={containerStyle}>
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
    </div>
  );
}

export default Login;
