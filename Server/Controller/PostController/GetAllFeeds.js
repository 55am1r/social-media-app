const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find({});
    return res.send(success(200, ["fetched all posts", allPosts]));
  } catch (error) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};
module.exports = { getAllPosts };
