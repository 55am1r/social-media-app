const router = require("express").Router();
const signupRouter = require("./SignupRoute");
const loginRouter = require("./LoginRouter");
const refreshTokenController = require("../Controller/RefreshAccessTokenController");

router.get("/", (req, res) => {
  res.status(200).json({
    connection: true,
    roots_init: ["/sign-up", "/log-in", "post-/refresh-access-token"],
  });
});

router.use("/sign-up", signupRouter);
router.use("/log-in", loginRouter);
router.get("/refresh-access-token", refreshTokenController.refreshAccessToken);

module.exports = router;
