const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    return res.send(success(200, user.followers));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
