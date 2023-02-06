const Posts = require("../../Models/Posts");
const User = require("../../Models/User");
const cloudinary = require("cloudinary").v2;
const { success, error } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    let { caption, imageString } = req.body;
    if (!caption && !imageString) {
      return res.send(error(404, "Required Caption"));
    }
    const owner = req.body._id;
    const user = await User.findById(owner);
    if (imageString) {
      try {
        const cloudImg = await cloudinary.uploader.upload(imageString, {
          folder: "social-media-app/userposts",
        });
        imageString = {
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
      image: imageString,
    });
    user.posts.push(post._id);
    await user.save();
    return res.send(success(201, "🥳Hey, Your Status Got Posted Successfully 🎊"));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
