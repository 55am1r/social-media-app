const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await Posts.find({ owner: userId });
    if (posts.length > 0) {
      return res.send(success(200, posts));
    }
    return res.send(error(404, "User Not Found/No posts From the User"));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
