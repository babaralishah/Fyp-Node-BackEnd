const User = require("../user-models/user.model");
const auth = require('../../../../config/auth');

/*  
  1- An admin can get the information of all the users of the system
  2- A user can get his information by using (token, _id or email)
*/

exports.getUser =  async (req, res) => {
    try {
      const users = await User.find();
      if (users.length > 0) {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({success: true, status: 'Users record found!' ,users});
      } else {
        res.status = 404;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "No user exist" });
      }
    } catch (error) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json(error);
    }
  };
