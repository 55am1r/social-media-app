const { error } = require("../Utilities/StatusMessages");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(error(406, "All fields are Required"));
  } else {
    console.log("All fields are vaild");
    next();
  }
};
