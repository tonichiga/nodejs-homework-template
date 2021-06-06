const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
const limiter = require("./helpers/limiter");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

require("dotenv").config();
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)));

//  apply to all requests
app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(boolParser());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  const code = err.status || 404;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: "Not found" });
});

app.use((err, req, res, next) => {
  const code = err.status || 500;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
