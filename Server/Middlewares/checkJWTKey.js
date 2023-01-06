const jwt = require("jsonwebtoken");
const { error } = require("../Utilities/StatusMessages");
module.exports = (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer")) {
    return res.send(error(401, "Authorization Header is Required"));
  }
  const receivedToken = req.headers.authorization.split(" ")[1];
  jwt.verify(
    receivedToken,
    process.env.JWT_ACCESS_TOKEN,
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.send(
            error(401, {
              status: "Failure",
              msg: "TOKEN_EXPIRED",
              details: "signin token expired",
            })
          );
        else
          return res.send(
            error(401, {
              status: "Failure",
              msg: "TOKEN_ERROR",
              details: "unable to parse token",
            })
          );
      } else {
        req.body = { _id: decoded._id, email: decoded.email };
        console.log("TOKEN VERIFIED");
        next();
      }
    }
  );
};
