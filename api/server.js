const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../users/auth-router.js");
const userRouter = require("../users/users-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors({ origin: "*" }));

server.use("/auth", authRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
