const Posts = require("../../Models/Posts");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const post = await Posts.find({ owner: _id });
    return res.send(success(200, ["Here are your Posts ", { Posts: post }]));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};
