const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.send(error(404, "Required Post Id to Like"));
    }
    const userId = req.body._id;
    const post = await Posts.findOne({ _id: postId });
    if (post.likes.includes(userId)) {
      const userIdIndex = post.likes.indexOf(userId);
      post.likes.splice(userIdIndex, 1);
      await post.save();
      return res.send(success(200, "Post Disliked"));
    }
    post.likes.push(userId);
    await post.save();
    return res.send(success(200, "Post Liked"));
  } catch (error) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};