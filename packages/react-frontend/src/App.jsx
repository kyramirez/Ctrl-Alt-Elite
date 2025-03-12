import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./Login";
import LandingPage from "./components/LandingPage";
import ListingsPage from "./components/Listings/ListingsPage.jsx";
import AccountPage from "./components/Account/accountPage.jsx";
import CreateListingPage from "./components/CreateListingPage";
import SingleListingPage from "./components/SingleListingPage.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState("");

  function fetchUsers() {
    const promise = fetch(`http://localhost:8000/users`, {
      headers: addAuthHeader(),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => console.error("Fetch users error: ", error));

    return promise;
  }

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
    console.log("App.jsx has received creds: ", creds);
    setCreds(creds.username);
    return fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Login failed: ${response.status}`);
        }
        console.log("App.jsx has received a response.")
        return response.json();
      })
      .then(payload => {
        setToken(payload.token);
        setMessage("Login successful; Authentication token saved");
      })
      .catch(error => setMessage(`Login Error: ${error.message}`));
  }

  function signupUser(creds) {
    const promise = fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  useEffect(() => {
    if (token !== "INVALID TOKEN") {
      console.log("Updated token:", token);
    }
  }, [token]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings/:id" element={<SingleListingPage />} />
          <Route path="/login" element={<Login handleSubmit={loginUser} token={token} />} />
          <Route path="/signup" element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />} />
          <Route path="/listings" element={<ListingsPage addAuthHeader={addAuthHeader} />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/create-listing" element={<CreateListingPage creds={creds}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
