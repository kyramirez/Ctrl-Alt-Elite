import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.post("/signup", registerUser);
app.post("/login", loginUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

const port = 8000;
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});