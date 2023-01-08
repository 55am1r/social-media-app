const Posts = require("../../Models/Posts");
const { error, success } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id, postId, caption } = req.body;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.send(error(404, "Post Not Found"));
    }
    if (post.owner.toString() !== _id) {
      return res.send(error(401, "You are not owner to update"));
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
