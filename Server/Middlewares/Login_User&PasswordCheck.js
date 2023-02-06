const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { error } = require("../Utilities/StatusMessages");
const moment = require("moment");
module.exports = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne(
      userId.includes("@") ? { email: userId } : { username: userId },
      {
        password: 1,
        currentlogin: 1,
      }
    );
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        console.log("Password matched");
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
          moment(time).format("HH:mm") +
          " " +
          time.getDate() +
          "-" +
          (time.getMonth() + 1) +
          "-" +
          time.getFullYear();
        await user.save();
        req.body = user;
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
