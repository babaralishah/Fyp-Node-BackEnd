const httpstatus = require("http-status-codes");
//
const User = require("../user-models/user.model");
// 3.5- Update password for admin without verification
/* 
function: Verfication of admin of the system
*/
exports.verifyAdminDetails = async (req, res) => {
  try {
    if (req.params.admin === "admin") {
      const admin = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (admin) {
        return res
          .status(httpstatus.BAD_REQUEST)
          .json({ success: true, status: "Verified Successful!" });
      } else {
        return res
          .status(httpstatus.BAD_REQUEST)
          .json({ success: false, status: "Invalid Email or Password!" });
      }
    } else {
      return res
        .status(httpstatus.BAD_REQUEST)
        .json({ success: false, status: "Invalid Route!" });
    }
  } catch (error) {
    return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
  }
};

exports.setNewPasswordForAdmin = async (req, res) => {
    try {
      if (req.params.admin === "admin") {
        const admin = await User.findOne({
          email: req.body.email
        });
        if (admin) {
            const body = {
                password: req.body.newpassword
            };
            const updateAdmin = await User.findByIdAndUpdate(admin._id, {$set: body}, {new:true});
            if(updateAdmin){
                return res
                .status(httpstatus.ACCEPTED)
                .json({ success: true, status: "Password Updated Successful!" });
            } else {
                return res
                .status(httpstatus.NOT_ACCEPTABLE)
                .json({ success: true, status: "Password not updated!" });
            }

        } else {
          return res
            .status(httpstatus.BAD_REQUEST)
            .json({ success: false, status: "Invalid Email or Password!" });
        }
      } else {
        return res
          .status(httpstatus.BAD_REQUEST)
          .json({ success: false, status: "Invalid Route!" });
      }
    } catch (error) {
      return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };
