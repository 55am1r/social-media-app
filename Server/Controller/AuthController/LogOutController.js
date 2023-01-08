const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    res.clearCookie("JWT_REFRESH_TOKEN", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User Logged Out"));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
    process.exit(1);
  }
};
