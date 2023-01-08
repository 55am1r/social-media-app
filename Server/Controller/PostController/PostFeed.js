const Posts = require("../../Models/Posts");
const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption) {
      return res.send(error(404, "Required Caption"));
    }
    const owner = req.body._id;
    const user = await User.findById(owner);
    const post = await Posts.create({
      owner,
      caption,
    });
    user.posts.push(post._id);
    await user.save();
    post.createdAt = undefined;
    post.likes = undefined;
    post.updatedAt = undefined;
    return res.send(success(201, { posts: user.posts, post }));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};