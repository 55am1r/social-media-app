const User = require("../../Models/User");
const Posts = require("../../Models/Posts");
const { error, success } = require("../../Utilities/StatusMessages");
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;

    const currUser = await User.findOne({ _id });

    let posts = await Posts.find({
      owner: { $in: currUser.following },
    }).populate({ path: "owner", select: "_id username email avatar" });

    if (posts.length > 0) {
      posts = posts.map((item) => {
        const itemDate = item._doc.createdAt;
        item._doc.postedon =
          moment(itemDate).format("HH:mm") +
          "." +
          itemDate.getDate() +
          "-" +
          (itemDate.getMonth() + 1) +
          "-" +
          itemDate.getFullYear();
        return item;
      });
    }
    if (posts.length > 0) {
      return res.send(success(200, posts));
    }
    return res.send(
      error(
        404,
        "You Are Not Following Anyone / Your Friends Didn't Posted Anything 😕"
      )
    );
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
