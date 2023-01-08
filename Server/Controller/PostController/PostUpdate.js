const Posts = require("../../Models/Posts");
const { error, success } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id, postId, caption } = req.body;
    const post = await Posts.findOne({ _id: postId });
    if (!post) {
      return res.send(error(404, "Post Not Found"));
    }
    if (post.owner.ToString() !== _id) {
      return res.send(error(401, "You Cann' update this post"));
    }
    if (post.caption) {
      post.caption = caption;
      await post.save();
    }
    return res.send(success(200, ["Post Updated", post]));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};