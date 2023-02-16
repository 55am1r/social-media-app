const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id, user_id } = req.body;
    const user = await User.findOne({ _id: user_id ? user_id : _id });
    if (user) {
      const phoneNoMod = user.phoneno.phone;
      user.phoneno.phone =
        "XXXXX-XX" + phoneNoMod.substring(6, phoneNoMod.length);
      res.send(success(200, user));
    } else {
      res.send(success(404, "Not Found"));
    }
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
