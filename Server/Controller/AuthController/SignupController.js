const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.send(error(409, "User Already Exist"));
    } else {
      const user = await User.create(req.body);
      user.password = undefined;
      return res.send(success(201, user));
    }
  } catch (error) {
    console.log(error.message);
    res.send(error(500, error.message));
    process.exit(1);
  }
};