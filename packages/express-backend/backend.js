import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as services from "./services/user-service.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import listingService from "./services/listing-service.js";

dotenv.config();

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING + "freebieDB", {
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

app.post("/signup", registerUser);
app.post("/login", loginUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", authenticateUser, (req, res) => {
  const newUser = req.body;
  addUser(newUser).then((result) => res.status(201).send(result));
});

const addUser = (user) => {
  return services.default.addUser(user);
};

const findUserById = (id) => {
  return services.default.findUserById(id);
};

const delUserById = (id) => {
  return services.default.delUserById(id);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  let promise;
  promise = services.default.getUsers(name);

  promise
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Not found : ${name}");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Not found : ${id}");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  addUser(newUser)
    .then((result) => {
      if (result) {
        res.status(201).send({ ...newUser, _id: result._id });
      } else {
        res.status(400).send("Error adding user");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id; // Convert ID to number if needed
  console.log(userId);

  delUserById(userId)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("User not found : ${id}");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/listings/:id", (req, res) => {
  console.log(req.params.id);
  listingService.findListingById(req.params.id)
    .then(listing => {
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json(listing);
    })
    .catch(error => res.status(500).json({ error: "Error fetching listing" }));
});

app.get("/listings", (req, res) => {
  listingService.getListings()
    .then(listings => {
      res.json(listings);
    })
    .catch(error => {
      console.error("Failed to retrieve listings:", error);
      res.status(500).json({ message: "Failed to retrieve listings" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
