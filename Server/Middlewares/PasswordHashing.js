const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    console.log("Password Hashed");
    next();
  } catch (error) {
    console.log(error.message);
    res.send(error(500, error.message));
    process.exit(1);
  }
};

module.exports = { hashPassword };
