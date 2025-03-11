import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/user.js";

export function registerUser(req, res) {
  const { username, pwd } = req.body;
  
  if (!username || !pwd) {
    res.status(400).send("Bad request.");
  } else {
    User.findOne({ username })
      .then(existingUser => {
        if (existingUser) {
          res.status(409).send("Username already taken.");
        } else {
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
              const newUser = new User({ username, pwd: hashedPassword });
              return newUser.save();
            })
            .then(() => tokenGenerater(username))
            .then((token) => {
              console.log(token);
              res.status(201).send({ token: token })
            });
        }
      })
      .catch(error => res.status(500).send("Error registering user: " + error.message));
  }
}

export function loginUser(req, res) {
  const { username, pwd } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      return bcrypt.compare(pwd, user.pwd)
        .then(matched => {
          if (!matched) {
            return res.status(401).send("Unauthorized");
          }

          return tokenGenerater(user.username)
            .then(token => res.status(200).send({ token: token }));
        });
    })
    .catch(error => res.status(500).send("Error logging in: " + error.message));
}


function tokenGenerater(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } 

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.log("JWT error: ", error);
      return res.status(401).end();
    }
    req.user = decoded;
    next();
  });
}