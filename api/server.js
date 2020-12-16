const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");

const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/user-router");
const authRouter = require("./auth/auth-router");

const server = express();

const config = {
  name: "sessionId",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new KnexSessionStore({
    knex: require("../data/connection.js"),
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(session(config));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
