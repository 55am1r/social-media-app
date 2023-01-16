const router = require("express").Router();
const {
  loginController,
} = require("../Controller/AuthController/LoginController");
const RequiredFieldCheck = require("../Middlewares/RequiredFieldCheck");
const PasswordHashing = require("../Middlewares/PasswordHashing");
const SignupController = require("../Controller/AuthController/SignupController");
const Login_UserPasswordCheck = require("../Middlewares/Login_User&PasswordCheck");
const RefreshAccessTokenController = require("../Controller/AuthController/RefreshAccessTokenController");
const LogOutController = require("../Controller/AuthController/LogOutController");

router.get("/", (req, res) => {
  res.status(200).json({
    connection: true,
    roots_init: ["/sign-up", "/log-in", "post-/refresh-access-token"],
  });
});

router.post("/sign-up", RequiredFieldCheck, PasswordHashing, SignupController);
router.use(
  "/log-in",
  RequiredFieldCheck,
  Login_UserPasswordCheck,
  loginController
);
router.get("/refresh-access-token", RefreshAccessTokenController);
router.post("/log-out", LogOutController);
module.exports = router;
