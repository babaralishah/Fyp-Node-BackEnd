const express = require('express');
const userRouter = require('./resources/User/user.router');
//
const restRouter = express.Router();
/* 
Resources of API 
*/
restRouter.use('/users', userRouter);


module.exports = restRouter;