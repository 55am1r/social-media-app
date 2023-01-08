const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    return res.send(success(200, user.following));
  } catch (error) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};
