// implement your API here
const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

const Users = require("./data/db.js");

//Get all users
server.get("/api/users", (req, res) => {
  Users.find(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
  res.status(200);
});

// add new user
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("this is the body", req.body);

  if (!userInfo.name || !userInfo.bio) {
    res.status(404).json({ message: "Please provide name and bio for user" });
  } else {
    Users.insert(userInfo)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

//find user object with specified id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

//Deletes the user by id and returns deleted user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = req.body;

  Users.remove(id)
    .then(removed => {
      if (!removed) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist"
        });
      } else {
        res.status(200).json(removed);
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "not good" });
    });
});

//Updates the user by id and returns the modified document
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  Users.update(id, updatedUser)
    .then(user => {
      if (!user.name || !user.bio) {
        res
          .status(404)
          .json({ message: "Please provide name and bio for user" });
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "not good" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port}\n`));
