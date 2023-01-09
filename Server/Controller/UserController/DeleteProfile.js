const User = require("../../Models/User");
const Post = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res, next) => {
  try {
    const { _id, user_conformation } = req.body;
    if (user_conformation === "Yes") {
      const user = await User.findOne({ _id: { $in: _id } });
      //TO REMOVE FROM FOLLOWERS
      if (user.followers.length >= 1) {
        user.followers.forEach(async (follower_id) => {
          const userFollower = await User.findOne({
            _id: { $in: follower_id },
          });
          const userIndex = userFollower.following.indexOf(_id);
          userFollower.following.splice(userIndex, 1);
          await userFollower.save();
        });
      }
      //TO REMOVE FROM FOLLOWING USERS
      if (user.following.length >= 1) {
        user.following.forEach(async (following_id) => {
          const userFollower = await User.findOne({
            _id: { $in: following_id },
          });
          const userIndex = userFollower.followers.indexOf(_id);
          userFollower.followers.splice(userIndex, 1);
          await userFollower.save();
        });
      }
      //TO REMOVE FROM THE POSTS USER LIKED
      const allPosts = await Post.find({});
      allPosts.forEach(async (post) => {
        const index = post.likes.indexOf(_id);
        if (index > 0) {
          post.likes.splice(index, 1);
          await post.save();
        }
      });

      //REMOVING USER
      await user.remove();

      //DELETING USER POSTS
      await Post.deleteMany({ owner: _id });

      return next();
    }
    return res.send(error(409, `User Response ${user_conformation}`));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
