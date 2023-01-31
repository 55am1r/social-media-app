const Posts = require("../../Models/Posts");
const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { caption, image } = req.body;
    if (!caption && !image) {
      return res.send(error(404, "Required Caption"));
    }
    const owner = req.body._id;
    const user = await User.findById(owner);
    if (image) {
      try {
        const cloudImg = await cloudinary.uploader.upload(image, {
          folder: "social-media-app/userposts",
        });
        image = {
          publicId: cloudImg.public_id,
          url: cloudImg.secure_url,
        };
        console.log("IMAGE UPLOADED");
      } catch (e) {
        console.log(e.message);
        res.send(error(500, e.message));
      }
    }
    const post = await Posts.create({
      owner,
      caption,
    });
    user.posts.push(post._id);
    await user.save();
    post.createdAt = undefined;
    post.likes = undefined;
    post.updatedAt = undefined;
    return res.send(success(201, { posts: user.posts, post }));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
