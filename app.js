const express = require("express");
var app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const formData = require("express-form-data");

/* 
##########################
User Defined API's
########################## 
*/
// const UserRouter = require('./src/api/resources/User/user.controller');
const restRouter = require("./src/api/index");
const devConfig = require('./src/config/process');
const setGlobalMiddleWares = require("./src/api/middlewares/global-middlewares");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(formData.parse())
    // parse application/json
app.use(bodyParser.json())
    /* 
    ##########################
    DataBase connection code
    ########################## 
    */
mongoose.Promise = global.Promise;
const mongoCon = devConfig.onlinedb;
const connect = mongoose.connect(mongoCon, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
connect.then(
    (db) => {
        console.log("Connected correctly to the Server Mongodb");
    },
    (error) => {
        console.log(error);
    }
);
/* 
##########################
Serve Port Settings
########################## 
*/
const PORT = devConfig.PORT;
const HOSTNAME = "localhost";

/* 
MiddleWares
1- Monitor API request from client side
2- Convert every request from the user side to json file format
*/
setGlobalMiddleWares(app);
app.use('/api', restRouter);
/* 
Server is running and listening at 
Specified PORT
*/
app.listen(PORT, () => {
    console.log(`UserAuth is running at http://${HOSTNAME}:${PORT}`);
});