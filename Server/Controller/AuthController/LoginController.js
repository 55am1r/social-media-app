const jwt = require("jsonwebtoken");
const { success, error } = require("../../Utilities/StatusMessages");

const loginController = async (req, res) => {
  try {
    const { _id, email } = req.body;
    res.cookie("JWT_REFRESH_TOKEN", generateRefreshToken({ _id, email }), {
      httpOnly: true,
      secure: true,
    });
    return res.send(
      success(201, {
        JWT_ACCESS_KEY: generateAccessToken({ _id, email }),
      })
    );
  } catch (error) {
    console.log(error.message);
    res.send(error(500, error.message));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "30min",
      algorithm: "HS512",
    });
    return token;
  } catch (err) {
    console.log(err.message);
    res.send(error(500, error.message));
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "1y",
      algorithm: "HS512",
    });
    return token;
  } catch (err) {
    console.log(err.message);
    res.send(error(500, error.message));
  }
};

module.exports = { loginController, generateAccessToken };
