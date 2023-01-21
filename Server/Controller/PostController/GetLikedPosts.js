const Posts = require("../../Models/Posts");
const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    const posts = await Posts.find({ _id: { $in: currUser.likedposts } });
    return res.send(
      success(200, posts.length > 0 ? posts : "No Posts Available")
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
