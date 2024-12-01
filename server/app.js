const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config({
  path: "../.env",
});

const indexRouter = require("./routes/index");
const accountsRouter = require("./routes/accounts");
const transactionsRouter = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/accounts", accountsRouter);
app.use("/transactions", transactionsRouter);

module.exports = app;
