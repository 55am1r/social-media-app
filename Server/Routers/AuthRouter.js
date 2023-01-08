const router = require("express").Router();
const {
  refreshAccessToken,
} = require("../Controller/AuthController/RefreshAccessTokenController");
const {
  loginController,
} = require("../Controller/AuthController/LoginController");
const { passwordCheck } = require("../Middlewares/Login_User&PasswordCheck");
const { requiredFieldsCheck } = require("../Middlewares/RequiredFieldCheck");
const { hashPassword } = require("../Middlewares/PasswordHashing");
const {
  signUpController,
} = require("../Controller/AuthController/SignupController");

router.get("/", (req, res) => {
  res.status(200).json({
    connection: true,
    roots_init: ["/sign-up", "/log-in", "post-/refresh-access-token"],
  });
});

router.use("/sign-up", requiredFieldsCheck, hashPassword, signUpController);
router.use("/log-in", requiredFieldsCheck, passwordCheck, loginController);
router.get("/refresh-access-token", refreshAccessToken);

module.exports = router;
