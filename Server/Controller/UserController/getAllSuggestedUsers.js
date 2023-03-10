const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");
const _ = require("lodash");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    let suggestedUser = await User.find(
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
    if (suggestedUser.length > 0) {
      const randomSuggestedUser = _.sampleSize(suggestedUser, 5);
      return res.send(success(200, randomSuggestedUser));
    }
    return res.send(
      error(
        404,
        "Couldn't Found Any Suggestions - May be your are 1st visitor on our site.😍"
      )
    );
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
