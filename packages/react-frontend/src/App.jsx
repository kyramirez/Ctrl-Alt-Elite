import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./Login.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ListingsPage from "./components/Listings/ListingsPage.jsx";
import AccountPage from "./components/Account/accountPage.jsx";
import CreateListingPage from "./components/CreateListingPage.jsx";
import SingleListingPage from "./components/SingleListingPage.jsx";

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState("");

  function fetchUsers() {
    const promise = fetch(
      `https://freebiefinders-h3dtdeacb5gtc8b0.westus3-01.azurewebsites.net/users`,
      {
        headers: addAuthHeader(),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error("Fetch users error: ", error));

    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function loginUser(creds) {
    console.log("App.jsx has received creds: ", creds);
    setCreds(creds.username);
    return fetch(
      `https://freebiefinders-h3dtdeacb5gtc8b0.westus3-01.azurewebsites.net/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(creds),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Login failed: ${response.status}`);
        }
        console.log("App.jsx has received a response.");
        return response.json();
      })
      .then((payload) => {
        setToken(payload.token);
        setMessage("Login successful; Authentication token saved");
      })
      .catch((error) => setMessage(`Login Error: ${error.message}`));
  }

  function signupUser(creds) {
    setCreds(creds.username);
    const promise = fetch(
      `https://freebiefinders-h3dtdeacb5gtc8b0.westus3-01.azurewebsites.net/signup`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(creds),
      },
    )
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
    if (token !== INVALID_TOKEN) {
      console.log("Updated token:", token);
    }
  }, [token]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage token={token} />} />
          <Route
            path="/listings/:id"
            element={
              <SingleListingPage addAuthHeader={addAuthHeader} creds={creds} />
            }
          />
          <Route
            path="/login"
            element={<Login handleSubmit={loginUser} token={token} />}
          />
          <Route
            path="/signup"
            element={
              <Login
                handleSubmit={signupUser}
                buttonLabel="Sign Up"
                token={token}
              />
            }
          />
          <Route
            path="/listings"
            element={
              <ListingsPage
                addAuthHeader={addAuthHeader}
                resetToken={setToken}
              />
            }
          />
          <Route
            path="/account"
            element={
              <AccountPage
                creds={creds}
                addAuthHeader={addAuthHeader}
                token={token}
              />
            }
          />
          <Route
            path="/create-listing"
            element={
              <CreateListingPage addAuthHeader={addAuthHeader} creds={creds} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
