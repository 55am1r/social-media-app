const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { error } = require("../Utilities/StatusMessages");

const passwordCheck = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        req.body = user;
        console.log("Password matched");
        next();
      } else {
        return res.send(error(401, "Password doesn't match"));
      }
    } else {
      return res.send(error(403, "User is not Signed Up"));
    }
  } catch (error) {
    console.log(error.message);
    res.send(error(500, error.message));
    process.exit(1);
  }
};

module.exports = { passwordCheck };
