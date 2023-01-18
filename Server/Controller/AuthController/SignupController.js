const User = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");
const cloudinary = require("cloudinary").v2;
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.send(error(409, "User Already Exists"));
    } else {
      if (req.body.avatar) {
        try {
          const cloudImg = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "userimages",
          });
          req.body.avatar = {
            publicId: cloudImg.public_id,
            url: cloudImg.secure_url,
          };
          console.log('IMAGE UPLOADED');
        } catch (e) {
          console.log(e.message);
          res.send(error(500, e.message));
        }
      }
      const user = await User.create(req.body);
      user.password = undefined;
      return res.send(success(201, user));
    }
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};
