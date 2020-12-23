const statusCode = require('http-status-codes');
const passwordhash = require('password-hash');

//
const User = require("../user-models/user.model");
const OtpCode = require("../user-models/code.model");
const func = require("../functions/sendemail");
const auth = require("../../../../config/auth");
/* Task List in User-Auth 
1-SignUp (username,email,password || Mobile Number)
*/

/* 
1-SignUp (username,email,password || Mobile Number)
*/
exports.save = async(req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            console.log("Objects are missing");

            res.status(statusCode.BAD_REQUEST).json({
                success: false,
                status: `Your request body is empty ${req.body}`,
            });
        } else {
            /* 
              Conditions to verify that
              {username,email,password} are not empty
              */
            if (!req.body.username) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    status: `Please enter username`,
                });
            }
            if (!req.body.email) {

                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    status: `Please enter email`,
                });
            }
            if (!req.body.password) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    status: `Please enter password`,
                });
            }

            console.log("Saving user in database", req.body);
            const findUser = await User.findOne({ email: req.body.email });
            console.log("Email exist in database:", findUser);
            if (findUser) {
                console.log("Email exist in database:", findUser);
                res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    status: "Email already in use, try wiht another email!",
                });
            } else {
                /* converting a password to hash-password */
                var hashpassword = passwordhash.generate(req.body.password);
                console.log('Hashing a password: ', hashpassword);
                req.body.password = hashpassword;
                const user = await User.create(req.body);
                if (user) {
                    const val = func.sendEmail(req.body.email);
                    var token = auth.getToken({ _id: user._id, name: user.username, email: user.email });
                    console.log("Token: ", token);
                    // console.log(val);

                    res.status(statusCode.ACCEPTED).json({
                        success: true,
                        token: token
                    });
                } else {
                    console.log("Email exist in database:", findUser);
                    res.status(statusCode.BAD_REQUEST).json({
                        success: false,
                        status: "Server Error!",
                    });
                }
            }
        }
    } catch (error) {

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(error);
    }
};

/* *************************************** */
/* 
  set new password for the user, If user enter
  the 6 digits code which were send on the user
  email address
  */
// saveRouter.route("/verifyemail").post(async (req, res) => {
//   console.log("Verification of email address after signup using otpcode...");
//   try {
//     if (Object.keys(req.body).length === 0) {
//       res.status = 200;
//       res.setHeader("Content-Type", "application/json");
//       return res.json({ status: true, msg: "Please provide email address!" });
//     } else {
//       const user = await User.findOne({ email: req.body.email });
//       console.log("signup verification, user details: ", user);
//       if (user) {
//         const otpcode = await OtpCode.findOne({
//           email: req.body.email,
//           otpcode: req.body.otpcode,
//         });
//         if (!otpcode) {
//           res.status = 404;
//           res.setHeader("Content-Type", "application/json");
//           res.json({
//             status: true,
//             msg: "Invalid code, please enter valid code",
//           });
//         } else {
//           const removeotpcode = await OtpCode.findByIdAndRemove(otpcode._id);
//           console.log(
//             "otpcode removed after password updation: ",
//             removeotpcode
//           );
//           res.status = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json({ status: true, msg: "Email Verified Successfully!" });
//         }
//       } else {
//         console.log("Invalid email address");
//         res.status = 404;
//         res.setHeader("Content-Type", "application/json");
//         res.json({ status: false, msg: "Invalid email address" });
//       }
//     }
//   } catch (error) {
//     res.status = 500;
//     res.setHeader("Content-Type", "application/json");
//     res.json(error);
//   }
// });
/* ************************************** */
// module.exports = saveRouter;