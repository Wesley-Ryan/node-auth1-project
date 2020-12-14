const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));

server.get("/", (_, res) => {
  res.send.json("Up and running....");
});

module.exports = server;
