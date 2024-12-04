const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// require("dotenv").config({
//   path: "../.env",
// });
require('dotenv').config();

const accountsRouter = require('./routes/accounts');
const accountDetailsRouter = require('./routes/details');
const transactionsRouter = require('./routes/transactions');
const businessesRouter = require('./routes/businesses');
const pledgesRouter = require('./routes/pledges');
const subscriptionsRouter = require(`./routes/subscriptions`);
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/accounts', accountsRouter);
app.use('/details', accountDetailsRouter);
app.use('/transactions', transactionsRouter);
app.use('/businesses', businessesRouter);
app.use('/pledges', pledgesRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/auth',authRouter);

module.exports = app;
