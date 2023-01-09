const User = require("../../Models/User");
const Posts = require("../../Models/Posts");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    const posts = await Posts.find({ owner: { $in: currUser.following } });
    if (posts.length > 0) {
      return res.send(success(200, posts));
    }
    return res.send(
      error(
        404,
        "You are Not Following Anyone/ Following Users Not Posted Anything"
      )
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
