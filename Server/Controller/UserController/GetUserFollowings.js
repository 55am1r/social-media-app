const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    return res.send(
      success(
        200,
        user.following.length > 0 ? user.following : "Not Following Anyone"
      )
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
