const { error } = require("../Utilities/StatusMessages");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(error(406, "All fields are Required"));
  } else if (req.originalUrl === "/auth/sign-up") {
    const { name, phoneno } = req.body;
    if (!name || !phoneno) {
      return res.send(error(406, "All fields are Required"));
    }
  }
  console.log("All fields are vaild");
  next();
};
