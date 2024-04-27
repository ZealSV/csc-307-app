import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

/*const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const generateUserId = () => {
  return Math.random().toString(36).substr(2, 9);
};*/

app.use(cors());

app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .deleteUser(id)
    .then((result) => {
      if (result) {
        res.send("User deleted successfully.");
      } else {
        res.status(404).send("User not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while deleting the user.");
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
