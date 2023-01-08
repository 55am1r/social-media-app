const User = require("../../Models/User");
const Post = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id, user_conformation } = req.body;
    if (user_conformation === "Yes") {
      const user = await User.findOne({ _id: { $in: _id } });
      if (user.followers.length >= 1) {
        user.followers.forEach(async (e) => {
          const userFollower = await User.findOne({ _id: { $in: e } });
          const userIndex = userFollower.following.indexOf(_id);
          userFollower.following.splice(userIndex, 1);
          await userFollower.save();
        });
      }
      if (user.following.length >= 1) {
        user.following.forEach(async (e) => {
          const userFollower = await User.findOne({ _id: { $in: e } });
          const userIndex = userFollower.followers.indexOf(_id);
          userFollower.followers.splice(userIndex, 1);
          await userFollower.save();
        });
      }
      await user.remove();
      await Post.deleteMany({ owner: _id });
      res.clearCookie("JWT_REFRESH_TOKEN", {
        httpOnly: true,
        secure: true,
      });
      res.send(success(200, user));
    }
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
