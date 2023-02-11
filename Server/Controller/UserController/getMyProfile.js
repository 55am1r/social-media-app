const User = require("../../Models/User");
const { success, error } = require("../../Utilities/StatusMessages");
module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById({ _id });
    const phoneNoMod = user.phoneno.phone;
    user.phoneno.phone =
      "XXXXX-XX" + phoneNoMod.substring(6, phoneNoMod.length);
    res.send(success(200, user));
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
