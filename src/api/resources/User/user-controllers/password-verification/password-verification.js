const httpstatus = require("http-status-codes");
//
const User = require("../../user-models/user.model");
const OtpCode = require("../../user-models/code.model");
const func = require("../../functions/sendemail");
const auth = require("../../../../../config/auth");
/* Task List in User-Auth {password} 
1- Change Password 
{email address, old-password, new-password}
2- Forget-Password
{Verify Email address}
{send 6 digits code to the user email address after verifaction}
3- New password 
{set you new password}
*/
/* Functions
1- changePassword()
2- verifyemail()
3- verifyotpcode()
4- newpassword()

*/
exports.changepassword = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        success: false,
        status: "Your request is empty, please send some info.",
      });
    } else {
      console.log("Changing user password...", req.body);

      /*Start  */
      if (!req.body.email) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        return res.json({
          success: false,
          status: "Please provide email address!",
        });
      }
      if (!req.body.password) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        return res.json({ success: false, status: "Please provide password!" });
      }
      if (!req.body.newpassword) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        return res.json({
          success: false,
          status: "Please provide new password!",
        });
      }
      /*End  */

      const user = await User.findOne({
        email: req.body.email,
      });
      console.log("corredt email: ", user);
      if (user) {
        const userpwd = await User.findOne({
          email: req.body.email,
          password: req.body.password,
        });
        console.log("correct password: ", user);
        if (userpwd) {
          const body = {
            password: req.body.newpassword,
          };
          const updateUser = await User.findByIdAndUpdate(
            user._id,
            { $set: body },
            { new: true }
          );
          console.log(updateUser);
          if (updateUser) {
            func.sendEmail(req.body.email);
            console.log("User Update successfully...", updateUser);
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Password has been updated successfully!",
            });
          } else {
            res.status = 404;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: false, status: "Password not updated..." });
          }
        } else {
          res.status = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Your old Password is incorrect!",
          });
        }
      } else {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Your email is incorrect!" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
/* 
Verify Email address before setting the new password
to send the OTP 6 digit code to the user

*/
exports.verifyEmail = async (req, res) => {
  try {
    console.log("Request for new password, Verifying email address....");
    if (Object.keys(req.body).length === 0) {
      res.status = 404;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        success: false,
        status: "Please provide email address!",
      });
    } else {
      const user = await User.findOne({ email: req.body.email });
      console.log("User Email Existence: ", user);
      if (user) {
        // delete old otp code if user request for new otp code
        const otpcode = await OtpCode.findOne({ email: req.body.email });
        if (otpcode) {
          const delotpcode = await OtpCode.findByIdAndDelete(otpcode._id);
          if (delotpcode) {
            // after deleting the old otp code
            // the new code will be generated for the user
            // by sending email to the user
            const resp = func.sendEmail(req.body.email);
            setTimeout(() => {
              console.log("in response: ", resp);
            }, 5000);
            return res.status(httpstatus.ACCEPTED).json({
              success: true,
              status: "Email Verified. Enter 6 digit code!",
            });
          }
        } else {
          // If user have no old otp code generate new otp code
          const resp = func.sendEmail(req.body.email);
          setTimeout(() => {
            console.log("in response: ", resp);
          }, 5000);
          return res.status(httpstatus.ACCEPTED).json({
            success: true,
            status: "Email Verified. Enter 6 digit code!",
          });
        }
        //   }
      } else {
        console.log("Invalid Email Address");
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Invalid Email Address" });
      }
    }
  } catch (error) {
    res.status = 500;
    res.setHeader("Content-Type", "application/json");
    res.json(error);
  }
};

/* 
A router to verify th OTP CODE to setup new password
for an existing user

*/

exports.verifyOtpCode = async (req, res) => {
  console.log("Verifying otp code, to set up new password...");
  try {
    if (Object.keys(req.body).length === 0) {
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        success: false,
        status: "Please provide email address!",
      });
    } else {
      console.log("checking");
      if (!req.body.email) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Please provide email address!" });
      }
      if (!req.body.otpcode) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");

        res.json({ success: false, status: "Please provide otp code!" });
      }

      const user = await User.findOne({ email: req.body.email });
      console.log("To verifying OTP code, first check user details: ", user);
      if (user) {
        const otpcode = await OtpCode.findOne({
          email: req.body.email,
          otpcode: req.body.otpcode,
        });
        if (!otpcode) {
          res.status = 404;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Invalid code, please enter valid code!",
          });
        } else {
          res.status = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Code Verified!" });
        }
      } else {
        console.log("Invalid email address");
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Invalid email address" });
      }
    }
  } catch (error) {
    res.status = 500;
    res.setHeader("Content-Type", "application/json");
    res.json(error);
  }
};

/* 
  set new password for the user, If user enter
  the 6 digits code which were send on the user
  email address
  */
exports.newpassword = async (req, res) => {
  console.log("Request for new password, If user forget it....");
  try {
    if (Object.keys(req.body).length === 0) {
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        success: false,
        status: "Please provide email address!",
      });
    } else {
      console.log("checking");
      if (!req.body.email) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Please provide email address!" });
      }
      if (!req.body.newpassword) {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Please provide new password!" });
      }

      const user = await User.findOne({ email: req.body.email });
      console.log("For new password, user details: ", user);
      if (user) {
        const body = {
          password: req.body.newpassword,
        };
        const newpwd = await User.findByIdAndUpdate(
          user._id,
          { $set: body },
          { new: true }
        );
        if (newpwd) {
          res.status = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Password updated successfully!" });
        } else {
          res.status = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: false, status: "Internal Server Error!" });
        }
      } else {
        console.log("Invalid email address");
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Invalid email address" });
      }
    }
  } catch (error) {
    res.status = 500;
    res.setHeader("Content-Type", "application/json");
    res.json(error);
  }
};
