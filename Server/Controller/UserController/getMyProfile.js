const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById({ _id });
    res.send(success(200, user));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
