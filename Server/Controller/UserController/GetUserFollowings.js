const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.find({ _id });
    const followings = await User.find({ _id: { $in: currUser.following } });
    return res.send(
      success(
        200,
        followings.length > 0
          ? followings
          : "Not Following Anyone - Find Your Friends to Follow"
      )
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
