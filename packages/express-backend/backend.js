// backend.js
import express from "express";
import cors from "cors";
import * as services from "./services/user-service.js";
import dotenv from "dotenv";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import mongoose from "mongoose";
import listingsRouter from './routes/listings.js';

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING + "freebieDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", registerUser);
app.post("/login", loginUser);
// for all listings
app.post('/listings', listingsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd).then((result) => res.status(201).send(result));
});

const port = 8000;

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
  const id = req.params["id"]; // or req.params.id
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

app.use(cors());
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((result) => {
      if (result) {
        res.status(201).send({ ...userToAdd, _id: result._id });
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

app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});
