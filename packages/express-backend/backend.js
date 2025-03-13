import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as services from "./services/user-service.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import listingService from "./services/listing-service.js";
import { User, Listing } from "./models/user.js";

dotenv.config();

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING + "freebieDB", {})
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
  listingService
    .findListingById(req.params.id)
    .then((listing) => {
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json(listing);
    })
    .catch((error) =>
      res.status(500).json({ error: "Error fetching listing" }),
    );
});

app.get("/listings", authenticateUser, (req, res) => {
  listingService
    .getListings()
    .then((listings) => {
      res.json(listings);
    })
    .catch((error) => {
      console.error("Failed to retrieve listings: ", error);
      res.status(500).json({ message: "Failed to retrieve listings" });
    });
});

app.post("/listings", (req, res) => {
  const { title, description, category, location, images, postedBy } = req.body;

  console.log("Received body:", req.body);

  User.findOne({ username: String(postedBy) })
    .then((user) => {
      if (!user) {
        console.log(`User not found: ${postedBy}`);
        return res.status(404).json({ error: "User not found" });
      }

      console.log("Found user:", user);
      const newListing = new Listing({
        title,
        description,
        category,
        location,
        images,
        postedBy: user._id,
      });

      return newListing.save();
    })
    .then((savedListing) => {
      console.log("Saved listing:", savedListing);
      res.status(201).json({
        message: "Listing created successfully",
        listing: savedListing,
      });
    })
    .catch((error) => {
      console.error("Error creating listing: ", error);
      res.status(500).json({ error: "Server error" });
    });
});

app.get("/listings/user/:username", (req, res) => {
  const { username } = req.params;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("Found user: ", user);

      return Listing.find({ postedBy: user._id });
    })
    .then((listings) => {
      if (!listings.length) {
        return res
          .status(404)
          .json({ message: "No listings found for this user" });
      }
      res.json(listings);
    })
    .catch((error) => {
      console.error("Error fetching user listings: ", error);
      res.status(500).json({ error: "Server error" });
    });
});

app.delete("/listings/:id", (req, res) => {
  const listingId = req.params.id;
  const { postedBy } = req.body;
  Listing.findById(listingId)
    .then((listing) => {
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      return User.findById(listing.postedBy).then((user) => {
        if (!user || user.username !== postedBy) {
          return res.status(403).json({ error: "Unauthorized" });
        }

        return Listing.findByIdAndDelete(listingId);
      });
    })
    .then(() => {
      res.status(200).json({ message: "Listing deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting listing:", error);
      res.status(500).json({ error: "Server error" });
    });
});


app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
