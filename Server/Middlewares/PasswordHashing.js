const bcrypt = require("bcrypt");
const { error } = require("../Utilities/StatusMessages");

module.exports = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    console.log("Password Hashed");
    next();
  } catch (e) {
    console.log(e.message);
    res.send(error(500, error.message));
    process.exit(1);
  }
};