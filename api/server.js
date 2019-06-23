const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors({ origin: "*" }));

server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
