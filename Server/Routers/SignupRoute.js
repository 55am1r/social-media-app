const router = require("express").Router();
const MW_signUpRequiredField = require("../Middlewares/RequiredFieldCheck");
const MW_hashPassword = require("../Middlewares/PasswordHashing");
const signUp_Controller = require("../Controller/UserController/SignupController");

router.get("/", (req, res) => {
  res.send("Use POST Method to Sign-Up");
});

router.post(
  "/",
  MW_signUpRequiredField.requiredFieldsCheck,
  MW_hashPassword.hashPassword,
  signUp_Controller.signUp
);

module.exports = router;
