const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const allPosts = await Posts.find({});
    return res.send(success(200, ["fetched all posts", allPosts]));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
