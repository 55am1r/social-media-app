const User = require("../../Models/User");
const Posts = require("../../Models/Posts");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const currUser = await User.findOne({ _id });
    const posts = await Posts.find({ owner: { $in: currUser.following } });
    return res.send(success(200, posts));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};