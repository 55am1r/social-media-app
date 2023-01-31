const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");
const _ = require("lodash");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    const suggestedUser = await User.find(
      {
        _id: { $nin: currUser.following, $ne: _id },
      },
      {
        lastlogin: 0,
        phoneno: 0,
        createdAt: 0,
        updatedAt: 0,
        following: 0,
        posts: 0,
        likedposts: 0,
      }
    );
    const randomSuggestedUser = _.sampleSize(suggestedUser, 5);
    return res.send(success(200, randomSuggestedUser));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
