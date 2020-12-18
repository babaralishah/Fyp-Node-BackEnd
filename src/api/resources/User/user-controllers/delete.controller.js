const httpstatus = require("http-status-codes");

const User = require("../user-models/user.model");

exports.deleteSignleUser = async (req, res) => {
  try {
    const role = req.params.role;
    const id = req.params.id;
    console.log(role, id);

    if (role === "admin") {
      /*  */
      const user = await User.findOne(req.params.id);
      if (user) {
        const removeUser = await User.findByIdAndRemove(req.params.id);
        if (removeUser) {
          console.log("deletion info: ", removeUser);
          return res
            .status(httpstatus.ACCEPTED)
            .json({ success: true, status: "Account deleted successfully!" });
        } else {
          console.log("error in deletion of account:");
          return res
            .status(httpstatus.NOT_ACCEPTABLE)
            .json({ success: true, status: "Account deleted successfully!" });
        }
      }
      /*  */
    } else if (role === "user") {
      /*  */
      const user = await User.findOne(req.params.id);
      if (user) {
        const removeUser = await User.findByIdAndRemove(req.params.id);
        if (removeUser) {
          console.log("deletion info: ", removeUser);
          return res
            .status(httpstatus.ACCEPTED)
            .json({ success: true, status: "Account deleted successfully!" });
        } else {
          console.log("error in deletion of account:");
          return res
            .status(httpstatus.NOT_ACCEPTABLE)
            .json({ success: true, status: "Account deleted successfully!" });
        }
      }
      /*  */
    } else {
      return res
        .status(httpstatus.BAD_REQUEST)
        .json({ success: false, status: "Invalid Route!" });
    }
  } catch (error) {
    return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
  }
};


exports.deleteAllUsers = async (req, res) => {
try {
const role = req.params.role;
if(role === 'admin') {

const users = await User.deleteMany();
console.log('deletion info: ', users);
return res.status(httpstatus.ACCEPTED).json({success: true, status: 'All users deleted!', users});
} else {
  return res.status(httpstatus.NOT_ACCEPTABLE).json({success: false, status: 'Invalid route!'});
}

} catch (error) {
  return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error);
}
};

