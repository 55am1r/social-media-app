const i_generateAccessToken = require("./LoginController");
const jwt = require("jsonwebtoken");
const { success, error } = require("../Utilities/StatusMessages");

const refreshAccessToken = async (req, res) => {
  const cookieData = req.cookies;
  if (!cookieData.JWT_REFRESH_TOKEN) {
    return res.send(error(404, "Refresh Token is Required"));
  }
  jwt.verify(
    cookieData.JWT_REFRESH_TOKEN,
    process.env.JWT_REFRESH_TOKEN,
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.status(409).json({
            status: "Failure",
            msg: "TOKEN_EXPIRED",
            details: {
              error: "signin token expired",
            },
          });
        else
          return res.status(409).json({
            status: "Failure",
            msg: "TOKEN_ERROR",
            details: {
              error: "unable to parse token",
            },
          });
      } else {
        const JWT_ACCESS_TOKEN = i_generateAccessToken.generateAccessToken({
          _id: decoded._id,
          email: decoded.email,
        });
        console.log("Token Verified, Sent New Token");
        return res.send(success(201, { New_Access_Token: JWT_ACCESS_TOKEN }));
      }
    }
  );
};
module.exports = {
  refreshAccessToken,
};
