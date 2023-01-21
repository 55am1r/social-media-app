const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    const followers = await User.find({ _id: { $in: currUser.followers } });
    console.log(followers.length);
    return res.send(
      success(
        200,
        followers.length > 0 ? followers : "No Followers Found - Add Friends"
      )
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
