import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";

function App() {
  const [characters, setCharacters] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState(""); 

  function fetchUsers() {
    const promise = fetch(`http://localhost:8000/users`, {
      headers: addAuthHeader()
    });
  
    return promise;
  }

  const promise = fetch(`http://localhost:8000/users`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(characters)
  });

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function loginUser(creds) {
    const promise = fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; Authentication token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }

  function signupUser(creds) {
    const promise = fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) =>
        res.status === 200 ? res.json() : undefined
    )
    .then((json) => {
      if (json) {
        setCharacters(json["users_list"]);
      } else {
        setCharacters(null);
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  return (
    <Router>
      <div>
        <h1>Hello, Welcome to FreebieFinder!</h1>
        <Routes>
          <Route path="/login" element={<Login handleSubmit={loginUser} />} />
          <Route path="/" element={<h2>Welcome to the App</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
