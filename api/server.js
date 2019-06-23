const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors({ origin: "*" }));

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
