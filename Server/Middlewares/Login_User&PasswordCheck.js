const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { error } = require("../Utilities/StatusMessages");

module.exports = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne(
      userId.includes("@") ? { email: userId } : { username: userId }
    ).select("+password");
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        user.lastlogin.time = user.currentlogin
          ? user.currentlogin
          : Date.now();
        user.currentlogin = Date.now();
        const time = user.lastlogin.time;
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        user.lastlogin.message =
          days[time.getDay()] +
          ", " +
          time.getDate() +
          "-" +
          (time.getMonth() === 0 ? time.getMonth() + 1 : time.getMonth()) +
          "-" +
          time.getFullYear();
        await user.save();
        req.body = user;
        console.log("Password matched");
        next();
      } else {
        return res.send(error(401, "Password doesn't match"));
      }
    } else {
      return res.send(error(403, "User is not Signed Up"));
    }
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
