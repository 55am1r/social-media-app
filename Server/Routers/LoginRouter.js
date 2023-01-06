const router = require("express").Router();
const MW_requiredFieldCheck = require("../Middlewares/RequiredFieldCheck");
const MW_passwordCheck = require("../Middlewares/Login_User&PasswordCheck");
const loginControl = require("../Controller/LoginController");

router.get("/", (req, res) => {
  res.send("Use POST Method to Log-in");
});

router.post(
  "/",
  MW_requiredFieldCheck.requiredFieldsCheck,
  MW_passwordCheck.passwordCheck,
  loginControl.loginController
);
module.exports = router;
