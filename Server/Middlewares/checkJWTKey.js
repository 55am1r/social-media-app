const jwt = require("jsonwebtoken");
const { error } = require("../Utilities/StatusMessages");

module.exports = (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer")) {
    return res.send(error(409, "Authorization Header is Required"));
  }
  const receivedToken = req.headers.authorization.split(" ")[1];
  jwt.verify(
    receivedToken,
    process.env.JWT_ACCESS_TOKEN,
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.send(error(401, "Access Token Expired"));
        else return res.send(error(401, "Unable to Parse Access Token"));
      } else {
        req.body["_id"] = decoded._id;
        req.body["email"] = decoded.email;
        // if (req.body.caption) {
        //   req.body = {
        //     _id: decoded._id,
        //     email: decoded.email,
        //     caption: req.body.caption,
        //   };
        // } else if (req.body.followUserId) {
        //   req.body = {
        //     _id: decoded._id,
        //     email: decoded.email,
        //     followUserId: req.body.follo,
        //   };
        // } else {
        //   req.body = {
        //     _id: decoded._id,
        //     email: decoded.email,
        //   };
        // }
        console.log("TOKEN VERIFIED");
        next();
      }
    }
  );
};
