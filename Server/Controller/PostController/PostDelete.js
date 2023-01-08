const Posts = require("../../Models/Posts");
const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id, postId } = req.body;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.send(error(404, "Post Not Found"));
    }
    if (post.owner.toString() !== _id) {
      return res.send(error(401, "You are not owner to Delete"));
    }
    const user = await User.findById(_id);
    const postIndex = user.posts.indexOf(postId);
    user.posts.splice(postIndex, 1);
    await user.save();
    await post.remove();
    return res.send(success(200, "Post Deleted Successfully"));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
