const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../users/auth-router.js");
const userRouter = require("../users/users-router.js");
const tasksRouter = require("../tasks/tasks-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use(cors({ origin: "*" }));

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/tasks", tasksRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(
    `a request was made from ${req.method} request to ${req.url} at ${time}`
  );
  next();
}

module.exports = server;
