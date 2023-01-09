const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { error } = require("../Utilities/StatusMessages");

module.exports = (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer")) {
    return res.send(error(409, "Authorization Header is Required"));
  }
  const receivedToken = req.headers.authorization.split(" ")[1];
  jwt.verify(
    receivedToken,
    process.env.JWT_ACCESS_TOKEN,
    async function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.send(error(401, "Access Token Expired"));
        else return res.send(error(401, "Unable to Parse Access Token"));
      } else {
        req.body["_id"] = decoded._id;
        req.body["email"] = decoded.email;
        const user = await User.findById(decoded._id);
        if (!user) {
          return res.send(error(404, `User:'${decoded.email}' Not Found`));
        }
        console.log("TOKEN VERIFIED");
        next();
      }
    }
  );
};
