const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await Posts.find({ owner: userId });
    return res.send(success(200, posts));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
