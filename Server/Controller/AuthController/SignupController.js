const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");
const cloudinary = require("cloudinary").v2;
module.exports = async (req, res) => {
  try {
    const { email, username } = req.body;
    const existUserByEmail = await User.findOne({ email });
    const existUserByUserName = await User.findOne({ username });
    if (existUserByEmail) {
      return res.send(error(409, "User Already Exists With Email"));
    } else if (existUserByUserName) {
      return res.send(error(409, "User Already Exists With Username"));
    } else {
      if (req.body.avatar) {
        try {
          const cloudImg = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "social-media-app/userimages",
          });
          req.body.avatar = {
            publicId: cloudImg.public_id,
            url: cloudImg.secure_url,
          };
          console.log("IMAGE UPLOADED");
        } catch (e) {
          console.log(e.message);
          res.send(error(500, e.message));
        }
      }
      await User.create(req.body);
      return res.send(
        success(
          201,
          "Yeah, We have added successfully added you to our server. Now try to Log In your account."
        )
      );
    }
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
