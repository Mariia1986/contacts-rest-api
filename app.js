const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require('path')
require('dotenv').config()
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)))
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({
      status: status === 500 ? "fail" : "error",
      code: status,
      message: err.message,
    });
});

module.exports = app;
