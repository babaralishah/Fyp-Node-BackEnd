const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
//
const setGlobalMiddleWares = app => {
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ extended: false }));
app.use(passport.initialize());
};
module.exports = setGlobalMiddleWares;