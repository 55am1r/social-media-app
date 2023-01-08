const {
  loginController,
} = require("../Controller/UserController/LoginController");
const { passwordCheck } = require("../Middlewares/Login_User&PasswordCheck");
const { requiredFieldsCheck } = require("../Middlewares/RequiredFieldCheck");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Use POST Method to Log-in");
});

router.post("/", requiredFieldsCheck, passwordCheck, loginController);
module.exports = router;
