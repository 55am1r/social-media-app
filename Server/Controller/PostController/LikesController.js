const Posts = require("../../Models/Posts");
const Users = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.body._id;
    const user = await Users.findOne({ _id: userId });
    const post = await Posts.findOne({ _id: postId }).populate({
      path: "owner",
      select: "_id username email avatar",
    });
    if (post.likes.includes(userId)) {
      const userIdIndex = post.likes.indexOf(userId);
      post.likes.splice(userIdIndex, 1);
      await post.save();
      const postIndex = user.likedposts.indexOf(postId);
      user.likedposts.splice(postIndex, 1);
      await user.save();
      return res.send(success(200, { post, postmessage: "Disliked" }));
    }
    post.likes.push(userId);
    await post.save();
    user.likedposts.push(postId);
    await user.save();
    return res.send(success(200, { post, postmessage: "Liked" }));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e));
  }
};
