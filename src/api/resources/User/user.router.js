const express = require('express');
//
const saveController = require('./user-controllers/save.controller');
const getController = require('./user-controllers/get.controller');
const authController = require('./user-controllers/authenticate.controller');
const deleteController = require('./user-controllers/delete.controller');
const updateController = require('./user-controllers/update.controller');
const passwordController = require('./user-controllers/password-verification/password-verification');
const fileController = require('./user-controllers/fileController');

//
const userRouter = express.Router();

// http://localhost:4000/api/users/signup
userRouter.post('/signup', saveController.save);

// http://localhost:4000/api/users/getuser
userRouter.get('/getuser', getController.getUser);

// http://localhost:4000/api/users/login
userRouter.post('/login', authController.authenticate);

// http://localhost:4000/api/users/email
// userRouter.use('/update', updateController);

// http://localhost:4000/api/users/email
userRouter.delete('/delete/:role/:id', deleteController.deleteSignleUser);

// http://localhost:4000/api/users/changepassword
userRouter.post('/changepassword', passwordController.changepassword);

// http://localhost:4000/api/users/verifyemail
userRouter.post('/verifyemail', passwordController.verifyEmail);

// http://localhost:4000/api/users/verifyotpcode
userRouter.post('/verifyotpcode', passwordController.verifyOtpCode);

// http://localhost:4000/api/users/newpassword
userRouter.post('/newpassword', passwordController.newpassword);

// 3.5- Update password for admin without verification\
// http://localhost:4000/api/users/verifyadmin/:admin
userRouter.post('/verifyadmin/:admin', updateController.verifyAdminDetails);

// http://localhost:4000/api/users/updateadmin/:admin
userRouter.post('/updateadmin/:admin', updateController.setNewPasswordForAdmin);

// http://localhost:4000/api/users/:id/createFileUrl
userRouter.post('/:id/createFileUrl', fileController.createFile);

// http://localhost:4000/api/users/:id/getFilesUrl
userRouter.get('/:id/getFilesUrl', fileController.getFiles);

// http://localhost:4000/api/users/:id/deleteFileUrl/:fileId
userRouter.delete('/:id/deleteFileUrl/:fileId', fileController.deleteFile);

/*  */
module.exports = userRouter;