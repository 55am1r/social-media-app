const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { followUserId } = req.body;
    if (!followUserId) {
      return res.send(error(404, "Required Id to Follow"));
    }
    const currUserId = req.body._id;
    if (followUserId === currUserId) {
      return res.send(error(409, "User cann't follow to their own account"));
    }
    const currUser = await User.findOne({ _id: currUserId });
    const userToFollow = await User.findOne({ _id: followUserId });
    if (!userToFollow) {
      return res.send(error(409, "User Not Found"));
    }
    if (!userToFollow.followers.includes(currUserId)) {
      userToFollow.followers.push(currUserId);
      await userToFollow.save();
      currUser.following.push(followUserId);
      await currUser.save();
      return res.send(success(200, `Following User: ${userToFollow.email}`));
    } else {
      const follower_Id_InFollowers =
        userToFollow.followers.indexOf(currUserId);
      userToFollow.followers.splice(follower_Id_InFollowers, 1);
      await userToFollow.save();
      const following_Id_InFollowings =
        currUser.following.indexOf(userToFollow);
      currUser.following.splice(following_Id_InFollowings, 1);
      await currUser.save();
      return res.send(success(200, `Unfollowed user: ${userToFollow.email}`));
    }
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};
