// implement your API here
const express = require("express");
const server = express();

server.use(express.json());

const Users = require("./data/db.js");

//Get all users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Wrong!" });
    });
  res.status(200);
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("this is the body", req.body);

  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "wrong!" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port}\n`));
